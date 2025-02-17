import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import apiClient from '../../helpers/apiClient';
import apiAuthorizedClient from '../../helpers/apiAuthorizedClient';
import { setTokens } from '../../helpers/authUtils';

import {
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    FORGET_PASSWORD,
    CONFIRM_EMAIL,
    RESET_PASSWORD_CONFIRM,
    VALIDATE_RESET_TOKEN,
    SEND_CONFIRMATION_EMAIL
} from './constants';


import {
    loginUserSuccess,
    registerUserSuccess,
    forgetPasswordSuccess,
    authError,
    logoutUserSuccess,
    confirmEmailSuccess,
    resetPasswordConfirmSuccess,
    validateResetTokenSuccess,
    sendConfirmationEmailSuccess
} from './actions';

/**
 * Login the user
 * @param {*} payload - email and password 
 */
function* login({ payload: { email, password } }) {
    console.log("redux aux saga", "login", "email, password", email, password );
    try {
        const response = yield call(apiClient.post, '/token/', { email, password });
        console.log("redux aux saga", "login response", response );

        setTokens(response); // Save the user data to localStorage using setLoggedInUser
        yield put(loginUserSuccess(response));            
    } catch (error) {
        if (error.data) {
            yield put(authError(error.data));
        } else {
            yield put(authError(error));
        }
    }
}


/**
 * Logout the user
 * @param {*} param0 
 */
function* logout() {
    try {
        localStorage.removeItem("tokens");
        yield put(logoutUserSuccess(true));
    } catch (error) {
        if (error.data) {
            yield put(authError(error.data));
        } else {
            yield put(authError(error));
        }
    }
}

/**
 * Register the user
 */
function* register({ payload: { email, password } }) {
    try {
        const response = yield call(apiClient.post, '/register/', { email, password });
        setTokens(response); 
        yield put(registerUserSuccess(response));
    } catch (error) {
        if (error.data) {
            yield put(authError(error.data));
        } else {
            yield put(authError(error));
        }
    }
}


/**
 * forget password
 */
function* forgetPassword({ payload: { email } }) {
    try {
        const response = yield call(apiClient.post, '/password-reset/', { email });
        yield put(forgetPasswordSuccess(response.status));
    } catch (error) {
        if (error.data) {
            yield put(authError(error.data));
        } else {
            yield put(authError(error));
        }
    }
}


/**
 * Confirm the email
 */
function* confirmEmail({ payload: { token } }) {
    try {
      yield call(apiClient.post, '/confirmation-email/confirm/', { email_confirm_token: token });
      yield put(confirmEmailSuccess());
    } catch (error) {
      if (error.data) {
        yield put(authError(error.data));
      } else {
        yield put(authError(error));
      }
    }
  }

  /**
 * Send a link with confirmation email
 */
function* sendConfirmationEmail() {
    try {
      yield call(apiAuthorizedClient.post, '/confirmation-email/send/');
      yield put(sendConfirmationEmailSuccess());
    } catch (error) {
      if (error.data) {
        yield put(authError(error.data));
      } else {
        yield put(authError(error));
      }
    }
  }


  function* resetPasswordConfirm({ payload: { password, token } }) {
    try {
        const response = yield call(apiClient.post, '/password-reset/confirm/', { password, token });
        if(response.status === "OK") {
            yield put(resetPasswordConfirmSuccess());
        }
    } catch (error) {
        if (error.data) {
            yield put(authError(error.data));
        } else {
            yield put(authError(error));
        }
    }
}

function* validateResetToken({ payload: { token } }) {
    try {
        const response = yield call(apiClient.post, '/password-reset/validate_token/', { token });
        if(response.status === "OK") {
            yield put(validateResetTokenSuccess());
        }
    } catch (error) {
        if (error.data) {
            yield put(authError(error.data));
        } else {
            yield put(authError(error));
        }
    }
}

export function* watchResetPasswordConfirm() {
    yield takeEvery(RESET_PASSWORD_CONFIRM, resetPasswordConfirm);
}

export function* watchValidateResetToken() {
    yield takeEvery(VALIDATE_RESET_TOKEN, validateResetToken);
}

export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, login);
}

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}

export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, register);
}

export function* watchForgetPassword() {
    yield takeEvery(FORGET_PASSWORD, forgetPassword);
}

export function* watchConfirmEmail() {
    yield takeEvery(CONFIRM_EMAIL, confirmEmail);
}

  export function* watchSendConfirmationEmail() {
    yield takeEvery(SEND_CONFIRMATION_EMAIL, sendConfirmationEmail);
}

function* authSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser),
        fork(watchForgetPassword),
        fork(watchConfirmEmail),
        fork(watchSendConfirmationEmail),
        fork(watchResetPasswordConfirm), 
        fork(watchValidateResetToken), 
    ]);
}

export default authSaga;