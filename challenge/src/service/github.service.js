import { instance } from './http.common.js';

export let searchUser = (name) => {
    //create the request and store the promise
    const promise = instance.get(`/searchUser/${name}`);

    //create a new promise to extract the data and return it
    return promise.then((response) => response.data);
}

export let getUserInfo = (username) => {

    //create the request and store the promise
    const promise = instance.get(`/getUserInfo/${username}`);

    //create a new promise to extract the data and return it
    return promise.then((response) => response.data);
}