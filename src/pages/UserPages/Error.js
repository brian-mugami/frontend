import React from "react";
import { useRouteError } from "react-router-dom";
import MainNavigation from "../../components/UserComponents/Mainnavigation";
import PageContent from "../../components/UserComponents/PageCntent";

function ErrorPage(){
    const error = useRouteError()
    let title = "An error occured";
    let message = "Something went wrong!!";

    if (error.status === 500){
        message = error.data.message
    }

    if (error.status === 404) {
        title = 'Not found!';
        message = 'Could not find resource or page.';
      }
      if (error.status === 409) {
        title = 'Unsupported!';
        message = 'This is an unsupported route or content.';
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