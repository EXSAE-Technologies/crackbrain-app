import * as React from 'react';
import { Provider,Portal,FAB, Snackbar } from 'react-native-paper';

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

export function Snack(props) {
    const [visible,setVisible] = React.useState(true);
    const onDismiss = () => {setVisible(false)}
    return(
        <Snackbar
            style={{bottom:props.index*50,margin:"auto"}}
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