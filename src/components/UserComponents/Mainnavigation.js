import { NavLink, Form, useRouteLoaderData } from "react-router-dom";

function MainNavigation() {
  const token = useRouteLoaderData("root");
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          {!token && (
            <li>
              <NavLink to="/auth?mode=login">Authentification</NavLink>
            </li>
          )}
          {token && (
            <li>
              <NavLink to="/user">Users</NavLink>
            </li>
          )}
          {token && (
            <li>
              <NavLink to="account">Accounts</NavLink>
            </li>
          )}
          {token && (
              <Form action="logout" method="post">
                <button>Logout</button>
              </Form>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
