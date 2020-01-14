import { combineReducers } from 'redux';

const INITIAL_STATE = {
  current: [],
  possible: [
    'Allie',
    'Gator',
    'Lizzie',
    'Reptar',
  ],
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.LOGIN_EMAIL_PHONE:
    return {
      ...state,
      LoginEmailPhone: action.LoginEmailPhone
    }
    default:
      return state
  }
};

export default combineReducers({
  friends: authReducer
});