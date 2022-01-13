import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ButtonMenu } from "./Widgets";
import { styles, deleteData, AuthenticatedUser, baseUrl } from "./Services";
import { Avatar, Button, Card, Text } from "react-native-paper";
import profile_placeholder from "../assets/blank-profile.png";
import { Instagram } from "react-content-loader";

export function ProfileScreen({navigation}) {
    const [loading,setLoading] = useState(false);
    const [user,setUser] = useState(null);

    useEffect(()=>{
        AuthenticatedUser(navigation,(token)=>{
            if(user == null){
                fetchUserData(token);
            }
        });
    });

    const handleResponse = (json) => {
        if("success" in json){
            if(json.success){
                setUser(json.data);
            } else {
                console.log(json);
            }
        } else {
            console.log(json);
        }
        setLoading(false);
    }

    const fetchUserData = (token) => {
        setLoading(true);
        let myheaders = new Headers()
        myheaders.append("Content-Type", "application/json");
        myheaders.append("Accept","application/json");
        myheaders.append("Authorization",token);
        let request = new Request(baseUrl+"/auth/user", {method:"GET",headers:myheaders});
        fetch(request).then((response)=>{
            return response.json();
        }).then((json)=>{
            handleResponse(json);
        }).catch((error)=>{
            handleResponse(error);
        });
    }
    
    return (
      <View style={styles.views}>
          {loading?<Instagram />: (user == null) ? <Text>No user to show!</Text> :
          <Card style={{maxWidth: 320, margin: "auto"}}>
              <Card.Title 
                title={`${user.first_name} ${user.last_name}`}
                subtitle={user.email}
                left={(props)=><Avatar.Icon {...props} icon="account" />}/>
            <Card.Cover source={profile_placeholder}/>
            <Card.Content></Card.Content>
            <Card.Actions>
                <Button
                    onPress={()=>{
                        setLoading(true);
                        deleteData("token").then((value)=>{
                            setLoading(false);
                        });
                    }}>Log out</Button>
                <Button>Edit</Button>
            </Card.Actions>
          </Card>}
        <ButtonMenu navigation={navigation} />
      </View>
    );
}
