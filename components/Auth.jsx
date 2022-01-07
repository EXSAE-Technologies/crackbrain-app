import * as React from "react";
import { View } from "react-native";
import { ActivityIndicator, Button, Card, Colors, TextInput } from "react-native-paper";
import { ButtonMenu,Snack,BannerItem } from "./Widgets";
import { baseUrl, storeData, styles } from "./Services";

export function SignupScreen({navigation}){
    const [form, setForm] = React.useState({
        first_name:"",
        last_name:"",
        email:"",
        password:""
    });
    const [loading, setLoading] = React.useState(false);
    const [nots, setNots] = React.useState(null)

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

    const signup = () => {
        setLoading(true);
        let myheaders = new Headers()
        myheaders.append("Content-Type", "application/json");
        myheaders.append("Accept","application/json");
        let request = new Request(baseUrl+"/auth/register", {method:"POST",headers:myheaders, body:JSON.stringify({
            first_name:form.first_name,
            last_name:form.last_name,
            email:form.email,
            password:form.password
        })});
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
            {nots}
            <Card>
                <Card.Title title="Sign Up" />
                <Card.Content>
                    <TextInput 
                        value={form.first_name} 
                        onChangeText={(value)=>{setForm({first_name:value,last_name:form.last_name,email:form.email,password:form.password})}} 
                        label="First name" 
                        style={styles.formTextInput} 
                        left={<TextInput.Icon name="account" />}/>
                    <TextInput 
                        value={form.last_name} 
                        onChangeText={(value)=>{setForm({first_name:form.first_name,last_name:value,email:form.email,password:form.password})}} 
                        label="Last name" 
                        style={styles.formTextInput} 
                        left={<TextInput.Icon name="account" />}/>
                    <TextInput 
                        value={form.email} 
                        onChangeText={(value)=>{setForm({first_name:form.first_name,last_name:form.last_name,email:value,password:form.password})}} 
                        label="E-mail" 
                        style={styles.formTextInput} 
                        left={<TextInput.Icon name="mail" />}/>
                    <TextInput 
                        value={form.password} 
                        onChangeText={(value)=>{setForm({first_name:form.first_name,last_name:form.last_name,email:form.email,password:value})}} 
                        label="Password" 
                        style={styles.formTextInput} 
                        left={<TextInput.Icon name="lock" />} secureTextEntry/>
                </Card.Content>
                <Card.Actions style={{justifyContent:"center"}}>
                    <Button disabled={loading} loading={loading} mode="contained" onPress={()=>{signup()}}>Signup</Button>
                    <Button disabled={loading} onPress={()=>{navigation.navigate("Login")}}>Have an account? Login</Button>
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
    const [loading, setLoading] = React.useState(false);
    const [nots, setNots] = React.useState(null);
    
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

    const login = () => {
        setLoading(true);
        let myheaders = new Headers()
        myheaders.append("Content-Type", "application/json");
        myheaders.append("Accept","application/json");
        let request = new Request(baseUrl+"/auth/login", {method:"POST",headers:myheaders, body:JSON.stringify({
            email:form.email,
            password:form.password
        })});
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
            {nots}
            <Card style={{maxWidth:425, margin:"auto"}}>
                <Card.Title title="Login" />
                <Card.Content>
                    <TextInput value={form.email} onChangeText={(value)=>{setForm({email:value,password:form.password})}} label="E-mail" style={styles.formTextInput} left={<TextInput.Icon name="account" />}/>
                    <TextInput value={form.password} onChangeText={(value)=>{setForm({password:value,email:form.email})}} label="Password" style={styles.formTextInput} left={<TextInput.Icon name="lock" />} secureTextEntry/>
                </Card.Content>
                <Card.Actions style={{justifyContent:"center"}}>
                    <Button disabled={loading} loading={loading} mode="contained" onPress={()=>{login()}}>Login</Button>
                    <Button disabled={loading} onPress={()=>{navigation.navigate("Signup")}}>New? Sign up</Button>
                </Card.Actions>
            </Card>
            <ButtonMenu navigation={navigation} />
        </View>
    );
}