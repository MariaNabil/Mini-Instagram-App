import { configureStore, createSlice } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import { getDefaultMiddleware } from '@reduxjs/toolkit'
import User from '../Models/User';
import { handleLoadUsers, watchRefreshUsers } from './sagas'
import { mySagaReducer } from './MySagaReducer'

//#region Redux Toolkit Slices
const navSlice = createSlice({
    name: 'navState',
    initialState: 'AuthenticationStack',
    reducers: {
        logIn(state) {
            state = 'ApplicationTabs';
            return state;
        },
        logout(state) {
            state = 'AuthenticationStack';
            return state;
        }

    },
})

const rootSlice = createSlice({
    name: 'isSignedIn',
    initialState: false,
    reducers: {
        signIn: (state) => {
            state = true;
            return state;
        },
        signOut(state) {
            state = false;
            return state;
        },

    },
})

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        addUser: (state, action) => {
            state = JSON.stringify(new User(JSON.parse(action.payload)));
            return state;
        },
        removeUser(state) {
            state = null;
            return state;
        },

    },
})
//#region 

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        isSignedIn: rootSlice.reducer,
        user: userSlice.reducer,
        navState: navSlice.reducer,
        users: mySagaReducer,
    }
    ,
    middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware]
}
);

sagaMiddleware.run(handleLoadUsers);
sagaMiddleware.run(watchRefreshUsers);

export const action = type => store.dispatch({ type });

//#region onStateChange Listener
function onStateChange() {
    var s = store.getState();
    console.log("STORE onStateChanged : ", s);
}

store.subscribe(onStateChange)
export const { signIn, signOut } = rootSlice.actions
export const { logIn, logout } = navSlice.actions
export const { addUser, removeUser } = userSlice.actions


