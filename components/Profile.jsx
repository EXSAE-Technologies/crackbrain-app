import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ButtonMenu } from "./Widgets";
import { styles, deleteData, AuthenticatedUser, baseUrl, Exsae, TabularData } from "./Services";
import { Avatar, Button, Card, DataTable, Text } from "react-native-paper";
import profile_placeholder from "../assets/blank-profile.png";
import { Instagram } from "react-content-loader";

var exsae = new Exsae();

export function ProfileScreen({navigation}) {
    const [loading,setLoading] = useState(false);
    const [user,setUser] = useState(null);

    useEffect(()=>{
        AuthenticatedUser(navigation,(token)=>{
            if(user == null){
                setLoading(true);
                exsae.getAuthenticatedUser(token,(json)=>{
                    if(json.success){
                        setUser(json.data);
                    } else {
                        console.log(json);
                    }
                    setLoading(false);
                },(json)=>{
                    console.log(json);
                    setLoading(false);
                });
            }
        });
    });
    
    return (
      <View style={styles.views}>
          {loading?<Instagram />: (user == null) ? <Text>No user to show!</Text> :
          <View>
            <Card style={{minWidth:300, margin: "auto"}}>
                <Card.Title 
                    title={`${user.first_name} ${user.last_name}`}
                    subtitle={user.email}
                    left={(props)=><Avatar.Icon {...props} icon="account" />}/>
                <Card.Cover source={profile_placeholder}/>
                <Card.Content>
                    <Button mode="contained" icon="plus" onPress={()=>{navigation.navigate("CreateProject")}}>Post a Project</Button>
                </Card.Content>
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
            </Card>
          </View>}
        <ButtonMenu navigation={navigation} />
      </View>
    );
}
