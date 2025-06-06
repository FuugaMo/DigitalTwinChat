from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import os
import openai
import httpx  # 代替 fetch
import asyncio


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

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    body = {
        "model": "gpt-4.1-nano-2025-04-14",
        "messages": [
            { "role": "system", "content": "你是一个温和而有启发性的AI对话助手。" },
            { "role": "user", "content": prompt }
        ],
        "temperature": 0.01
    }

    async with httpx.AsyncClient() as client:
        response = await client.post("https://api.openai.com/v1/chat/completions", headers=headers, json=body)
        response.raise_for_status()
        result = response.json()

    print(result["choices"][0]["message"]["content"])

    return {
        "reply": result["choices"][0]["message"]["content"]
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