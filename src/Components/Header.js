import React, { useContext } from "react";
import { healthCareContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Header() {
  let context = useContext(healthCareContext);

  let navigate = useNavigate();
  let token = sessionStorage.getItem("token");

  let logout = () => {
    sessionStorage.clear();
    navigate("/");
  };
  return (
    <div className="header">
      <div className="header_body">
        <Navbar expand="lg">
          <Container fluid>
            <Link
              to="/home"
              className="pl-2 pr-2 text-decoration-none"
              style={{ color: "#000000", letterSpacing: "2px" }}
            >
              Healthcare Products
            </Link>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="my-2 my-lg-0 ml-auto"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Link
                  to="/home"
                  className="set_border mr-3 mt-2 text-decoration-none"
                  style={{ color: "#000000" }}
                >
                  Home
                </Link>
                
                <Nav>
                  {/* If token is present than inside the header logout button is showing and it's not present than button is not showing inside the header */}
                  {token ? (
                    <Nav.Link
                      className="set_border mr-3"
                      style={{ color: "#000000" }}
                      onClick={() => {
                        logout();
                      }}
                    >
                      Logout
                    </Nav.Link>
                  ) : (
                    <><Link
                  href="/signin"
                  className="set_border mr-3"
                  style={{ color: "#000000" }}
                >
                  Sign In
                </Link></>
                  )}
                </Nav>
                <Link
                  to="/cart"
                  className="header-icon text-dark text-decoration-none mt-2"
                >
                  <Badge badgeContent={context.cartValue} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </Link>
                
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default Header;
