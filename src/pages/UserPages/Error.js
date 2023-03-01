import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import MainNavigation from "../../components/UserComponents/Mainnavigation";
import PageContent from "../../components/UserComponents/PageContent";

function ErrorPage(){
    const error = useRouteError()
    
    let title = "I am done"
    let message = "truly done"

    if (error.status === 500){
        message = error.message
    }
    return(
        <React.Fragment>
            <MainNavigation/>
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </React.Fragment>
    )
}
export default ErrorPage;