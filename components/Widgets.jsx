import * as React from 'react';
import { FlatList, SafeAreaView, VirtualizedList } from 'react-native';
import { Provider,Portal,FAB,Snackbar,Banner } from 'react-native-paper';

export function ButtonMenu({navigation}){
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
                        },
                        {
                            icon:"information-outline",
                            label:"About",
                            onPress: () => {navigation.navigate("About")}
                        }
                    ]}
                    onStateChange={onStateChange}/>
            </Portal>
        </Provider>
    )
}
/*
export function Snack(props) {
    const [visible,setVisible] = React.useState(true);
    const onDismiss = () => {setVisible(false)}
    return(
        <Snackbar
            style={{bottom:props.index*50+70,margin:"auto"}}
            visible={visible}
            onDismiss={onDismiss}
            action={
                {
                    label: "X",
                    onPress: () => {
                        setVisible(false);
                    }
                }
            }>{props.message}</Snackbar>
    );
}*/

function Item(props){
    const [visible,setVisible] = React.useState(true);
    const onDismiss = () => {setVisible(false)}
    return (
        <Snackbar
            //style={{bottom:props.index*50+70,margin:"auto"}}
            visible={visible}
            onDismiss={onDismiss}
            action={
                {
                    label: "X",
                    onPress: () => {
                        setVisible(false);
                    }
                }
            }>{props.message}</Snackbar>
        );
}

export function Snack(props) {
    const DATA = [
        {id:0,message:"help me"},
        {id:1,message:"save me"}
    ]
    const renderItem = ({item}) => {
        <Item message={item.message}/>
    }
    return(
        <SafeAreaView>
            <FlatList 
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}/>
        </SafeAreaView>
    );
}

export function BannerItem(props){
    const [visible,setVisible] = React.useState(true);
    return(
        <Banner
            visible={visible}
            actions={[
                {
                    label: "Dismiss",
                    onPress: () => {props.onClear()}
                }
            ]}>{props.content}</Banner>
    )
}