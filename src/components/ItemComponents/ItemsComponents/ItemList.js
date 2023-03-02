import React from "react"
import { Link } from "react-router-dom";

function ItemList({items}){
    return (
        <React.Fragment>
            <div>
                <h2>Items</h2>
                <ul>
                    {items.map((item)=><li key={item.id}><Link to={`./${item.id}`}>{item.item_name} - {item.item_number}</Link></li>)}
                </ul>
            </div>
        </React.Fragment>
    )
}
export default ItemList;