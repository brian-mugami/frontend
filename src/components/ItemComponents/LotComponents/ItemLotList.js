import React from "react"
import { Link } from "react-router-dom";

function ItemLotList({lots}){
    return (
        <React.Fragment>
            <div>
                <h2>Item Lots</h2>
                <ul>
                    {lots.map((lot)=><li key={lot.id}><Link to={`./${lot.id}`}>{lot.lot}</Link></li>)}
                </ul>
            </div>
        </React.Fragment>
    )
}
export default ItemLotList;

