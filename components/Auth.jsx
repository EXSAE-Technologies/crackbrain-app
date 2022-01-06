import * as React from "react";
import { View } from "react-native";
import { Button, Card, TextInput } from "react-native-paper";
import { ButtonMenu } from "./Widgets";
import { baseUrl, styles } from "./Services";

export function SignupScreen({navigation}){
    const [form, setForm] = React.useState({
        username:"",
        email:"",
        password:""
    });
    const [res, setRes] = React.useState({loading:false})

    const signup = () => {
        setRes({loading:true});
        let myheaders = new Headers()
        myheaders.append("Content-Type", "application/json");
        myheaders.append("Accept","application/json");
        let request = new Request(baseUrl+"/auth/register", {method:"POST",headers:myheaders, body:JSON.stringify({
            username:form.username,
            email:form.email,
            password:form.password
        })});
        fetch(request).then((response)=>response.json()).then((json)=>{
            console.log(json)
        }).catch((error)=>console.log(error)).finally(setRes({loading:false}));
    }

    return (
        <View style={styles.views}>
            <Card>
                <Card.Title title="Sign Up" />
                <Card.Content>
                    <TextInput 
                        value={form.username} 
                        onChangeText={(value)=>{setForm({username:value,email:form.email,password:form.password})}} 
                        label="Username" 
                        style={styles.formTextInput} 
                        left={<TextInput.Icon name="account" />}/>
                    <TextInput 
                        value={form.email} 
                        onChangeText={(value)=>{setForm({email:value,username:form.username,password:form.password})}} 
                        label="E-mail" 
                        style={styles.formTextInput} 
                        left={<TextInput.Icon name="mail" />}/>
                    <TextInput 
                        value={form.password} 
                        onChangeText={(value)=>{setForm({password:value,username:form.username,email:form.email})}} 
                        label="Password" 
                        style={styles.formTextInput} 
                        left={<TextInput.Icon name="lock" />} secureTextEntry/>
                </Card.Content>
                <Card.Actions style={{justifyContent:"center"}}>
                    <Button mode="contained" onPress={()=>{signup()}}>Signup</Button>
                    <Button onPress={()=>{navigation.navigate("Login")}}>Have an account? Login</Button>
                </Card.Actions>
            </Card>
            <ButtonMenu navigation={navigation} />
        </View>
    );
}

export function LoginScreen({navigation}){
    const [form, setForm] = React.useState({
        email:"",
        password:""
    });
    const [res, setRes] = React.useState({loading:false})

    const login = () => {
        console.log(form);
        setRes({loading: true});
        fetch("http://localhost/auth/login",{
            method:"POST",
            body: JSON.stringify({
                email: form.email,
                password: form.password
            })
        }).then((response)=>{
            console.log(response)
            setRes({loading: false});
        });
    }
    return (
        <View style={styles.views}>
            <Card>
                <Card.Title title="Login" />
                <Card.Content>
                    <TextInput value={form.email} onChangeText={(value)=>{setForm({email:value,password:form.password})}} label="E-mail" style={styles.formTextInput} left={<TextInput.Icon name="account" />}/>
                    <TextInput value={form.password} onChangeText={(value)=>{setForm({password:value,email:form.email})}} label="Password" style={styles.formTextInput} left={<TextInput.Icon name="lock" />} secureTextEntry/>
                </Card.Content>
                <Card.Actions style={{justifyContent:"center"}}>
                    <Button mode="contained" onPress={()=>{login()}}>Login</Button>
                    <Button onPress={()=>{navigation.navigate("Signup")}}>New? Sign up</Button>
                </Card.Actions>
            </Card>
            <ButtonMenu navigation={navigation} />
        </View>
    );
}