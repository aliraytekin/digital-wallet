import { useState } from "react";
import { useNavigate } from "react-router";
import { createAccount } from "../../api/account";
import "../../styles/account_form.css"

export default function AccountForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    accountType: "",
    balance: "",
    currency: "",
  });

  const accountTypes = ["Checking", "Savings", "Deposit", "Money Market"];
  const currencies = [
    { label: "Euro (€)", value: "EUR" },
    { label: "US Dollar ($)", value: "USD" },
    { label: "Canadian Dollar ($)", value: "CAD" },
    { label: "Australian Dollar ($)", value: "AUD" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { accountType, balance, currency } = formData;

    if (!accountType || !balance || !currency) {
      setError("Please fill in all fields.");
      return;
    }

    if (parseFloat(balance) < 0) {
      setError("Balance cannot be negative");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Not authenticated.");
        return;
      }

      await createAccount(token, {
        account_type: accountType,
        balance,
        currency,
      });

      navigate("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Account creation failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-container">
      <form className="account-form" onSubmit={handleSubmit}>
        <h2>Create a new account</h2>
        {error && <p className="error">{error}</p>}

        <div className="form-groups">
          <label htmlFor="accountType">Account Type</label>
          <select
            id="accountType"
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select type</option>
            {accountTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="form-groups">
          <label htmlFor="balance">Balance *</label>
          <input
            id="balance"
            name="balance"
            type="number"
            value={formData.balance}
            placeholder="Enter initial balance"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-groups">
          <label htmlFor="currency">Currency</label>
          <select
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select currency</option>
            {currencies.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn primary" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}
