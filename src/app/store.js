import { configureStore, createAction, createReducer, createSlice, reducers } from '@reduxjs/toolkit';
import Navigations from '../Navigations';
import { NavigationAction } from '@react-navigation/native';
import { NavigationService } from '../NavigationService'
import { Provider, connect } from 'react-redux';

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
export const store = configureStore({
    reducer: {
        user: rootSlice.reducer,
        navState: navSlice.reducer,
    }
})

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

