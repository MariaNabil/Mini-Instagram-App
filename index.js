/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
//import { rootReducer } from './src/app/store'
//import { configureStore } from '@reduxjs/toolkit';

AppRegistry.registerComponent(appName, () => App);

/*const store = configureStore({
    reducer: rootReducer
})

/*return(
    //<App />

    <Provider store={store}>
        <App />
    </Provider>,
    //document.getElementById('root')
)*/