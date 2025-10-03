import { fetchAccounts } from "../api/account";
import { Account } from "../types/account"
import { useState, useEffect } from "react"

export function useAccounts(token: string | null) {
  const [accounts, setAccounts] = useState<Account[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null)

  async function loadAccounts() {
    if (!token) return;
    try {
      setLoading(true);
      const data = await fetchAccounts(token);
      setAccounts(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Failed to fetch accounts");
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadAccounts(); }, [token])

  return { accounts, loading, error, refetch: loadAccounts };
}
