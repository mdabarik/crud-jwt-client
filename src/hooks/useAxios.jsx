import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5555',
    withCredentials: true
})

const useAxios = () => {
    instance.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            if (error.response.status == 401 || error.response.status == 403) {
                // logout
            }
        }
    )
    return instance;
};

export default useAxios;