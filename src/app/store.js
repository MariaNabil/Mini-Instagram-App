import { configureStore, createAction, createReducer, createSlice, reducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
///import { loginUser } from './Sagas'
import { getDefaultMiddleware } from '@reduxjs/toolkit'
import User from '../Models/User';

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
        //signIn: state => true
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
const sagaMiddleware = createSagaMiddleware();

//sagaMiddleware.run(loginUser);


const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];


export const store = configureStore({
    reducer: {
        isSignedIn: rootSlice.reducer,
        user: userSlice.reducer,
        navState: navSlice.reducer,
    },
    middleware,
});


//sagaMiddleware.run(loginUser);
/*
const AppNavigator = StackNavigator(Navigations());

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('AuthenticationStack'));

const navReducer = (state = initialState, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state);

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
};
*/
function onStateChange() {
    var s = store.getState();
    console.log("STORE onStateChanged : ", s);
    //console.log(store.getState().user);
}


store.subscribe(onStateChange)
export const { signIn, signOut } = rootSlice.actions
export const { logIn, logout } = navSlice.actions
export const { addUser, removeUser } = userSlice.actions


