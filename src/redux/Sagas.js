import { put, call, takeLatest } from 'redux-saga/effects';
import { api } from '../network/API'

function fetchUsers() {
    let res = api.request('users', 'GET', {}).then(result => {
        return result;
    })
        .catch(err => {
            console.log("fetchUsers ERROR : ", err)
            return null;
        })
    return res;
}

export function* handleLoadUsers() {
    try {
        let resp = yield call(fetchUsers);
        //console.log('result:', resp);
        yield put({
            type: 'SET_USERS',
            payload: resp,
        });
    } catch (err) {
        console.log("ERROOOOOR : ", err)
    }
}

export function* watchRefreshUsers() {
    console.log("HELLO FROM watchRefreshUsers : ");
    yield takeLatest('REFRESH_USERS', handleLoadUsers);
}