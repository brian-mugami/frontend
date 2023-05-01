import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import { Form } from "react-router-dom";

function NavExample() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="home">Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavDropdown title="Receipts" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/receipt">All Receipts</NavDropdown.Item>
                <NavDropdown.Item href="/receipt/new">
                  New Receipt
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/customer-payment">
                  Customer Payments
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Invoices" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/invoice">All invoices</NavDropdown.Item>
                <NavDropdown.Item href="/invoice/new">
                  New Invoice
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/payment">
                  Supplier Payments
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Balances" id="navbarScrollingDropdown">
                <NavDropdown.Item href="bank-balances">
                  Bank Balances
                </NavDropdown.Item>
                <NavDropdown.Item href="/supplier-balances">
                  Supplier Balances
                </NavDropdown.Item>
                <NavDropdown.Item href="/customer-balances">
                  Customer Balances
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/inventory-balance">
                  Inventory balances
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Accounts" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/account/bank">
                  Bank accounts
                </NavDropdown.Item>
                <NavDropdown.Item href="/account/supplier">
                  Supplier accounts
                </NavDropdown.Item>
                <NavDropdown.Item href="/account/customer">
                  Customer accounts
                </NavDropdown.Item>
                <NavDropdown.Item href="/account/item">
                  Category accounts
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/inventory-balance">
                  Inventory balances
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form action="logout" method="post">
              <button className="btn btn-danger">Logout</button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavExample;
