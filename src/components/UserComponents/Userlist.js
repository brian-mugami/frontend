import React from "react";
import { Link } from "react-router-dom";
import { Card, Title } from "@tremor/react";
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
  return (
    <React.Fragment>
      <div className="pt-10">
        <Card>
          <Title>List of Users</Title>
          <Table className="mt-5">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Date Registered</TableHeaderCell>
                <TableHeaderCell>Role</TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <Link to={`./${user.id}`}>
                    <TableCell>
                      <Text>{user.email}</Text>
                    </TableCell>
                  </Link>
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
