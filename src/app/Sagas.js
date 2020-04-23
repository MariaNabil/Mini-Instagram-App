import * as NavigationService from '../NavigationService'
import { View, Image, TextInput, Button, Alert } from 'react-native';
import { dispatch, navigate } from 'redux-saga'
import { NavigationActions } from '@react-navigation/native'
//import { Act } from '@reduxjs/toolkit'
/*const navigateAction = NavigationActions.navigate({
    routeName: 'AuthenticationStack', params: {},
    action: NavigationActions.navigate({ routeName: 'ApplicationTabs' }),
});*/


export function* loginUser(action) {
    try {
        yield put(NavigationActions.navigate({ routeName: 'ApplicationTabs' }));

        //const response = yield call(api.loginUser, action.user_data)
        //storeTokens(response)
        //yield put(usersDataActions.loginUser(response.data))
        //NavigationService.navigate('ApplicationTabs');
        //dispatch(NavigationActions.navigate({ routeName: 'ApplicationTabs' }));
        //dispatch(navigateAction);

    } catch (e) {
        Alert.alert("Login unsucessful!", "Sorry, it looks like your user/password combination is invalid.")
        //NavigationService.navigate('AuthenticationStack');

        console.log(e.body)
        yield put(NavigationActions.navigate({ routeName: 'AuthenticationStack' }));

        //dispatch(navigateAction);

        /*if (environment.APP_ENV == 'production') {
            sentryHelper.sentryConfigureScope(action.user_data.email)
            Sentry.captureException(new Error(e.body))
        }
        yield put(usersDataActions.loginFailed(e.responseText))*/
    }
}