import React from "react";
import { useSubmit, Link, useRouteLoaderData } from "react-router-dom";

function Item({item}){
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
            <h3>Item Details</h3>
            <p>Item name-{item.item_name}</p>
            <p>Item number-{item.item_number}</p>
            <p>Item category-{item.category.name}</p>
            <p>Item price -{item.price}</p>
            <p>Item Unit -{item.item_unit}</p>
            <p>Item Unit Type - {item.unit_type}</p>
            <p>Item Creation Date - {item.date_created}</p>
            <p>Is Item Active - {item.is_active ? "Active":"Inactive"}</p>
            {token && <menu>
                <Link to="edit">Edit</Link>
                <button onClick={startDeleteHandler}>Delete</button>
                </menu>}
        </React.Fragment>)


}

export default Item;