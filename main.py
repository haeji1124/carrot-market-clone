from fastapi import FastAPI, UploadFile, Form, Response, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.staticfiles import StaticFiles
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException
from typing import Annotated
import sqlite3

con = sqlite3.connect("db.db", check_same_thread=False)
cur = con.cursor()

app = FastAPI()
SECRET = "super-coding"

manager = LoginManager(SECRET, "/login")


@manager.user_loader()
def query_user(data):
    WHERE_STATEMENTS = f"""id='{data}'"""
    # if type(data) == dict:
    #     WHERE_STATEMENTS = f"id='{data['id']}"
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    user = cur.execute(f"SELECT * from users WHERE {WHERE_STATEMENTS}").fetchone()
    return user


@app.post("/login")
def login(id: Annotated[str, Form()], password: Annotated[str, Form()]):
    user = query_user(id)
    if not user:
        raise InvalidCredentialsException  # 인증 실패 시 401 반환
    elif password != user["password"]:
        raise InvalidCredentialsException  # 비밀번호 불일치

    access_token = manager.create_access_token(data=dict(sub=id))  # dict 형태로 변경
    return {"access_token": access_token}


@app.post("/items")
async def create_item(
    image: UploadFile,
    title: Annotated[str, Form()],
    price: Annotated[int, Form()],
    description: Annotated[str, Form()],
    place: Annotated[str, Form()],
    insertAt: Annotated[int, Form()],
    user=Depends(manager),
):
    image_bytes = await image.read()
    cur.execute(
        f"""INSERT INTO items(title, image, price, description, place, insertAt)
                    VALUES ('{title}', '{image_bytes.hex()}', {price}, '{description}', '{place}', {insertAt})
    """
    )
    con.commit()
    print(image, title, price, description, place)


@app.get("/items")
async def get_items(user=Depends(manager)):
    try:
        con.row_factory = sqlite3.Row
        cur = con.cursor()
        rows = cur.execute("SELECT * from items;").fetchall()
        return JSONResponse(jsonable_encoder(dict(row) for row in rows))
    except Exception as e:
        print(f"Error in get_items: {str(e)}")
        raise InvalidCredentialsException


@app.get("/images/{item_id}")
async def get_image(item_id, user=Depends(manager)):
    cur = con.cursor()
    image_bytes = cur.execute(f"SELECT image from items WHERE id={item_id}").fetchone()[
        0
    ]
    return Response(content=bytes.fromhex(image_bytes), media_type="image/*")


@app.post("/signup")
def signup(
    id: Annotated[str, Form()],
    password: Annotated[str, Form()],
    name: Annotated[str, Form()],
    email: Annotated[str, Form()],
):
    cur.execute(
        f"""INSERT INTO users(id,name,email,password) 
                VALUES ('{id}','{name}','{email}', '{password}')"""
    )
    con.commit()


# app.mount는 항상 맨 팁에 두자. 왜냐면 root path여서 api의 모든 경로가 /를 포함하고 있어서 app.mount만 실행됨
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")
