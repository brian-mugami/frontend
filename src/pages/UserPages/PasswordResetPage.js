import React from "react";
import PasswordForm from "../../components/UserComponents/PasswordResetForm";
import {json, redirect} from "react-router-dom"

function PasswordPage(){
    return(
        <React.Fragment>
            <PasswordForm method="post"/>
        </React.Fragment>
    )
}

export default PasswordPage

export async function action({request, params}){
    const formdata = await request.formData();

    const Userdata = {
        email: formdata.get("email"),
        password1: formdata.get("password1"),
        password2: formdata.get("password2"),
    }

    const response = await fetch('/user/password', 
    {method: request.method,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(Userdata),
    })

    if (!response.ok){
        throw json({message: "Could not find reset password action"}, {status:500})
    }
    if (response.status === 400){
        throw json({message: response.message}, {status:500})
    }

    return redirect("/auth?mode=login")
}