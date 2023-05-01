import React from "react";
<<<<<<< HEAD
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import PageContent from "../../components/UserComponents/PageContent";
import { useNavigate } from "react-router-dom";
import NavExample from "../../components/LayoutComponents/NavBarNav";
=======
import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import SideNav from "../../components/SideNav";
>>>>>>> c8977a5f4a6723b934fef64bd0d25a60e113bf2e

function ErrorPage() {
  const error = useRouteError();
  let title = "An error occurred";
  let message = "Something went wrong";
  let status = 400;

<<<<<<< HEAD
    if ( error.status===500){
        title = "An error occurred"
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
            <NavExample/>
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
            <div>
                <button onClick={returnHandler}>Back</button>
=======
  if (isRouteErrorResponse(error) && error.status === 500) {
    message = error.data.message;
    status = 500;
  }
  if (isRouteErrorResponse(error) && error.status === 404) {
    title = "Not found";
    message = "Could not find page!!";
    status = 404;
  }
  if (isRouteErrorResponse(error) && error.status === 401) {
    title = "Unauthorized";
    message = error.data.message;
    status = 401;
  }
  if (isRouteErrorResponse(error) && error.status === 400) {
    title = "Server error";
    message = error.data.message;
    status = 400;
  }

  return (
    <React.Fragment>
      <div>
        <SideNav />

        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-600">{status}</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {title}
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">{message}</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/home"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </Link>
              <a
                href="mailto:kindredsolutions254@gmail.com"
                className="text-sm font-semibold text-gray-900"
              >
                Contact support <span aria-hidden="true">&rarr;</span>
              </a>
>>>>>>> c8977a5f4a6723b934fef64bd0d25a60e113bf2e
            </div>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
}
export default ErrorPage;
