import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
  isLogin: false,
  id: null,
  type: 0,
  phone:null
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isLogin: true,
        id: action.payload.id,
        type: action.payload.type,
        phone:action.payload.phone
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLogin: false,
        id: null,
        type: 0,
        phone:null
      };

    default:
      return state;
  }
};

export default authReducer;
