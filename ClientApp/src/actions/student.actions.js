import {SET_STUDENTS,LOADING_STUDENTS, DELETE_STUDENT,GET_STUDENT,ADD_STUDENT} from "../constants/student.constants";

import api from "../services/api"

export const listStudent = () => async dispatch => {
    try {
        dispatch({type: LOADING_STUDENTS, payload:true});
        const {data} = await api.get('/student');
        dispatch({type: LOADING_STUDENTS, payload:false});
        dispatch({type: SET_STUDENTS, payload:data});
    }catch (e) {
        alert("Erro:" +e.message);
    }

};

export const getStudent = async (id)  => {
    try {
        const {status,data} = await api.get('/student/' + id);
        if(status == 200){
           return data;
        }
    }catch(e){
        alert("Erro:" +e.message);
    }
};

export const addStudent = (student) => async dispatch => {
    try {
        const {status,data} = await api.post('/student', student);
        if(status == 200){
            dispatch({type: ADD_STUDENT,payload:data});
        }
    }catch(e){
        alert("Erro:" +e.message);
    }
};

export const deleteStudent =  (id) => async dispatch => {
    try {
        const {status} = await api.delete('/student/' + id);
        if(status == 200){
            dispatch({type: DELETE_STUDENT});
        }
    }catch(e){
        alert("Erro:" +e.message);
    }
};

export const updateStudent = async (id, student) => {
    try {
    const {data,status} = await api.put('/student/' + id, student);
    if(status == 200){
       return true;
    }
    }catch(e){
       return false;
    }
}