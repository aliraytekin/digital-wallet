import { Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import AccountDetails from "./pages/AccountDetails"
import Layout from "./components/Layout/Layout";
import Accountform from "./components/Accounts/AccountForm";
import { useAuth } from "./hooks/useAuth"
import { JSX } from "react"

function App() {
  const { user, loading } = useAuth();

  const PrivateRoute = (({children}: {children: JSX.Element}) => {
    if (loading) {
      return <div>Loading...</div>
    }

    return user ? children : <Navigate to="/login" />;
  })

  const LayoutRoute = (({children}: {children: JSX.Element}) => {
    if (loading) {
      return <div>Loading...</div>
    }

    return user ? children : children
  })

  return (
    <Routes>
      <Route path="/" element={
        <LayoutRoute>
          <Layout>
            <Home />
          </Layout>
        </LayoutRoute>
          } />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard"
      element={
        <PrivateRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </PrivateRoute>
      } />
      <Route path="/transactions" element={
        <PrivateRoute>
          <Layout>
            <Transactions />
          </Layout>
        </PrivateRoute>
      } />
      <Route path="/accounts"
      element={
        <PrivateRoute>
          <Layout>
            <Accountform />
          </Layout>
        </PrivateRoute>
      } />
      <Route path="/account/:id" element={
        <PrivateRoute>
          <Layout>
            <AccountDetails />
          </Layout>
        </PrivateRoute>
      } />

      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

export default App;
