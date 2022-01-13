import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { ActivityIndicator, Avatar, Button, Card, List, TextInput } from "react-native-paper";
import { AuthenticatedUser, Exsae, styles } from "./Services";
import { BannerItem, ButtonMenu } from "./Widgets";

var exsae = new Exsae();

export function ProjectsScreen({navigation}) {
    const [loading,setLoading] = useState(false);
    const [projects,setProjects] = useState(null);

    useEffect(()=>{
      AuthenticatedUser(navigation, (token)=>{
        if(projects == null){
            setLoading(true);
            exsae.getOpenProjects(token,(json)=>{
                if(json.success){
                    console.log(json);
                    setProjects(json.data);
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
    })

    const renderItem = ({item}) => {
      return(
      <List.Item
          title={item.title}
          description="Project Description"
          left={props => <List.Icon {...props} icon="briefcase" />} />)
    }
    
    return (
        <SafeAreaView style={{flex:1}}>
          {loading ? <ActivityIndicator />:null}
          <FlatList 
            data={projects}
            renderItem={renderItem}
            keyExtractor={(item)=>item.id}/>
            <ButtonMenu navigation={navigation} />
        </SafeAreaView>
    );
}

export function CreateProjectScreen({navigation}){
  const [loading,setLoading] = useState(false);
  const [form,setForm] = useState({
    title:"",
    detail:"",
    min_bid:"",
    max_bid:""
  });
  const [nots, setNots] = useState(null);

  const createProject = () => {
    AuthenticatedUser(navigation, (token)=>{
      exsae.createProject(token,form,(json)=>{
        if(json.success){
          console.log(json);
          navigation.navigate("Projects");
        } else {
            setNots(<BannerItem onClear={()=>{setNots(null)}} content={json.message}/>);
        }
        setLoading(false);
      },(json)=>{
        let message = ""
        for(const property in json){
            message += json[property][0]+"\n";
        }
        setNots(<BannerItem onClear={()=>{setNots(null)}} content={message}/>);
        setLoading(false);
      });
    });
  }

  return (
    <View style={styles.views}>
      {nots}
      <Card style={{minWidth:300,margin:"auto"}}>
        <Card.Title title="Create A Project" />
        <Card.Content>
          <TextInput 
            label="Project Title" 
            value={form.title}
            style={styles.formTextInput}
            onChangeText={(value)=>{
              setForm({title:value,detail:form.detail,min_bid:form.min_bid,max_bid:form.max_bid})
            }} />
          <TextInput 
            label="Project Details" 
            value={form.detail}
            style={styles.formTextInput}
            onChangeText={(value)=>{
              setForm({title:form.title,detail:value,min_bid:form.min_bid,max_bid:form.max_bid})
            }} />
          <TextInput 
            label="Minimum bid" 
            value={form.min_bid}
            style={styles.formTextInput}
            keyboardType="numeric"
            onChangeText={(value)=>{
              setForm({title:form.title,detail:form.detail,min_bid:value.replace(/[^0-9|.]/g, ''),max_bid:form.max_bid})
            }} />
          <TextInput 
            label="Maximum bid" 
            value={form.max_bid}
            style={styles.formTextInput}
            keyboardType="numeric"
            onChangeText={(value)=>{
              setForm({title:form.title,detail:form.detail,min_bid:form.min_bid,max_bid:value.replace(/[^0-9|.]/g, '')})
            }} />
            
        </Card.Content>
        <Card.Actions style={{justifyContent:"center"}}>
            <Button disabled={loading} loading={loading} mode="contained" onPress={()=>{createProject()}}>Create</Button>
        </Card.Actions>
      </Card>
      <ButtonMenu navigation={navigation} />
    </View>
  )
}
