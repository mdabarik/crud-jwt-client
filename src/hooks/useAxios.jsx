import axios from "axios";
import { useContext } from "react";
import { GlobalContext } from "../providers/GlobalProvider";

const instance = axios.create({
    baseURL: 'http://localhost:5555',
    withCredentials: true
})

const useAxios = () => {

    const {user, logOut} = useContext(GlobalContext);

    instance.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            if (error.response?.status == 401 || error.response?.status == 403) {
                // logout
                logOut()
                .then(() => {
                    console.log('logout');
                })
            }
        }
    )
    return instance;
};

export default useAxios;