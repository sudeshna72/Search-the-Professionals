import axiosInstance from './axiosInstance';


export const loginApi = (data:{username:string, password:string})=>{
    return axiosInstance.post('/auth/login', data);
} ;

export const registerApi= (data:{email:string, username:string, password:string})=>{
    return axiosInstance.post('/auth/register', data);
} ;

export const getUserListApi= () =>{
    return axiosInstance.get('/auth/getAllUsers');
};

export const getUserSearchApi = (username: string) => {
    return axiosInstance.get(`/auth/searchUsers?q=${username}`);
};

export const userProfile = (data: { category: string; subcategory: string ,skills: string[] }) => {
    return axiosInstance.post('/auth/userProfile', data );
};

export const getProfileApi = () => {
    return axiosInstance.get('/auth/profile');
};

export const updateProfileApi = (data: { username: string; email: string; bio?: string }) => {
    return axiosInstance.put('/auth/updateProfile', data);
};



