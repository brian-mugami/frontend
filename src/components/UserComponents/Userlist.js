import React from "react";
import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";
import { Card, List, ListItem, Title } from "@tremor/react";
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Badge,
} from "@tremor/react";

function UserList({ users }) {
  const token = useRouteLoaderData("root");
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  }

  return (
    <React.Fragment>
      <div className="pt-10">
        <Card>
          <Title>List of Users</Title>
          <Table className="mt-5">
            <TableHead>
              <TableRow>
                <TableHeaderCell>User Name</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Date Registered</TableHeaderCell>
                <TableHeaderCell>Role</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>
                    <Text>{user.email}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{user.date_registered}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{user.is_admin === true ? "Admin" : "User"}</Text>
                  </TableCell>
                  <TableCell>
                    <div className="space-x-4">
                      <Link to={`${user.id}/edit`}>
                        <Badge size="md">Edit</Badge>
                      </Link>

                      <Badge onClick={startDeleteHandler} size="md">
                        Remove
                      </Badge>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </React.Fragment>
  );
}

export default UserList;
