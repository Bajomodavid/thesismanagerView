import axios from "axios";
import moment from 'moment';

export const getHeaders = () => {
    let token = localStorage.getItem("token");
    if(token !== '' && token !== null && token !== undefined ) {
        return {
            'Content-Type': `application/json`,
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    }
    else{
        return {
            'Content-Type': `application/json`,
            'Accept': 'application/json',
        }
    }
}

export const getUploadHeaders = () => {
    let token = getTokenRole();
    if(token !== '' && token !== null && token !== undefined ) {
        return {
            'Authorization': `Bearer ${token}`,
        }
    }
    else{
        return {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
        }
    }

}


// export const baseUrl = "http://thesisapi.test/api/v1/";
export const baseUrl = " http://2547bf3e.ngrok.io/api/v1/";

export const siteUrl = "http://thesisapi.test/";
// export const siteUrl = "http://localhost:8000/";

export const localUrl = "http://money.test";

export const projectImage = siteUrl+'storage/uploads/projects/images/';

export const packImage = siteUrl+'storage/uploads/projects/investor_pack/';

export const profileUrl = siteUrl+'storage/uploads/profiles/photos/';

export const profileAvatar = siteUrl+'assets/images/avatars/noavatar.png';



export const http = (url, method = 'GET', data = null) => {
    
    let tokenCheck = localStorage.getItem('token_expires');
    if(tokenCheck < moment.now()) localStorage.clear();
    return(
        axios({
            method: method,
            url: baseUrl + url,
            headers: getHeaders(),
            data: data,
        })
    );
}

export const objectToArray = (object) => {
    let result = Object.keys(object).map(i => object[i])

    return result;
}

export const handleErrors = (errors) => {
    console.log(errors);
    if(errors.errors !== undefined) {
        let newArray = [];
        let array = objectToArray(errors.errors);
        for (let index = 0; index < array.length; index++) {
            newArray.push(array[index][0])
        }
        return newArray;
    }

    return errors.error;
}

export const getToken = (role) => {

    if(role === "admin") {
        return JSON.parse(localStorage.getItem("token"));
    }
    if(role === "student") {
        return JSON.parse(localStorage.getItem("token"));
    }
}



export const getTokenRole = () => {
    console.log(localStorage.getItem("role"))
    if(localStorage.getItem("role") !== null) {
        return getToken(JSON.parse(localStorage.getItem("role")));
    }
    if(sessionStorage.getItem("role") !== null) {
        return getToken(JSON.parse(sessionStorage.getItem("role")));
    }

    return null;
}

export const getRole = () => {
    console.log(localStorage.getItem("role"))
    if(localStorage.getItem("role") !== null) {
        return localStorage.getItem("role");
    }
    if(sessionStorage.getItem("role") !== null) {
        return sessionStorage.getItem("role");
    }

    return null;
}

export const clearToken = () => {
    sessionStorage.clear();
    localStorage.clear();
}

export const getReference = () => {
    //you can put any unique reference implementation code here
    let text = "PEIN_";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";

    for( let i=0; i < 20; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
