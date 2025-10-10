import AccountList from "../components/Accounts/AccountList";
import Button from "../components/UI/Button";
import "../styles/dashboard.css"

export default function Dashboard() {
  return(
    <div className="dashboard">
      <h1>Welcome to your dashboard</h1>
      <p className="dashboard-text">Here is an overview of your accounts and your transactions</p>
      <AccountList />
      <div className="container-btn">
        <Button to="/account/:id/transactions" text="New transactions" className="dashboard-btn"></Button>
      </div>
    </div>
  )
};
