import { Button, StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import * as React from "react";
import { LISTE } from '../liste';
import { useState } from "react";

//Funktionen til vores indkøbsside
function IndkøbsSide({ navigation }) {
  const [pressedWords, setPressedWords] = useState([]);
  const handleWordPress = (word) => {
    if (pressedWords.includes(word)) {
      setPressedWords(pressedWords.filter((w) => w !== word));
    } else {
      setPressedWords([...pressedWords, word]);
    }
  };

  const [active, setActive] = useState(false);
  const [beløb, setBeløb] = useState({});
  const [totalSum, setTotalSum] = useState(0); // State for samlet sum
  const [searchText, setSearchText] = useState(''); // State for søgetekst

  // Beregn den samlede sum
  const calculateTotalSum = () => {
    let sum = 0;
    for (const vare in beløb) {
      if (!isNaN(parseFloat(beløb[vare])) && !isNaN(beløb[vare])) {
        sum += parseFloat(beløb[vare]);
      }
    }
    return sum;
  };

  // Filtrér listen baseret på søgeteksten
  const filteredList = LISTE.filter((vare) =>
    vare.toLowerCase().includes(searchText.toLowerCase())
  );

 //Beløbet som der handles for på applikationen
  const handleBeløbChange = (vare, text) => {
    setBeløb((prevBeløb) => ({ ...prevBeløb, [vare]: text }));
    const sum = calculateTotalSum();
    setTotalSum(sum);
  };

  //Alle vores views, der skulle meget gerne være 7 i alt
  // 6 views herinde inklusiv de 2 nye, samt 1 view på "Startsiden"
  return (

    
    <View style={styles.container}>

{/* View 1 "Text og overskift"*/}
      <Text style={styles.text}></Text>
      <View style={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column' }}>
        <View style={{ margin: '5%' }}>
          <Text style={styles.header}>Min indkøbsliste</Text>
        </View>

{/* View 2 (NYT VIEW") "Søg efter en vare"*/}
        <View style={styles.search}>
        <TextInput
          style={styles.searchInput}
          placeholder="Søg efter varer"
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        /></View>

{/* View 3 " ScrollView"*/}
{/* View 4 "Knap til at se om alt er købt"*/}
        <ScrollView style={styles.scrollView}>
          <View style={styles.knap}>
            <Button title="Klik her for at tjekke din liste af" onPress={() => setActive(!active)} />
            <Text>{active ? "Alt er købt" : "Alt er ikke krydset af"}</Text>
          </View>

          {filteredList.map((vare, key) => {
            const isPressed = pressedWords.includes(vare);
            const textColor = isPressed ? "green" : "red";
            const vareBeløb = beløb[vare] || "";

{/* View 5 (NYT VIEW) "En knap som gør man kan indtaste beløbet til hver varer til hvad den koster"*/}
            return (
              <View key={key} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text onPress={() => handleWordPress(vare)} style={{ color: textColor, flex: 1 }}>
                  {vare}
                </Text>
                <TextInput
                  style={{ color: 'black', fontSize: 16, flex: 1 }}
                  value={vareBeløb}
                  onChangeText={(text) => handleBeløbChange(vare, text)}
                  placeholder="Indtast beløb"
                />
              </View>
            );
          })}
        </ScrollView>

{/* Knap som summer alle beløb fra hver varer så brugeren kan se den overorndet pris*/}
        <Text style={styles.totalSumText}>Samlet Sum: {totalSum.toFixed(2)} DKK</Text>

{/* View 6 " Gå tilbage knap"*/}
        <View style={{ margin: '20%' }}>
          <Button title="Gå tilbage" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderWidth: 7,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },

  knap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },

  header: {
    color: "black",
    fontSize: 30,
  },

  searchInput: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },

  totalSumText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});

export default IndkøbsSide;