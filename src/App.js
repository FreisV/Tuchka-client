import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Home from "./pages/home/Home.jsx";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";


function App() {
  const {user} = useContext(AuthContext);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate replace to="/" /> : <Login />}
            //element = {<Login/>}
          />
          <Route
            path="/register"
            element={user ? <Navigate replace to="/" /> : <Register />}
            //element ={<Register/>}
          />
          <Route
            path="/"
            element = {user ?  <Home /> : <Register />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
