import { useRouteLoaderData } from "react-router-dom";
import UserForm from "../../components/UserComponents/UserForm";

function EditUserPage(){
    const data = useRouteLoaderData('user-detail')
    return <UserForm user={data}/>
}

export default EditUserPage;