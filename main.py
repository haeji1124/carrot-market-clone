from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.staticfiles import StaticFiles
from typing import Annotated
import sqlite3

con = sqlite3.connect("db.db", check_same_thread=False)
cur = con.cursor()

app = FastAPI()


@app.post("/items")
async def create_item(
    image: UploadFile,
    title: Annotated[str, Form()],
    price: Annotated[int, Form()],
    description: Annotated[str, Form()],
    place: Annotated[str, Form()],
    insertAt: Annotated[int, Form()],
):
    image_bytes = await image.read()
    cur.execute(
        f"""INSERT INTO items(title, image, price, description, place, insertAt)
                    VALUES ('{title}', '{image_bytes.hex()}', {price}, '{description}', '{place}', {insertAt})
    """
    )
    con.commit()
    print(image, title, price, description, place)
    return "200"


@app.get("/items")
async def get_items():
    con.row_factory = sqlite3.Row  # 컬럼명도 같이 가져올 수 있도록 설정
    cur = con.cursor()
    rows = cur.execute("SELECT * from items;").fetchall()

    return JSONResponse(jsonable_encoder(dict(row) for row in rows))


# app.mount는 항상 맨 팁에 두자. 왜냐면 root path여서 api의 모든 경로가 /를 포함하고 있어서 app.mount만 실행됨
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")
