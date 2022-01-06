import React from "react";
import { View } from "react-native";
import { ButtonMenu } from "./Widgets";

export function ProfileScreen({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ButtonMenu navigation={navigation} />
      </View>
    );
}
