import * as c from '../constants/subject.constants'


const initialState = {
    list:[],
    load:false
};

export default function Subject (state = initialState, action) {

    switch (action.type) {
        case c.LOADING_SUBJECTS:
            return {
                load: action.payload,
                list: state.list
            }
            
        case c.SET_SUBJECTS:
            return {
                    list: action.payload,
                    load: state.load
            }
        case c.ADD_SUBJECT:
        case c.DELETE_SUBJECT:
        default:
            return state;
    }
}