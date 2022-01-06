import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";

export const storeData = async (storage_key, value) => {
    try{
        await AsyncStorage.setItem(storage_key,value);
        return true;
    } catch(e){
        console.log(e);
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

export const AuthenticatedUser = () => {
    const token = getData("token");
    if (!token) {
        console.log("please log in");
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