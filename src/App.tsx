import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Welcome";
import Login from "./pages/Login";
import "./App.css";

import AuthGuard from "./guards/guards";
import PropertyList from "./pages/PropertyList";
import Navigation from "./components/Nav";

function App() {
  return (
    <div className="App container-fluid">
      <BrowserRouter>
        <div>
          <Navigation></Navigation>
        </div>
        <Routes>
          <Route
            key="Welcome"
            path="/"
            element={<AuthGuard component={<Home />} />}
          />
          <Route
            key="properties"
            path="/properties"
            element={<AuthGuard component={<PropertyList />} />}
          />

          <Route key="Register" path="/login" element={<Login />}>
            {" "}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
