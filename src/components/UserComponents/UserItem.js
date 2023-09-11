import React from "react";
import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";

function UserItem({ user }) {
  const token = useRouteLoaderData("root");
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "post" });
    }
  }

  return (
    <React.Fragment>
      <h1>{user.email}</h1>
      <time>Date Registered: {user.date_registered}</time>
      {token && (
        <menu>
          <Link to="edit">Edit</Link>
          <button onClick={startDeleteHandler}>{user && user.is_active === true ? "deactivate" : "activate"}</button>
        </menu>
      )}
    </React.Fragment>
  );
}

export default UserItem;
