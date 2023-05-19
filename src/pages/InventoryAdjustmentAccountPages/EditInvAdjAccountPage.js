import React from 'react'
import InvAdjAccountForm from '../../components/AccountComponents/InvAdjAccountForm';
import { useRouteLoaderData } from 'react-router-dom/dist/umd/react-router-dom.development';

function EditInvAdjAccountPage() {
    const { account } = useRouteLoaderData("inv-adj-account-detail");
    return (
      <InvAdjAccountForm method="patch" title="Inventory Adjustment" account={account} />
    );
}

export default EditInvAdjAccountPage