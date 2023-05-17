import React from "react";
import { useActionData,useNavigation, Form, json, redirect, useNavigate} from "react-router-dom";
import { getAuthToken } from "../../util/Auth";

function UserForm({user}){
    const data = useActionData()
    const navigation = useNavigation()
    const navigate = useNavigate()

    const isSubmitting = navigation.state==='submitting'

    function cancelHandler(){
        navigate('..');
    }

    return(
        <React.Fragment>
            {data && data.message && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
            <Form method="patch">
                {isSubmitting && <p>Submitting...</p>}
            <label>First name</label>
            <input id="fname" type="text" name="fname" required defaultValue={user? user.first_name : ""}></input>
            <label>Last name</label>
            <input id="lname" type="text" name="lname" required defaultValue={user? user.last_name : ""}></input>
            <label>email</label>
            <input id="fname" type="email" name="email" required defaultValue={user? user.email : ""}></input>
            <div>
            <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
                Cancel
            </button>
            <button disabled={isSubmitting}>
                {isSubmitting ? 'Saving..' : 'Save'}
            </button>
            </div>
            </Form>
        </React.Fragment>
    )

}
export default UserForm;

export async function action({request, params}){
    const formdata = await request.formData();
    const token = getAuthToken()

    const Userdata = {
        first_name: formdata.get("fname"),
        last_name: formdata.get("lname"),
        email: formdata.get("email"),
    }

    const id = params.userId

    const response = await fetch('https://flask-inventory.onrender.com/user/'+id, 
    {method: "Patch",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(Userdata),
    })

    if (!response.ok){
        throw json({message: "Could not update event"}, {status:500})
    }

    return redirect("/user")
}

  
