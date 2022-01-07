import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ButtonMenu } from "./Widgets";
import { styles, deleteData, AuthenticatedUser, fetchUserData } from "./Services";
import { Avatar, Button, Card } from "react-native-paper";
import profile_placeholder from "../assets/blank-profile.png";
import { Instagram } from "react-content-loader";

export function ProfileScreen({navigation}) {
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        AuthenticatedUser(navigation,(token)=>{
            //fetchUserData(token);
        });
    });

    const handleResponse = (json) => {
        if("success" in json){
            if(json.success){
                storeData("token",json.data.token);
                storeData("user_id",json.data.user_id);
                navigation.navigate("Profile");
            } else {
                setNots(<BannerItem onClear={()=>{setNots(null)}} content={json.message}/>);
            }
        } else {
            let message = ""
            for(const property in json){
                message += json[property][0]+"\n";
            }
            setNots(<BannerItem onClear={()=>{setNots(null)}} content={message}/>);
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
          <Card style={{maxWidth: 320, margin: "auto"}}>
              <Card.Title 
                title="Funduluka Shangala" 
                subtitle="@fshangala"
                left={(props)=><Avatar.Icon {...props} icon="account" />}/>
            <Card.Cover source={profile_placeholder}/>
            <Card.Content></Card.Content>
            <Card.Actions>
                <Button
                    onPress={()=>{
                        deleteData("token");
                        navigation.navigate("Login");
                    }}>Log out</Button>
                <Button>Edit</Button>
            </Card.Actions>
          </Card>
        <ButtonMenu navigation={navigation} />
      </View>
    );
}
