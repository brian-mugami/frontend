import React from "react";

function AccountsList({ accounts, title }) {

  return (
        <React.Fragment>
            <div>
                <h1>{title} Accounts</h1>
                <ul>
                    {accounts.map((account)=><li key={account.id}> {account.account_name}-{account.account_description}</li>)}
                </ul>
            </div>
        
       </React.Fragment>
  );
}
export default AccountsList;
