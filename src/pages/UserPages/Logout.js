import { redirect, json } from "react-router-dom";
import { getAuthToken } from "../../util/Auth";

export async function action({request,params}){
    const token = getAuthToken();
    const prompt = window.confirm("Are you sure you want to logout...")

    if (prompt) {
        const response = await fetch("/logout", {
            method: "delete",
            headers : {
                'Authorization': 'Bearer ' + token
            }
        });
        if (!response.ok) {
            throw json(
              { message: 'You are not logged in. Please login!!.' },
              {
                status: 500,
              }
            );
          }
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token')
          localStorage.removeItem('expiration');
          return redirect("/")
    }
    else {
        return redirect("/home")
    }
    
}
