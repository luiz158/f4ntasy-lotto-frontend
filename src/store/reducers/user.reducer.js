import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from '../actions/types';
import { userService } from '../actions/user.service'

const currentUser = JSON.parse(localStorage.getItem('currentUser'))
const initialize = {
  currentUser: currentUser || null,
  role: currentUser ? userService.type_user(currentUser.username) : '',
  loginState: (currentUser) ? true : false
}

export function user(state = initialize, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload.currentUser,
        role: userService.type_user(action.payload.username),
        loginState: true
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loginState: false
      };
    default:
      return { ...state }
  }
}