import { endPoints, DEFAULT_TIMEOUT } from './';
import { API_METHODS } from './APIConfig';
import axios from 'axios'

class API {
    constructor() {
        this.instance = null;
    }

    createAxiosInstance(baseURL) {
        this.instance = axios.create({
            baseURL,
            timeout: DEFAULT_TIMEOUT,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });

    }

    /*async request(key,method) {
        let endpoint = endPoints.getEndPointByKey(key);
        if (endpoint.baseUrl != "") {
            this.createAxiosInstance(endpoint.baseUrl)
        }

        try {
            switch (endpoint.method) {
                case API_METHODS.GET:
                    return await this.getFromAxios(endpoint.url)
                case API_METHODS.POST:
                    return await this.postUsingAxios(endpoint.url)
                default:
                    break;
            }
        } catch (error) {
            throw error
        }
    }*/

    async request(key, method, obj) {
        let endpoint = endPoints.getEndPointByKey(key);
        if (endpoint.baseUrl != "") {
            this.createAxiosInstance(endpoint.baseUrl)
        }

        try {
            switch (method) {
                case API_METHODS.GET:
                    return await this.getFromAxios(endpoint.url);
                    break;
                case API_METHODS.POST:
                    return await this.postUsingAxios(endpoint.url, obj);
                    break;
                default:
                    break;
            }
        } catch (error) {
            throw error
        }
    }


    async getFromAxios(path) {
        try {
            const response = await this.instance.get(path);
            if (response && response.data != undefined) {
                return response.data;
            }
            throw "No Data";
        } catch (error) {
            throw error;
        }
    }

    async postUsingAxios(path, obj) {
        try {
            const response = await this.instance.post(path, obj)
            console.log("API Class , postUsingAxios , response : ", response)
            if (response && response.data != undefined) {
                return response.data;
            }
            throw "No Data Added";
        } catch (error) {
            throw error;
        }
    }
}

export const api = new API();