import React from "react";

function Accountitem({account, title}){
    return(
        <React.Fragment>
            <h3>{title} account</h3>
            <p>name-{account.account_name}</p>
            <p>description-{account.account_description}</p>
            <p>number-{account.account_number}</p>
        </React.Fragment>
    )
}

export default Accountitem;