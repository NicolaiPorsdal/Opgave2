import * as React from "react";
import IndkøbsSide from "./components/Indkøbsliste";
import StartSide from "./StartSide";
import Maps from "./components/Maps";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="StartSide">
      <Stack.Screen
        name="StartSide"
        component={StartSide}
        options={{
          headerTitleStyle: { color: 'white' },
          headerStyle: { backgroundColor: 'black' }
        }}
      />
      <Stack.Screen
        name="IndkøbsSide"
        component={IndkøbsSide}
        options={{
          headerTitleStyle: { color: 'white' },
          headerStyle: { backgroundColor: 'black' }
        }}
      />
      <Stack.Screen
        name="Maps"
        component={Maps} 
        options={{
          headerTitleStyle: { color: 'white' },
          headerStyle: { backgroundColor: 'black' }
        }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;


