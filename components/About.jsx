import React from "react";
import { View } from "react-native";
import { Portal,FAB, Provider } from "react-native-paper";

function ButtonMenu({navigation}){
    const [open,setOpen] = React.useState(false);
    const onStateChange = ({open}) => setOpen(open);
    return (
        <Provider>
            <Portal>
                <FAB.Group 
                    open={open}
                    icon="menu"
                    actions={[
                        {
                            icon:"briefcase",
                            label:"Projects",
                            onPress: () => {navigation.navigate("Projects")}
                        }
                    ]}
                    onStateChange={onStateChange}/>
            </Portal>
        </Provider>
    )
}

export function AboutScreen({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ButtonMenu navigation={navigation} />
      </View>
    );
}
