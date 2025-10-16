import { useAccount } from "../hooks/useAccount";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { Account } from "../types/account";
import "../styles/account_details.css"


export default function AccountDetails() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{id: string}>();
  const token = localStorage.getItem("token");
  const { account, loading, error } = useAccount(token, Number(id));

  if (!user?.token) {
    navigate("/login");
    return null;
  }


  if (loading) return <p>Loading account...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!account) return <p>No account found.</p>;

  return(
    <div className="account-details-container">
      <h2>Account Details</h2>
      <div className="account-details-card">
        <p><strong>ID:</strong> {account.id}</p>
        <p><strong>Type:</strong> {account.account_type}</p>
        <p><strong>Balance:</strong> {Number(account.balance).toFixed(2)} {account.currency}</p>
        <p><strong>Account Number:</strong> {account.account_number}</p>
      </div>

      <button onClick={() => navigate("/dashboard")} className="btn primary">
        ← Back to Dashboard
      </button>
    </div>
  )
};
