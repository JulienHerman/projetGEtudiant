import { axiosInstance } from "../config";

const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get('/api/users');
    const users = response.data;
    return users;
  } catch (error) {
    if (error.response) {
      console.error("Erreur serveur :", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("Aucune réponse du serveur", error.request);
    } else {
      console.error("Erreur de configuration :", error.message);
    }

    return null;
  }
};

const userLogin = async(loginForm)=>{
    try {
        const response = await axiosInstance.post('/api/users/login',loginForm);
        if(response.status === 200){
            return response;
        }else{

            return null;
        }
      } catch (error) {
        if (error.response) {
          console.error("Erreur serveur :", error.response.status, error.response.data);
        } else if (error.request) {
          console.error("Aucune réponse du serveur", error.request);
        } else {
          console.error("Erreur de configuration :", error.message);
        }
    
        return null;
      }
}

const userRegistration=async(userData)=>{
    try {
        const response = await axiosInstance.post('/api/users/register',userData);
        return response;
      } catch (error) {
        if (error.response) {
          console.error("Erreur serveur :", error.response.status, error.response.data);
        } else if (error.request) {
          console.error("Aucune réponse du serveur", error.request);
        } else {
          console.error("Erreur de configuration :", error.message);
        }
    
        return null;
      }
}

const updateUser = async(id,updatedUser)=>{
    try {
        const response = await axiosInstance.put(`/api/users/${id}`,updatedUser);
        return response;
      } catch (error) {
        if (error.response) {
          console.error("Erreur serveur :", error.response.status, error.response.data);
        } else if (error.request) {
          console.error("Aucune réponse du serveur", error.request);
        } else {
          console.error("Erreur de configuration :", error.message);
        }
    
        return null;
      }
}
export {fetchUsers,userLogin, userRegistration,updateUser}