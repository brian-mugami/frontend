import React from 'react'

function PageContent({title, children}){
    return(
        <React.Fragment>
            <div className="loginScreen">
      
            <div>
                <h1>{title}</h1>
                {children}
            </div>
            </div>
        </React.Fragment>
    )
}

export default PageContent;