import api from "../services/api"
import {SET_SUBJECTS,LOADING_SUBJECTS, ADD_SUBJECT, DELETE_SUBJECT} from "../constants/subject.constants"

export const listSubjects = () => async dispatch => {
    try {
        dispatch({type: LOADING_SUBJECTS, payload:true});
        const {data} = await api.get('/subject');
        dispatch({type: LOADING_SUBJECTS, payload:false});
        dispatch({type: SET_SUBJECTS, payload:data});
    }catch (e) {
        alert("Erro:" +e.message);
    }

};

export const getSubject = async (id) => {
    const {data} = await api.get('/subject/' + id);
    return data;
};

export const addSubject = (subject) => async dispatch => {
    try {
        const {status,data} = await api.post('/subject', subject);
        if(status == 200){
            dispatch({type: ADD_SUBJECT,payload:data});
        }
    }catch(e){
        alert("Erro:" +e.message);
    }
};

export const deleteSubject = (id) => async dispatch => {
    try{
        const {status} = await api.delete('/subject/'+id);
        if(status == 200){
            dispatch({type: DELETE_SUBJECT});
        }
    }catch(e){
        alert("Erro:" +e.message);
    }
    return await api.delete('/subject/' + id);
};

export const updateSubject = async (id, student) => {
    return await api.put('/subject/' + id, student);
}