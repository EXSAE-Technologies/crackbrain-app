import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ButtonMenu } from "./Widgets";
import { AuthenticatedUser, getData } from "./Services";

export function ProfileScreen({navigation}) {
    //const token = getData("token");
    useEffect(()=>{
        //AuthenticatedUser();
        getData("token").then((value)=>{
            if(value){
                console.log(value);
            } else {
                console.log("Please log in");
                navigation.navigate("Login");
            }
        });
    });
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ButtonMenu navigation={navigation} />
      </View>
    );
}
