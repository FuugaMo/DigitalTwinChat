from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import os
import openai
import httpx  # 代替 fetch
import asyncio
from httpx import RequestError, HTTPStatusError


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


MAX_RETRIES = 10
RETRY_DELAY = 2  # 每次失败后等待秒数，可做指数退避

@app.post("/api/chat")
async def chat(request: Request):
    data = await request.json()
    prompt = data.get("prompt", "")
    userMessage = data.get("userMessage", "")  
    lastHostMessage = data.get("lastHostMessage", "")

    print("🔵 Incoming request data:")
    print(f"Prompt: {prompt}")
    print(f"Last Host message: {lastHostMessage}")
    print(f"User message: {userMessage}")

    messages = []
    if prompt:
        messages.append({"role": "system", "content": prompt})
    if lastHostMessage:
        messages.append({"role": "assistant", "content": lastHostMessage})
    if userMessage:
        messages.append({"role": "user", "content": userMessage})

    print(f"Messages: {messages}")

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    body = {
        "model": "gpt-4.1-nano-2025-04-14",
        "messages": messages,
        "temperature": 0.01,
    }

    MAX_RETRIES = 3
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

        except (RequestError, HTTPStatusError) as err:
            print(f"🔴 Attempt {attempt} failed: {err}")
            traceback.print_exc()
            if attempt < MAX_RETRIES:
                print(f"⏳ Retrying in {RETRY_DELAY} seconds...")
                await asyncio.sleep(RETRY_DELAY)
            else:
                return {
                    "error": "Failed to fetch from OpenAI after multiple attempts."
                }

@app.post("/api/verify-admin")
async def verify_admin(request: Request):
    data = await request.json()
    user_id = data.get("id")

    ADMIN_ID = os.getenv("ADMIN_ID")

    if user_id == ADMIN_ID:
        return JSONResponse({"success": True})
    else:
        return JSONResponse({"success": False, "message": "无效的管理员ID"})