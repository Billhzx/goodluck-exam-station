from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import get_db
from datetime import datetime

router = APIRouter()

class NoteSave(BaseModel):
    date: str
    content: str

@router.get("/notes")
def list_notes(date: str = None):
    db = get_db()
    if date:
        row = db.execute("SELECT * FROM notes WHERE date=?", (date,)).fetchone()
        db.close()
        return dict(row) if row else {}
    rows = db.execute("SELECT * FROM notes ORDER BY date DESC").fetchall()
    db.close()
    return [dict(r) for r in rows]

@router.post("/notes")
def save_note(body: NoteSave):
    db = get_db()
    db.execute(
        "INSERT OR REPLACE INTO notes (date, content, updated_at) VALUES (?, ?, ?)",
        (body.date, body.content, datetime.now().isoformat())
    )
    db.commit()
    row = db.execute("SELECT * FROM notes WHERE date=?", (body.date,)).fetchone()
    db.close()
    return dict(row)

@router.delete("/notes/{date}")
def delete_note(date: str):
    db = get_db()
    db.execute("DELETE FROM notes WHERE date=?", (date,))
    db.commit()
    db.close()
    return {"ok": True}

@router.get("/countdown")
def get_countdown():
    target = datetime(2026, 12, 19)
    now = datetime.now()
    diff = target - now
    if diff.total_seconds() <= 0:
        return {"days": 0, "passed": True}
    return {
        "days": diff.days,
        "hours": diff.seconds // 3600,
        "minutes": (diff.seconds % 3600) // 60,
        "seconds": diff.seconds % 60,
        "passed": False,
        "target": "2026-12-19",
    }
