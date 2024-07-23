import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../public/icon.png";
import { useEffect } from "react";
function Navigation() {
  let token = localStorage.getItem("token") || "";
  function Logout() {
    window.localStorage.removeItem("token");
    window.location.href = "/login";
  }
  function AuthTags() {
    return (
      <>
        {token ? (
          <button onClick={Logout} className="btn btn-default">
            Logout
          </button>
        ) : null}
      </>
    );
  }
  useEffect(() => {
    console.log("sdf");
  }, [token]);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <div>
          <img src={logo} width={80} />
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Properties" id="basic-nav-dropdown">
              <NavDropdown.Item href="/properties">View All</NavDropdown.Item>
              <NavDropdown.Item href="/new-property">
                Create property
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        {<AuthTags></AuthTags>}
      </Container>
    </Navbar>
  );
}

export default Navigation;
