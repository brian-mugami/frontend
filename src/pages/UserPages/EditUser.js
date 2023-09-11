import { useRouteLoaderData } from "react-router-dom";
import NewUserForm from "../../components/UserComponents/NewUserForm";


function EditUserPage(){
    const data = useRouteLoaderData('user-detail')
    return <NewUserForm user={data} method="patch"/>
}

export default EditUserPage;