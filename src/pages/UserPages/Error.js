import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import MainNavigation from "../../components/UserComponents/MainNavigation";
import PageContent from "../../components/UserComponents/PageContent";

function ErrorPage(){
    const error = useRouteError()

    let title="An error occurred"
    let message = "Something went wrong"

    if ( isRouteErrorResponse(error) && error.status===500){
        message = error.data.message
    }
    if (isRouteErrorResponse(error) && error.status===404){
        title = "Not found"
        message = "Could not find page!!"
    }
    if (error.status===401){
        title = "Unauthorized"
        message = error.data.message
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