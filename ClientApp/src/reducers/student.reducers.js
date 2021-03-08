import * as c from '../constants/student.constants'


const initialState = {
    // student: null,
    list: [],
    load:false
};

export default function Student (state = initialState, action) {
    switch (action.type) {
        case c.LOADING_STUDENTS:
            return {
                load: action.payload,
                list: state.list
            }
            
        case c.SET_STUDENTS:
            return {
                    list: action.payload,
                    load: state.load
            }
        // case c.GET_STUDENT:
        //     return {
        //         student:action.payload,
        //         ...state
        //     }
        case c.ADD_STUDENT:
        case c.DELETE_STUDENT:
        default:
            return state;
    }
}