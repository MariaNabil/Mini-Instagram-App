import { NavigationAction } from '@react-navigation/native';

export function navigate(routeName, params) {
    //  if (config.navigator && routeName) {
    let action = NavigationAction.navigate({ routeName, params });
    dispatch(action);
    //  }
}
export function goBack() {
    // if (config.navigator) {
    let action = NavigationActions.back({});
    dispatch(action);
    // }
}