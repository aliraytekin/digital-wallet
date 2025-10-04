import { Transaction, TransactionCreateInput } from "../types/transaction"

const API_URL = "http://localhost:4000/api/v1";

export async function fetchTransactions(
  token: string,
  accountId: number
): Promise<Transaction[]> {
  const res = await fetch(`${API_URL}/accounts/${accountId}/transactions`, {  // ReactContext will be used later to store the token
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
}

export async function createTransactions(
  token: string,
  accountId: number,
  transaction: TransactionCreateInput
): Promise<Transaction> {
  const res = await fetch(`${API_URL}/accounts/${accountId}/transactions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ transaction })
  });
  if (!res.ok) throw new Error("Failed to create a new transaction");
  return res.json();
}
