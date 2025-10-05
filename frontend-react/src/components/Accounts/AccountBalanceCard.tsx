import "../../styles/account.css";
import { Account } from "../../types/account";

interface Props {
  account: Account;
}

export default function AccountBalanceCard({ account }: Props) {
  return(
    <div className="account-card">
      <p className="account-type">Account type: <span className="fw-bold"> {account.account_type}</span></p>
      <p className="balance">{Number(account.balance ?? 0).toFixed(2)} {account.currency}</p>
      <p className="account-id">Account number: {account.account_number}</p>
    </div>
  );
};
