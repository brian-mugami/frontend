import React from "react";
import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import SideNav from "../../components/SideNav";
import { Outlet, useRouteLoaderData } from "react-router-dom";


function ErrorPage() {
  const error = useRouteError();
  let title = "An error occurred";
  let message = "Something went wrong";
  let status = 400;

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

  const {token} = useRouteLoaderData("root");


  return (
    <React.Fragment>
      <div>
      {token && <SideNav />}

        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-600">{status}</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
             {message}
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600"> {title}</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/auth?mode=login"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log In Again<span aria-hidden="true">&rarr;</span>
              </Link>
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
            </div>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
}
export default ErrorPage;
