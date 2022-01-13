import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";

export const storeData = async (storage_key, value) => {
    try{
        await AsyncStorage.setItem(storage_key,value);
        return true;
    } catch(e){
        console.log(e);
        return false;
    }
}

export const getData = async (storage_key) => {
    try {
        const value = await AsyncStorage.getItem(storage_key);
        return value;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const deleteData = async (storage_key) => {
    try {
        await AsyncStorage.removeItem(storage_key);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const AuthenticatedUser = (navigation, callBack) => {
    getData("token").then((value)=>{
        if(value == null){
            navigation.navigate("Login");
        } else if (value == "undefined") {
            navigation.navigate("Login");
        } else {
            callBack(value);
        }
    });
}

export const handleResponse = (json, successCallBack=null, noSuccess=null) => {
    if("success" in json){
        if(successCallBack != null){
            successCallBack(json);
        }
    } else {
        if(noSuccess != null){
            noSuccess(json);
        }
    }
}

export class Exsae {
    constructor(){
        this.baseUrl = "http://localhost"
    }

    handleResponse(json,successCallBack,noSuccess){
        if("success" in json){
            successCallBack(json);
        } else {
            noSuccess(json);
        }
    }

    sendRequest(path,conf,successCallBack,noSuccess){
        let request = new Request(this.baseUrl+path,conf);
        fetch(request).then((response)=>response.json()).then((json)=>{
            this.handleResponse(json,successCallBack,noSuccess);
        }).catch((error)=>{
            this.handleResponse(error,successCallBack,noSuccess);
        });
    }

    getAuthenticatedUser(token,successCallBack,noSuccess){
        let myheaders = new Headers()
        myheaders.append("Content-Type", "application/json");
        myheaders.append("Accept","application/json");
        myheaders.append("Authorization",token);
        let request = {method:"GET",headers:myheaders};
        this.sendRequest("/auth/user",request,successCallBack,noSuccess);
    }

    login(form,successCallBack,noSuccess){
        let myheaders = new Headers()
        myheaders.append("Content-Type", "application/json");
        myheaders.append("Accept","application/json");
        let request = {
            method: "POST",
            headers: myheaders, 
            body: JSON.stringify({
                email:form.email,
                password:form.password
            })
        };
        this.sendRequest("/auth/login",request,successCallBack,noSuccess);
    }

    signup(form,successCallBack,noSuccess){
        let myheaders = new Headers();
        myheaders.append("Content-Type", "application/json");
        myheaders.append("Accept","application/json");
        let request = {
            method: "POST",
            headers: myheaders, 
            body: JSON.stringify({
                first_name:form.first_name,
                last_name:form.last_name,
                email:form.email,
                password:form.password
            })
        };
        this.sendRequest("/auth/register",request,successCallBack,noSuccess);
    }
}

export const baseUrl = "http://localhost";

export const styles = StyleSheet.create({
    surface: {
        padding: 8
    },
    views: {
        padding: 8,
        flex: 1
    },
    formTextInput: {
        marginBottom: 8,
    }
});