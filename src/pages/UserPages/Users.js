import { Suspense } from "react";
import { defer, json, useLoaderData, Await } from "react-router-dom";
import UserList from "../../components/UserComponents/Userlist";
import { getAuthToken } from "../../util/Auth";

function UsersPage() {
  const { users } = useLoaderData();
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading....</p>}>
      <Await resolve={users}>
        {(loadedUsers) => <UserList users={loadedUsers} />}
      </Await>
    </Suspense>
  );
}

export default UsersPage;

async function loadUsers() {
  const token = getAuthToken();
  const response = await fetch("https://flask-inventory.onrender.com/users", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (response.status === 400) {
    throw json(
      {
        message: "Only Admin is able to see this page.",
      },
      { status: 400 }
    );
  }

  if (response.status === 401) {
    throw json(
      {
        message: "You are not logged in.",
      },
      { status: 401 }
    );
  }
  if (!response.ok) {
    throw json(
      {
        message: "Could not fetch users.",
      },
      { status: 500 }
    );
  }
  const data = await response.json();
  console.log(data);
  return data;
}

export async function loader() {
  return defer({
    users: await loadUsers(),
  });
}
