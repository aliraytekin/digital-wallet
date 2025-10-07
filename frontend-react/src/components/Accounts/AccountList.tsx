import {useEffect, useState} from "react";
import { fetchAccounts } from "../../api/account";
import { Account } from "../../types/account"
import AccountBalanceCard from "./AccountBalanceCard";
import "../../styles/accounts.css"

export default function AccountList() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchAccounts(token).then(setAccounts).catch(console.error)
    }
  }, [token])

  return(
  <div className="accounts-container">
    <h2>Your accounts</h2>
    <div className="accounts-grid">
      {accounts.map(acc => (
        <AccountBalanceCard key={acc.id} account={acc} />
      ))}
    </div>
  </div>)
}
