from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Transaction(BaseModel):
    amount: float
    sender_id: int
    receiver_id: int

@app.post("/check_transaction")
def check_transaction(tx: Transaction):
    suspicious = False
    reason = None

    if tx.amount > 1000:
        suspicious = True
        reason = "Amount exceeds 1000"

    return { "suspicious": suspicious, "reason": reason }
