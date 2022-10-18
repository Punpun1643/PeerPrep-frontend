import axios from "axios";
import { URL_USER_SVC } from "./configs";

export const ensureLoggedIn = async (navigate) => {
    await axios.get(URL_USER_SVC + '/auth',
        { withCredentials: true, credentials: 'include' })
        .catch((err) => {
            console.log(err)
            navigate("/login")
        });
}