import { Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

//Vi laver et view som viser et billede for nettet over en ret personen skal lave
//I dette tilfælde er det bare en enkelt start på appen, og den viser personen skal lave en burger
//Vi laver først en funktion til at nagivere rundt på siden
//Derefter en funktion til at vise billedet og kunne trykket på knapperne som fører videre til hjemmesiden
const navController = (navigation, route) => {
  navigation.navigate(route);
};

//Funktion til at vise billede og navigere rundt på appen
function StartSide({ navigation }) {
  const [showImage, setShowImage] = useState(false);

// Return statement som viser hvad der skal retuneres ud fra funktionen
//Her laver vi så vores knapper og hvor de skal navigere os hen eller vise
//Her har vi et view som viser et billede på startsiden når man trykker på en knap
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Startside</Text>
      <Button
        title="Gå til indkøbsliste"
        onPress={() => navController(navigation, 'IndkøbsSide')}/>

        <Button title="Vis billede fra nettet"
          onPress={() => {
            setShowImage(!showImage);}}/>

        {showImage && (<>
            <Image
              source={{
                uri: "https://madensverden.dk/wp-content/uploads/2021/02/verdens-bedste-burger.jpg",
              }}
              style={styles.image}
            />
            <Text style={styles.imageText}>Du skal lave denne ret i dag</Text>
          </>
        )}
      </View>

  );
}
export default StartSide;

//Styler vores apps startside
const styles = StyleSheet.create({
    container: {
        borderColor: 'black',
        borderWidth: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
    },

    text: {
        fontSize: 30,
    },

    image: {
        width: 200,
        height: 200,
      },
});