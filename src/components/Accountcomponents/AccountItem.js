import React from "react";
import { useRouteLoaderData, Link, useSubmit } from "react-router-dom";

function Accountitem({account, title}){
    const token = useRouteLoaderData('root')
    const submit = useSubmit()

    function startDeleteHandler() {
        const proceed = window.confirm('Are you sure?');
    
        if (proceed) {
          submit(null, { method: 'delete'});
        }
      }

    return(
        <React.Fragment>
            <h3>{title} account</h3>
            <p>name-{account.account_name}</p>
            <p>description-{account.account_description}</p>
            <p>number-{account.account_number}</p>
            <p>type-{account.account_type}</p>
            {token && <menu>
                <Link to="edit">Edit</Link>
                <button onClick={startDeleteHandler}>Delete</button>
                </menu>}
        </React.Fragment>
    )
}

export default Accountitem;