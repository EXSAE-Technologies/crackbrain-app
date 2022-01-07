import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ButtonMenu } from "./Widgets";
import { styles, deleteData, AuthenticatedUser } from "./Services";
import { Avatar, Button, Card } from "react-native-paper";
import profile_placeholder from "../assets/blank-profile.png";

export function ProfileScreen({navigation}) {
    useEffect(()=>{
        AuthenticatedUser(navigation);
    });
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
