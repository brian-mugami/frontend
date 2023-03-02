import React from "react";
import { useSubmit, Link, useRouteLoaderData } from "react-router-dom";

function CategoryItem({category}){
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
            <h3>Category Details</h3>
            <p>category name-{category.name}</p>
            <p>category account-{category.account.account_name} - {category.account.account_number}</p>
            items in category
            <ul>
                {category.items.map((item)=><li key={item.id}>{item.item_name}</li>)}
            </ul>
            {token && <menu>
                <Link to="edit">Edit</Link>
                <button onClick={startDeleteHandler}>Delete</button>
                </menu>}
        </React.Fragment>)


}

export default CategoryItem;