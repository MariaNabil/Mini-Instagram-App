/** My Store **/
const myInitialState = JSON.stringify({
    quakes: [],
})

export const mySagaReducer = function (state = myInitialState, action) {
    switch (action.type) {
        case 'SET_USERS':
            return action.payload;
    }

    return state;
}

