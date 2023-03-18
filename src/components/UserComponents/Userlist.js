
import React from "react";
import { Link } from "react-router-dom";

function UserList({users}){

    return(
        <React.Fragment>
        <div>
            <h1>All Users</h1>
            <ul>
                {users.map((user)=>(
                    <li key= {user.id}>
                        <Link to={`${user.id}`}>
                        <h2>{user.email}</h2>
                        <p>{user.first_name} {user.last_name}</p>
                        </Link>
                        </li>
                ))}
            </ul>
        </div>
        </React.Fragment>
    )
}

export default UserList;