import React from "react";
import { Link } from "react-router-dom";
import { Card, List, ListItem, Title } from "@tremor/react";

function UserList({users}){

    return(
        <React.Fragment>


<Card className="max-w-xs">
    <Title>All Users</Title>
    <List>
      {users.map((user) => (
        <ListItem key={user.id}>
            <Link to={`${user.id}`}>
          <span>{user.email}</span>
          </Link>
          
        </ListItem>
      ))}
    </List>
  </Card>




        </React.Fragment>
    )
}

export default UserList;