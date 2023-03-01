import React from "react"
import LotForm from "../../../components/ItemComponents/LotForm";

function NewLotPage(){
    return(
        <React.Fragment>
            <LotForm method="post" title="Creation"/>
        </React.Fragment>
    )
}

export default NewLotPage;

