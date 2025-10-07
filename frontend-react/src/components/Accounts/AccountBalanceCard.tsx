import "../../styles/accounts.css";
import { Account } from "../../types/account";
import { Link } from "react-router"
import { useAuth } from "../../hooks/useAuth";

interface Props {
  account: Account;
}

export default function AccountBalanceCard({ account }: Props) {
  const { loading } = useAuth();

  if (loading) {
    <div>Loading...</div>
  }

  return(
    <Link to={`/account/${account.id}`} className="account-card">
      <p className="account-type">Account type: <span className="fw-bold"> {account.account_type}</span></p>
      <p className="balance">{Number(account.balance ?? 0).toFixed(2)} {account.currency}</p>
      <p className="account-id">Account number: {account.account_number}</p>
    </Link>
  );
};
