import React from "react";
import { useRouteError } from "react-router-dom";
import MainNavigation from "../../components/UserComponents/Mainnavigation";
import PageContent from "../../components/UserComponents/PageContent";

function ErrorPage(){
    const error = useRouteError()
    let title = "An error occured";
    let message = "Something went wrong!!";

    if (error.status === 500){
        message = error.data.message + "check server"
    }

    if (error.status === 404) {
        message = error.data.message;
      }
      if (error.status === 409) {
        message = error.data.message;;
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