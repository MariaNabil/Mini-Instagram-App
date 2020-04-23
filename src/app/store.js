import { configureStore, createAction, createReducer, createSlice, reducers } from '@reduxjs/toolkit';
import Navigations from '../Navigations';
import { NavigationAction } from '@react-navigation/native';
import { NavigationService } from '../NavigationService'
import { Provider, connect } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import { loginUser } from './Sagas'
import { applyMiddleware, getDefaultMiddleware } from '@reduxjs/toolkit'
//import { nav } from '../nav'

/*const rootSlice = createSlice({
    name: 'user',
    initialState: false,
    reducers: {
        //signIn: state => true
        signIn: state => {
            state = true
        }
        /* signIn(state) {
             state => true;
             //NavigationAction.push('ApplicationTabs')
             //dispatch(NavigationActions.navigate({ routeName: 'ApplicationTabs' }));
             //NavigationService.navigate('ApplicationTabs');
 
             // await NavigationAction.push('ApplicationTabs');
             //NavigationSe
         }
        ,
        signOut(state) {
            state => false;
            //NavigationService.navigate('AuthenticationStack');
            //dispatch(NavigationActions.navigate({ routeName: 'AuthenticationStack' }));
            //NavigationAction.push('AuthenticationStack')
            //await navigator.push('AuthenticationStack');
            //NavigationSe
        },

    },
})*/

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
    name: 'user',
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

const sagaMiddleware = createSagaMiddleware();

//sagaMiddleware.run(loginUser);


const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];


export const store = configureStore({
    reducer: {
        user: rootSlice.reducer,
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
    console.log(store.getState().user);

    //console.log("NAVSTATE onStateChanged : ", store.getState().navState);
    //console.log(store.navState);
    //NavigationService.navigate('Profile');
    // return (<Navigations />)
}


store.subscribe(onStateChange)
export const { signIn, signOut } = rootSlice.actions
export const { logIn, logout } = navSlice.actions

