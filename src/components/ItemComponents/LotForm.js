import React from "react";
import { Form, useNavigate, useNavigation, json, redirect } from "react-router-dom";
import { getAuthToken } from "../../util/Auth";

function LotForm({method, lotData, title}){
    const navigate = useNavigate()
    const navigation = useNavigation()

    const isSubmitting = navigation.state === 'submitting'
    function cancelHandler(){
        navigate('..')
    }

    return(
        <React.Fragment>
            <h2>Lot {title}</h2>
            <Form method={method}>
                <p>
                    <label>Lot Name</label>
                    <input placeholder="Lot Name" name="lotname" type="text" required defaultValue={lotData ? lotData.lot : ""}></input>
                </p>
                <p>
                    <label>Batch</label>
                    <input placeholder="Batch" name="batch" type="text" required defaultValue={lotData ? lotData.batch : ""}></input>
                </p>
                <p>
                    <label>Expiry Date</label>
                    <input name="expiry" type="date" required defaultValue={lotData ? lotData.expiry_date : ""}></input>
                </p>
                <div>
                    <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
                    Cancel
                    </button>
                    <button disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Save'}
                    </button>
                </div>
            </Form>
        </React.Fragment>
    )
}

export default LotForm;

export async function action({request, params}){
    const method = request.method;
    const data = await request.formData();
    const token = getAuthToken()

    const LotData = {
        lot: data.get("lotname"),
        batch: data.get("batch"),
        expiry_date: data.get("expiry")
    }

    let url = 'http://localhost:8000/item/lot'
    if(method==="POST"){
        const response = await fetch(url,{
            method: method,
            headers: {
                'Content-Type':'application/json',
                'Authorization': "Bearer " + token,
                'Access-Control-Allow-Origin': '*'
            },
            body:JSON.stringify(LotData)
        });
        if (!response.ok){
            window.alert("failed")
            throw json ({message: "Failed to save the lot"}, {status: 500})
        }

        return redirect("/lot")
    }else{
        const id = params.id
        url = 'http://localhost:8000/item/lot/'+id
        const response = await fetch(url,{
            method: method,
            headers: {
                'Content-Type':'application/json',
                'Authorization': "Bearer " + token,
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(LotData)
        });
        if (!response.ok){
            window.alert("failed update")
            throw json ({message: "Failed to save the lot"}, {status: 500})
        }

        return redirect("/lot")
    }
}