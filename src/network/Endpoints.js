import { WEBOPS_API, API_METHODS } from './APIConfig';

class EndPoints {
    constructor() {
        this.endPointsList = {
            "users": {
                baseUrl: WEBOPS_API.BASE_URL,
                url: WEBOPS_API.USERS,
                method: API_METHODS.GET,
                needsAuth: false
            },
            /*"posts": {
                baseUrl: WEBOPS_API.BASE_URL,
                url: WEBOPS_API.POSTS,
                method: API_METHODS.GET,
                needsAuth: false
            },
            "users": {
                baseUrl: WEBOPS_API.BASE_URL,
                url: WEBOPS_API.USERS,
                method: API_METHODS.GET,
                needsAuth: false
            },
            "profile": {
                baseUrl: WEBOPS_API.BASE_URL,
                url: WEBOPS_API.PROFILE,
                method: API_METHODS.GET,
                needsAuth: false,
            },
            "comments": {
                baseUrl: WEBOPS_API.BASE_URL,
                url: WEBOPS_API.COMMENTS,
                method: API_METHODS.GET,
                needsAuth: false,
            },*/
        }
    }

    getEndPointByKey(key) {
        return this.endPointsList[key];
    }
}

export const endPoints = new EndPoints();