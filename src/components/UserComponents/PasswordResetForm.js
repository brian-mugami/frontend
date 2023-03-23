import React from "react";
import { useActionData,useNavigation, Form, json, redirect, useNavigate} from "react-router-dom";


function PasswordForm({method}){
    const navigate = useNavigate()
    const navigation = useNavigation()

    function cancelHandler(){
        navigate('..');
    }
    const isSubmitting = navigation.state === "submitting";

    return(
        <React.Fragment>
            <div>
                <Form method={method}>
                    <label>User Email</label>
                    <input id="email" type="email" name="email" placeholder="Email" required ></input>
                    <label>New Password</label>
                    <input id="password1" type="password" name="password1" placeholder="New Password" required ></input>
                    <label>Re-Type Password</label>
                    <input id="password2" type="password" name="password2" placeholder="Retype Password" required ></input>
                    <div>
                    <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
                    {isSubmitting ? 'Cancel' : 'Back'}
                    </button>
                    <button disabled={isSubmitting}>
                        {isSubmitting ? 'Changing..' : 'Change'}
                    </button>
                    </div>
                </Form>
            </div>
        </React.Fragment>
    )
}

export default PasswordForm