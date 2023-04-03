import { NavLink, Form, useRouteLoaderData } from "react-router-dom";
import "./MainNavigation.css";
import image from "../assets/intel.png";
import classes from "./MainNavigation.css";

function MainNavigation() {
  const token = useRouteLoaderData("root");
  return (
    <header className="nav">
      <nav>
        <ul className="list">
          {!token && (
            <li>
              <NavLink to="/" end>
                <img src={image}></img>
              </NavLink>
            </li>
          )}
          {token && (
            <li>
              <NavLink to="/home" end>
                <img src={image}></img>
              </NavLink>
            </li>
          )}
          {!token && (
            <li>
              <NavLink to="/auth?mode=login">Sign In</NavLink>
            </li>
          )}
          
          {token && (
            <li>
              <NavLink to="/home">Dashboard</NavLink>
            </li>
          )}
          {token && (
            <li>
              <NavLink to="account">Accounts</NavLink>
            </li>
          )}
          {token && (
            <li>
              <NavLink to="item">Item Details</NavLink>
            </li>
          )}
          {token && (
            <li>
              <NavLink to="customer">Customers</NavLink>
            </li>
          )}
          {token && (
            <li>
              <NavLink to="purchase">Purchases</NavLink>
            </li>
          )}
            {token && (
            <li>
              <NavLink to="sales">Sales</NavLink>
            </li>
          )}
          {token && (
            <li>
              <NavLink to="supplier">Suppliers</NavLink>
            </li>
          )}
          {token && (
            <Form action="logout" method="post">
              <button className="btn btn-danger">Logout</button>
            </Form>
          )}
        </ul>
      </nav>
    </header>
  );
}
export default MainNavigation;
