import "./App.css";
// importing components from react-router-dom package
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// import Home component
import Home from "./Home";
import Controller from "./components/teclado/Controller";

function App() {
  return (
    <>
      <Router>
        <Routes>

          <Route
            exact
            path="/"
            element={<Home />}
          />
          <Route
            exact
            path="/teclado"
            element={<Controller/>}
          />

          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;