import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    }
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// instance.interceptors.response.use(
//     (res) => {
//         return res;
//     },
//     async (err) => {
//         const originalConfig = err.config;
//         const auth = useAuth();

//         if (originalConfig.url !== "/auth/signin" && err.response) {
//             // Access Token was expired
//             if (err.response.status === 401 && !originalConfig._retry) {
//                 originalConfig._retry = true;

//                 try {
//                     // const rs = await instance.post("/auth/refresh_token", {
//                     //     refreshToken: TokenService.getLocalRefreshToken(),
//                     // });

//                     // const { accessToken } = rs.data;
//                     // TokenService.updateLocalAccessToken(accessToken);
//                     auth.signinRedirect();

//                     return instance(originalConfig);
//                 } catch (_error) {
//                     return Promise.reject(_error);
//                 }
//             }
//         }

//         return Promise.reject(err);
//     }
// );

export default instance;