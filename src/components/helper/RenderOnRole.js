import AuthService from "../../services/AuthService";


const RenderOnRole = ({role, children}) => {
    if (AuthService.hasRole(role)) {
        return children;
    } else {
        return null;
    }
}
export default RenderOnRole;