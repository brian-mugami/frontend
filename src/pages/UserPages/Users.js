import { Suspense } from "react"
import { defer, json, useLoaderData, Await} from "react-router-dom"
import UserList from "../../components/UserComponents/Userlist"

function UsersPage(){
const {users}= useLoaderData()
    return(
        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading....</p>}>
            <Await resolve={users}>
                {(loadedUsers) => <UserList users = {loadedUsers}/>}
            </Await>
        </Suspense>
    )   
}

export default UsersPage

async function loadUsers(){
    const response = await fetch('http://localhost:8000/users')

    if (!response.ok){
        throw json({message: "Could not get users"}, {status: 500})
    } else{
        const resdata = await response.json();
        return resdata
    }
}

export function loader(){
    return defer(
        {
            users: loadUsers()
        }
    )
}