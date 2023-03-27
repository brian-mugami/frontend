import React from "react"
import { useSubmit, Link, useRouteLoaderData } from "react-router-dom";

function Lotitem({lot}){
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
            <h3>Lot Details</h3>
            <p>lot name-{lot.lot}</p>
            <p>batch-{lot.batch}</p>
            <p>expiry date-{lot.expiry_date}</p>
            {token && <menu>
                <Link to="edit">Edit</Link>
                <button onClick={startDeleteHandler}>Delete</button>
                </menu>}
        </React.Fragment>
    )
}

export default Lotitem