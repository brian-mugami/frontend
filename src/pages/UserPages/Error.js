import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import Sidebar from "../../components/Sidenav";
import PageContent from "../../components/UserComponents/PageContent";
import { useNavigate } from "react-router-dom";

function ErrorPage(){
    const error = useRouteError()
    const navigate = useNavigate()
    let title="An error occurred"
    let message = "Something went wrong"

    if ( isRouteErrorResponse(error) && error.status===500){
        message = error.data.message
    }
    if (isRouteErrorResponse(error) && error.status===404){
        title = "Not found"
        message = "Could not find page!!"
    }
    if (isRouteErrorResponse(error) && error.status===401){
        title = "Unauthorized"
        message = error.data.message
    }
    if (isRouteErrorResponse(error) && error.status===400){
        title = "Server error"
        message = error.data.message
    }

    function returnHandler(){
        navigate("..")
    }
    
    return(
        <React.Fragment>
            <Sidebar/>
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
            <div>
                <button onClick={returnHandler}>Back</button>
            </div>
        </React.Fragment>
    )
}
export default ErrorPage;