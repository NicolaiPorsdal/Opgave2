import * as React from "react";
import IndkøbsSide from "./components/FirstComponents";
import StartSide from "./StartSide";
import { createStackNavigator } from '@react-navigation/stack';

//Det er herinde hele vores navigationssystem fungere
//Her sender vi brugeren for den ene side til den anden siden når der trykkes på en knap
const Stack = createStackNavigator()

//Vi laver en funktion som start til at kunne navigere
//Herunder har vi så vores to forskellige sider "Startsiden" og "Indkøbslisten"
//Dem har vi hver især så givet et component så vi kan udvikle knapperne under de andre lister
function StackNavigator() {
return (
<Stack.Navigator
initialRouteName="StartSide">

<Stack.Screen name="StartSide" component={StartSide}
options={{
headerTitleStyle: {color: 'white'},
headerStyle: {backgroundColor: 'black'}}}/>

<Stack.Screen name="IndkøbsSide" component={IndkøbsSide} options={{
headerTitleStyle: {color: 'white' },
headerStyle: {backgroundColor: 'black'}}} />
</Stack.Navigator>)}

export default StackNavigator


