import AccountList from "../components/Accounts/AccountList";
import "../styles/dashboard.css"

export default function Dashboard() {
  return(
    <div className="dashboard">
      <h1>Welcome to your dashboard</h1>
      <p className="dashboard-text">Here is an overview of your accounts and your transactions</p>
      <AccountList />
    </div>
  )
};
