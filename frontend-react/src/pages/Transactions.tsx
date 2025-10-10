import React, { useEffect, useState } from "react"
import { createTransactions } from "../api/transactions"
import { useNavigate, useParams } from "react-router";
import { useAccounts } from "../hooks/useAccounts";
import "../styles/transactions.css"

export default function Transactions() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const token = localStorage.getItem("token")
  const {id} = useParams<{id: string}>();
  const { accounts, loading: accountsLoading, error: accountsError } = useAccounts(token);
  const [formData, setFormData] = useState({
    senderNumberId: "",
    accountNumber: "",
    amount: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { senderNumberId, accountNumber, amount, description } = formData

    if (!token) {
      navigate("/login")
      return null;
    }

    if (!senderNumberId) {
      navigate("/dashboard")
      return null;
    }

    if (!senderNumberId) {
      setError("Please select a sender account");
      return;
    }

    if (!accountNumber || !amount) {
      setError("Please fill in all required fields");
      return;
    }

    if (!id) return <p>No account found.</p>

    try {
      setLoading(true);
      createTransactions(token, Number(id), {
        sender_account_id: Number(senderNumberId),
        receiver_account_number: accountNumber,
        amount: Number(amount),
        description: description,
      })
      navigate("/dashboard")
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Could not create transactions")
      } else {
        setError("Something went wrong")
      }
    } finally {
      setLoading(false)
    }
  }

  return(
    <div className="transaction-container">
      <form className="transaction-form" onSubmit={handleSubmit}>
        <label htmlFor="account">Which account for the transaction?</label>
        { accountsLoading && <p>Loading accounts</p> }
        { accountsError && <p>{error}</p> }
        { error && <p className="error">{error}</p>}

        <select value={formData.senderNumberId} onChange={(e) =>
          setFormData({ ...formData, senderNumberId: e.target.value })
        }>
          <option value="">Select option</option>
          {accounts?.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.account_number} - {acc.balance} {acc.currency}
            </option>
          ))}
        </select>

        <label htmlFor="Account number">Account number</label>
        <input
        type="text"
        placeholder="Enter the receiver's account number"
        value={formData.accountNumber}
        onChange={(e) =>
          setFormData({ ...formData, accountNumber: e.target.value })
        }
        />

        <label>Amount</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={formData.amount}
          onChange={(e) =>
            setFormData({ ...formData, amount: e.target.value })
          }
        />

        <label>Description (optional)</label>
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <button type="submit" disabled={loading || accountsLoading}>
          {loading ? "Processing..." : "Send Money"}
        </button>

      </form>
    </div>
  )
};
