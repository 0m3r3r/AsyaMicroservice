
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export function receiveLogin() {
  return {
    type: LOGIN_SUCCESS,
  };
}

export function loginError(payload) {
  return {
    type: LOGIN_FAILURE,
    payload,
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

// Logs the user out
export function logoutUser() {
  return (dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem("authenticated");
    dispatch(receiveLogout());
  };
}

export function loginUser(creds) {
    //axios.defaults.baseURL = 'https://localhost/8081';


  return (dispatch) => {
    dispatch(receiveLogin());

    localStorage.setItem("authenticated", true);
    
  };
}
