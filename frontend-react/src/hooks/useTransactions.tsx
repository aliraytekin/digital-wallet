import {useState, useEffect} from "react"
import { Transaction } from "../types/transaction"
import { fetchTransactions } from "../api/transactions"

export function useTransactions(token: string | null, accountId: number) {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function loadTransactions() {
    if (!token) {
      setTransactions(null);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchTransactions(token, accountId);
      setTransactions(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Fetching transactions failed");
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadTransactions(); }, [token, accountId])

  return { transactions, loading, error, refetch: loadTransactions }
}
