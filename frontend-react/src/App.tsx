import { Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import AccountDetails from "./pages/AccountDetails"
import Layout from "./components/Layout/Layout";
import { useAuth } from "./hooks/useAuth"
import { JSX } from "react"

function App() {
  const { user } = useAuth();

  const PrivateRoute = (({children}: {children: JSX.Element}) => {
    return user ? children : <Navigate to="/login" />;
  })

  return (
    <Routes>
      <Route path="/" element={
        <Layout>
          <Home />
        </Layout>
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
