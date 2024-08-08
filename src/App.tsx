import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Welcome";
import Login from "./pages/Login";
import "./App.css";

import AuthGuard from "./guards/guards";
import PropertyList from "./pages/PropertyList";
import Unit from "./pages/UnitList";
import Navigation from "./components/Nav";
import { CreateNewProperty } from "./pages/CreateNewProperty";
import CreateNewUnit from "./pages/CreateNewUnit";

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
          <Route
            key="properties"
            path="/new-property"
            element={<AuthGuard component={<CreateNewProperty />} />}
          />
             <Route
            key="unit"
            path="/unit"
            element={<AuthGuard component={<Unit />} />}
          />
             <Route
            key="unit"
            path="/new-units"
            element={<AuthGuard component={<CreateNewUnit />} />}
          />

          <Route key="Register" path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
