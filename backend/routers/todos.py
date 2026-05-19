from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import get_db

router = APIRouter()


class TodoCreate(BaseModel):
    text: str


class TodoUpdate(BaseModel):
    completed: bool


@router.get("/todos")
def list_todos():
    db = get_db()
    rows = db.execute("SELECT * FROM todos ORDER BY created_at").fetchall()
    db.close()
    return [dict(r) for r in rows]


@router.post("/todos")
def create_todo(body: TodoCreate):
    import uuid

    db = get_db()
    todo_id = str(uuid.uuid4())
    db.execute("INSERT INTO todos (id, text) VALUES (?, ?)", (todo_id, body.text))
    db.commit()
    row = db.execute("SELECT * FROM todos WHERE id=?", (todo_id,)).fetchone()
    db.close()
    return dict(row)


@router.patch("/todos/{todo_id}")
def update_todo(todo_id: str, body: TodoUpdate):
    db = get_db()
    row = db.execute("SELECT * FROM todos WHERE id=?", (todo_id,)).fetchone()
    if not row:
        db.close()
        raise HTTPException(404, "Todo not found")
    db.execute(
        "UPDATE todos SET completed=? WHERE id=?", (int(body.completed), todo_id)
    )
    db.commit()
    row = db.execute("SELECT * FROM todos WHERE id=?", (todo_id,)).fetchone()
    db.close()
    return dict(row)


@router.delete("/todos/{todo_id}")
def delete_todo(todo_id: str):
    db = get_db()
    row = db.execute("SELECT * FROM todos WHERE id=?", (todo_id,)).fetchone()
    if not row:
        db.close()
        raise HTTPException(404, "Todo not found")
    db.execute("DELETE FROM todos WHERE id=?", (todo_id,))
    db.commit()
    db.close()
    return {"ok": True}
