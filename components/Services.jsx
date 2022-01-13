import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";

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

const optionsPerPage = [2, 3, 4];

export const TabularData = () => {
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Dessert</DataTable.Title>
        <DataTable.Title numeric>Calories</DataTable.Title>
        <DataTable.Title numeric>Fat</DataTable.Title>
      </DataTable.Header>

      <DataTable.Row>
        <DataTable.Cell>Frozen yogurt</DataTable.Cell>
        <DataTable.Cell numeric>159</DataTable.Cell>
        <DataTable.Cell numeric>6.0</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
        <DataTable.Cell numeric>237</DataTable.Cell>
        <DataTable.Cell numeric>8.0</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Pagination
        page={page}
        numberOfPages={3}
        onPageChange={(page) => setPage(page)}
        label="1-2 of 6"
        optionsPerPage={optionsPerPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={'Rows per page'}
      />
    </DataTable>
  );
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

    getOpenProjects(token,successCallBack,noSuccess){
        let myheaders = new Headers()
        myheaders.append("Content-Type", "application/json");
        myheaders.append("Accept","application/json");
        myheaders.append("Authorization",token);
        let request = {method:"GET",headers:myheaders};
        this.sendRequest("/cb/projects/open",request,successCallBack,noSuccess);
    }

    createProject(token,form,successCallBack,noSuccess){
        let myheaders = new Headers()
        myheaders.append("Content-Type", "application/json");
        myheaders.append("Accept","application/json");
        myheaders.append("Authorization",token);
        let request = {
            method: "POST",
            headers: myheaders, 
            body: JSON.stringify(form)
        };
        this.sendRequest("/cb/projects/create",request,successCallBack,noSuccess);
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