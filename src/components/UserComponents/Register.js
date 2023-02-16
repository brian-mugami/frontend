import React from "react";
import { Form, Link, useSearchParams, useActionData, useNavigation } from "react-router-dom";
import  "./Register.css";

function AuthForm(){

    const data = useActionData()
    const [searchParams] = useSearchParams()
    const navigation = useNavigation()

    const isSubmitting = navigation.state === 'submitting'  
    const isLogin = searchParams.get('mode') === 'login'

    return(
        <React.Fragment>
            <div className="screenBackground">
       
            <div className="loginScreen_gradient" >          

            <div className="forms">
            {!isLogin && 
                <Form method="post">
                    
                    
                     <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
                     {data && data.errors && <ul>
                    {Object.values(data.errors).map((err)=>(<li key={err}>{err}</li>))}</ul>}
                    {data && data.message && <p>{data.message}</p>}
                    
                <p>
                
                    <label >First Name</label>
                    <input id="fname" type="fname" name="fname" required placeholder="Enter your First Name"/>
                </p>
                <p>
                    <label >Last Name</label>
                    <input id="lname" type="lname" name="lname" required placeholder="Enter your Last Name"/>
                </p>
                <p>
                    <label>Email</label>
                    <input id="email" type="email" name="email" required placeholder="Enter your Email" />
                </p>
                <p>
                    <label >Password</label>
                    <input id="password1" type="password" name="password1" required placeholder="Enter a password"/>
                </p>
                <p>
                    <label >Re-type Password</label>
                    <input id="password2" type="password" name="password2" required placeholder="Retype your new password" />
                </p>
                <div>
                    <button className="btn btn-outline-info">
                    <Link to={`?mode=${isLogin ? 'register': 'login'}`}>
                        {isLogin? 'Register': 'Login'}
                    </Link>
                    </button>
                    <button className="btn btn-outline-secondary" disabled={isSubmitting}>{isSubmitting ? 'Registering...' : 'Register'}</button>
                </div>
                
                </Form>
            }
            {isLogin && 
             <Form method="post">
                <div className="headerIcon">
                <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
                <i className="bi bi-door-open"></i>
                </div>
                {data && data.errors && <ul>
                {Object.values(data.message).map((err)=>(<li key={err}>{err}</li>))}</ul>}
                {data && data.message && <p>{data.message}</p>}
             <p>
                 <label>Email</label>
                 <input id="email" type="email" name="email" required placeholder="Enter your Email" />
             </p>
             <p>
                 <label >Password</label>
                 <input id="password" type="password" name="password" required placeholder="Enter your password"/>
             </p>
             <div className="authButtons">
                <button className="btn btn-outline-danger" >
                 <Link to={`?mode=${isLogin ? 'register': 'login'}`}>
                     {isLogin? 'Register': 'Login'}
                 </Link>
                 </button>
                 <button className="btn btn-outline-primary" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
             </div>
             </Form>}
             </div>
             </div>
             </div>
            
        </React.Fragment>
    )
}

export default AuthForm;
