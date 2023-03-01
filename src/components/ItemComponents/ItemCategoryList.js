import React from "react";
import { Link } from "react-router-dom";

function CategoryList({categories}){
    return(
        <React.Fragment>
            <div>
                <h2>Item Categories</h2>
                <ul>
                    {categories.map((cat)=><li key={cat.id}><Link to={`./${cat.id}`}>{cat.name}</Link></li>)}
                </ul>
            </div>
        </React.Fragment>
    )
}

export default CategoryList;