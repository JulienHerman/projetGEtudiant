import { axiosInstance } from "../config";

const fetchStudents = async () => {
    try {
        const response = await axiosInstance.get('/api/students');
        const students = response.data;
        return students;
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

const fetchStudentById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/students/${id}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'recupération de l\'etudaint');
        return null;
    }
};

const createStudent = async (studentData) => {
    try {

        const response = await axiosInstance.post('/api/students', studentData);
        return response;
    } catch (error) {
        handleAxiosError(error, 'creation de l\'etudaint');
        return null;
    }
};

const updateStudent = async (id, studentData) => {
    try {
        const body = {
            nom: studentData.nom,
            prenom: studentData.prenom,
            numero_inscription: studentData.numero_inscription,
            niveau: studentData.niveau,
            parcours: studentData.parcours,
            mention: studentData.mention,
            statut: studentData.statut,
            sexe: studentData.sexe
        }
        const response = await axiosInstance.put(`/api/students/${id}`, body);
        return response;
    } catch (error) {
        handleAxiosError(error, 'mise à jour de l\'info de l\'etudiant');
        return null;
    }
};

const deleteStudent = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/students/${id}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error, 'supression de l\'etudiant');
        return null;
    }
};

const handleAxiosError = (error, context = '') => {
    console.error(`Erreur dans ${context} :`);
    if (error.response) {
        console.error("Erreur serveur :", error.response.status, error.response.data);
    } else if (error.request) {
        console.error("Aucune réponse du serveur", error.request);
    } else {
        console.error("Erreur de configuration :", error.message);
    }
};


const validateStudentData = (data) => {
    const errors = [];

    ['nom', 'prenom', 'numero_inscription', 'statut'].forEach(field => {
        if (!data[field] || typeof data[field] !== 'string') {
            errors.push(`${field} est requis et doit être une chaîne de caractères.`);
        }
    });

    const niveauxValides = ['L1', 'L2', 'L3', 'M1', 'M2'];
    if (!niveauxValides.includes(data.niveau)) {
        errors.push(`niveau doit être l'un des suivants : ${niveauxValides.join(', ')}`);
    }

    const sexesValid = ['HOMME', 'FEMME'];
    if (!sexesValid.includes(data.sexe)) {
        errors.push(`sexe doit être soit 'HOMME' soit 'FEMME'.`);
    }

    ['parcours', 'mention'].forEach(field => {
        if (data[field] !== undefined && typeof data[field] !== 'string') {
            errors.push(`${field} doit être une chaîne de caractères si présent.`);
        }
    });

    return errors;
};


export { fetchStudents, fetchStudentById, updateStudent, createStudent, deleteStudent }