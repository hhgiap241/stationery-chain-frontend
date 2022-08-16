import AuthService from "../../services/AuthService";


const RenderOnRole = ({role, children}) => {
    console.log(AuthService.getRoles());
    if (AuthService.hasRole(role)) {
        return children;
    } else {
        return null;
    }
}
export default RenderOnRole;