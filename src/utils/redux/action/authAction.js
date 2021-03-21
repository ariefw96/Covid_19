import * as actionTypes from '../actionTypes';

export const login = (id, type, phone) => {
  return {
    type: actionTypes.LOGIN,
    payload: {
      id: id,
      type: type,
      phone: phone
    },
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
