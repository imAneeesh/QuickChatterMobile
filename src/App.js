import './App.css';
import Register from './pages/register';
import Login from './pages/login';
import Home from './pages/home'
import "./style/main.css"
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  HashRouter
} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';


function App() {

  const { currentUser } = useContext(AuthContext)

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login/" />
    }
    return children
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/">
          <Route index element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
          />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
      </Routes>
    </HashRouter>

  );
}

export default App;
