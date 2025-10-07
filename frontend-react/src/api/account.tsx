import { Account, AccountCreateInput } from "../types/account"

const API_URL = "http://localhost:4000/api/v1"

export async function fetchAccounts(token: string): Promise<Account[]> { // I will use React Context later on
  const res = await fetch(`${API_URL}/accounts`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error("Failed to fetch accounts");
  return res.json();
}

export async function fetchAccount(
  token: string,
  accountId: number
): Promise<Account> {
  const res = await fetch(`${API_URL}/accounts/${accountId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error("Failed to fetch account");
  return res.json();
}

export async function createAccount(
  token: string,
  account: AccountCreateInput | null
): Promise<Account> {
  const res = await fetch(`${API_URL}/accounts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ account })
  })
  if (!res.ok) throw new Error("Failed to create account");
  return res.json();
}
