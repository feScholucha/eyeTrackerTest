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
import GameSetup from "./GameSetup";
import CallSetup from "./CallSetup";

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
            path="/gamesetup"
            element={<GameSetup />}
          />
          <Route
            exact
            path="/callsetup"
            element={<CallSetup />}
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