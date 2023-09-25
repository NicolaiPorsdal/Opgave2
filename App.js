import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StackNavigator from "./StackNavigator";
import {LISTE} from './liste'
import StartSide from './StartSide';
const Tab = createBottomTabNavigator();

//Vores app arbejder herinde og det er her som den får afvide hvad den skal gøre
//Når der trykkes og navigeres på de forskellige ting

function App() {
  return (
  
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarActiveTintColor: "black",
          tabBarStyle: [],
          tabBarIcon: ({ color, size }) => {
              return (
                  <Ionicons
                      name='md-list-outline'
                      size={size}
                      color={color}
                  />
              );
          },
        })}
        >
          <Tab.Screen name="back" component={StackNavigator} />
        </Tab.Navigator>
      </NavigationContainer>

  );
}


export default App
