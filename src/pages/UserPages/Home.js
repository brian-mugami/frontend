import React from "react";
import PageContent from "../../components/UserComponents/PageContent";
import "./Home.css"


function HomePage() {
  return (
    <React.Fragment>
    <PageContent title="Welcome!">
      <p>This is the Kindred Inventory App!!</p>
      <div className="container">
	      <div className="center">
		      <h1 className="apple">KINDRED</h1>
	      </div>
      </div>
    </PageContent>
    </React.Fragment>
  );
}

export default HomePage;