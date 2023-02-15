import React from "react";
import { Link} from "react-router-dom";
function AccountsList({ accounts, title }) {
  return (
        <React.Fragment>
            <div>
                <h1>{title} Accounts</h1>
                <ul>
                    {accounts.map((account)=><li key={account.id}><Link to={`./${account.id}`}>{account.account_name}-{account.account_description}</Link> </li>)}
                </ul>
            </div>
        
       </React.Fragment>
  );
}
export default AccountsList;
