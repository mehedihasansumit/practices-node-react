import { Navigate, Route, Routes, useNavigate } from "react-router";

import Home from './pages/home';
import Login from "./pages/login/login";
import AuthContextProvider, { AuthContext } from "./contexts/AuthContext";
import { useContext, useEffect } from "react";
import Menus from "./layout/Menu";

const Error = () => {
  return <>page not founds...</>
}

const ProtectedRoute = ({ children }) => {
  const authUser = useContext(AuthContext);

  if (!authUser?.isAuthenticateUser) return <Navigate to='/login' />
  return children;
}

function App() {
  const navigate = useNavigate()
  return (
    <>
      <AuthContextProvider navigate={navigate}>
        <Routes>
          <Route path="/" element={<Menus />}>
            <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/*" element={<Error />} />
        </Routes>
      </AuthContextProvider>
    </>
  )
}

export default App
