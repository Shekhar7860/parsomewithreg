import { combineReducers } from 'redux';
import { LOGIN_DATA } from './types';
const INITIAL_STATE = {
  current: [],
  user :[],
  possible: [
    'Allie',
    'Gator',
    'Lizzie',
    'Reptar',
  ],
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    case  LOGIN_DATA:
    alert('i m wokring')
    return {
      ...state,
      logindata: action.payload
    }
    default:
      return state
  
}

}

export default combineReducers({
  auth: authReducer,
});