import axios from 'axios'
console.log(process.env.REACT_APP_API_URL)
export const authFetch = axios.create({
    baseURL: `https://port-0-savings-book-backend-eu1k2llladze0x.sel3.cloudtype.app`,
})

authFetch.interceptors.request.use(
    (config) => {
        config.headers["Content-Type"] = "application/json"
        config.headers["Accept"] = "application/json";
        config.headers['Origin'] = "*";
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
)
