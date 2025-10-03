import {useState, useEffect} from "react";
import {Account} from "../types/account";
import { fetchAccount } from "../api/account";

export function useAccount(token: string | null, accountId: number) {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadAccount() {
    if (!token) return;
    try {
      setLoading(true);
      const data = await fetchAccount(token, accountId);
      setAccount(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Failed to fetch account");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadAccount(); }, [token, accountId]);

  return { account, loading, error, refetch: loadAccount };
}
