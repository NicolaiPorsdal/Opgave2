import {Button, StyleSheet, Text, View, ScrollView} from "react-native";
import * as React from "react";
import { LISTE } from '../liste'
import { useState } from "react";


//Vi starter med at lave en overordnet funktion til alle vores views som bliver sat ind under 
function IndkøbsSide({ navigation}) {

// Hertil laver vi en press bottum til vores liste så vores varer kan blive krydset af når vi klikker på dem
    const [pressedWords, setPressedWords] = useState([]);

//Laver en const til at få vores ord til at blive grønne når de bliver klikket på
    const handleWordPress = (word) => {
        if (pressedWords.includes(word)) {
          setPressedWords(pressedWords.filter((w) => w !== word));
        } else { 
          setPressedWords([...pressedWords, word]);
        }
      };

//Vi vil også gerne have en overordnet knap som vi kan klikke på når alt er krydset af på listen
    const [active, setActive] = useState(false);
    return (
    
//Der er ialt 5 Views på appen og 5 knapper
//Vi har 4 forskellige views til appen herinde og 1 mere inde på "Starside", så i alt 5 views

// 1 = Vi har vores overordnet tekst til vores indkøbsliste
// 2 = Vi har vores design view til teksten
// 3 = Vi har vores scroll view så vi kan scrolle ned i indkøbslisten
// 4 = Vi har alle vores knapper views til at komme rundt på siden

//Det er også herinde vi henter information fra vores database som er listen 
//Herved henter vi information over hvilke varer der er på listen og sender til appen

<View style={styles.container}>
<Text style={styles.text}></Text>
<View style={{display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column'}}>
<View style={{margin: '5%'}} >
<Text style = {styles.header}>Min indkøbsliste</Text>
</View>
        

<ScrollView style={styles.scrollView}>
<View style={styles.knap}>
<Button title="Klik her for at tjekke din liste af" onPress={() => setActive(!active)} />
<Text> {active ? "Alt er købt" : "Alt er ikke købt"}</Text>
</View>

{LISTE.map((vare, key) => {
const isPressed = pressedWords.includes(vare);
const textColor = isPressed ? "green" : "red";

return (
<Text
key={key}
onPress={() => handleWordPress(vare)}
style={{ color: textColor }}>
{vare}</Text>);})}
</ScrollView>

<View style={{margin: '20%'}} >
<Button title="Gå tilbage" onPress={() => navigation.goBack() } />
</View>
</View>
</View>);}

export default IndkøbsSide

//Vi styler vores app med forskellige ting
const styles = StyleSheet.create({
    container: {
        borderColor: 'black',
        borderWidth: 7,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
    },

    knap:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
    },

    header:{
      color: "black",
      fontSize: "30px"
    },
});
