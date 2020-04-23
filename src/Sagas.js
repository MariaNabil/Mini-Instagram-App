import * as NavigationService from './NavigationService'

export function* loginUser(action) {
    try {
        //const response = yield call(api.loginUser, action.user_data)
        //storeTokens(response)
        //yield put(usersDataActions.loginUser(response.data))
        NavigationService.navigate('ApplicationTabs');
    } catch (e) {
        Alert.alert("Login unsucessful!", "Sorry, it looks like your user/password combination is invalid.")
        console.log(e.body)
        /*if (environment.APP_ENV == 'production') {
            sentryHelper.sentryConfigureScope(action.user_data.email)
            Sentry.captureException(new Error(e.body))
        }
        yield put(usersDataActions.loginFailed(e.responseText))*/
    }
}