import { combineReducers,createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Subject from './subject.reducers';
import Student from './student.reducers';

const rootReducer = combineReducers({
    Subject,
    Student
});

export default createStore(rootReducer,applyMiddleware(thunk));