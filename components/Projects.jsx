import { View, Text } from "react-native";
import { List } from "react-native-paper";
import { ButtonMenu } from "./Widgets";

export function ProjectsScreen({navigation}) {
    return (
      <View style={{flex:1}}>
          <View>
            <List.Item
                title="My Project"
                description="Project Description"
                left={props => <List.Icon {...props} icon="briefcase" />} />
          </View>
        <ButtonMenu navigation={navigation} />
      </View>
    );
}
  