from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import os
import openai
import httpx  # 代替 fetch
import asyncio
import json
from httpx import RequestError, HTTPStatusError
import traceback

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 生产环境建议改成前端 URL
    allow_methods=["*"],
    allow_headers=["*"],
)

# @app.middleware("http")
# async def log_requests(request: Request, call_next):
#     print(f"收到请求: {request.method} {request.url}")
#     try:
#         response = await call_next(request)
#     except Exception as e:
#         print("中间件捕获异常:", e)
#         raise e
#     print(f"响应状态码: {response.status_code}")
#     return response

@app.get("/")
def read_root():
    return {"message": "Backend is up and running!"}

@app.post("/api/chat")
async def chat(request: Request):
    data = await request.json()
    prompt = data.get("prompt", "")
    userMessage = data.get("userMessage", "")  
    lastHostMessage = data.get("lastHostMessage", "")

    print("🔵 Incoming request data:")
    print("Prompt:", repr(prompt))
    print("Last Host message:", lastHostMessage) # Should be empty when in replaying mode?
    print("User message:", userMessage) # Should be empty when in replaying mode?

    messages = []
    if prompt:
        messages.append({"role": "system", "content": prompt})
    if lastHostMessage:
        messages.append({"role": "assistant", "content": lastHostMessage})
    if userMessage:
        messages.append({"role": "user", "content": userMessage})

    print("Messages:", json.dumps(messages, ensure_ascii=False))

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    body = {
        # "model": "gpt-4.1-nano-2025-04-14",
        "model": "gpt-4o-mini",
        "messages": messages,
        "temperature": 0.01,
    }

    MAX_RETRIES = 5
    RETRY_DELAY = 2  # 秒

    for attempt in range(1, MAX_RETRIES + 1):
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    "https://api.openai.com/v1/chat/completions",
                    headers=headers,
                    json=body,
                    timeout=20
                )
                response.raise_for_status()
                result = response.json()
                print(f"✅ Success on attempt {attempt}:")
                print(result["choices"][0]["message"]["content"])
                return {
                    "reply": result["choices"][0]["message"]["content"]
                }

        except httpx.HTTPStatusError as err:
            if err.response.status_code == 429:
                retry_after = int(err.response.headers.get("Retry-After", "5"))
                print(f"⚠️ Rate limit hit. Retrying after {retry_after} seconds.")
                await asyncio.sleep(retry_after)
            else:
                print(f"🛑 HTTPStatusError: {err.response.status_code}")
                traceback.print_exc()
                await asyncio.sleep(RETRY_DELAY)

        except httpx.ReadTimeout:
            print(f"🛑 ReadTimeout on attempt {attempt}, retrying in {RETRY_DELAY}s...")
            traceback.print_exc()
            await asyncio.sleep(RETRY_DELAY)

        except httpx.RequestError as err:
            print(f"🛑 Network error on attempt {attempt}, retrying in {RETRY_DELAY}s...")
            traceback.print_exc()
            await asyncio.sleep(RETRY_DELAY)

        except Exception as err:
            print(f"❌ Unexpected error on attempt {attempt}, retrying in {RETRY_DELAY}s...")
            traceback.print_exc()
            await asyncio.sleep(RETRY_DELAY)

    # 如果所有尝试都失败
    return { "error": f"Request failed after {MAX_RETRIES} attempts." }


@app.post("/api/verify-admin")
async def verify_admin(request: Request):
    data = await request.json()
    user_id = data.get("id")

    ADMIN_ID = os.getenv("ADMIN_ID")

    if user_id == ADMIN_ID:
        return JSONResponse({"success": True})
    else:
        return JSONResponse({"success": False, "message": "无效的管理员ID"})