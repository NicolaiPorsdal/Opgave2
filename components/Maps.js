import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import  Constants  from 'expo-constants';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import { Accuracy } from 'expo-location';
import { useState, useEffect } from 'react';

export default function App() {
  //Alle vores const funktioner vi bruger til vores maps component 
  const [hasLocationPermission, setlocationPermission] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [userMarkerCoordinates, setUserMarkerCoordinates] = useState([])
  const [selectedCoordinate, setSelectedCoordinate] = useState(null)
  const [selectedAddress, setSelectedAddress] = useState(null)
  const getLocationPermission = async () => {
    await Location.requestForegroundPermissionsAsync().then((item)=>{
      setlocationPermission(item.granted) } ); };

  //Vi brugerne at bruge vores const funktioner for overstående og fortælle dem hvad de skal gøre på applikationen
  //Det er også det vi ser i de kommende linjer herunder, at vi bruger de overstående const funktioner
  useEffect (() => {
  const response = getLocationPermission() });

  {/*Updatere din lokation*/}
  const updateLocation = async () => {
  await Location.getCurrentPositionAsync({accuracy: Accuracy.Balanced}).then((item)=>{
  setCurrentLocation(item.coords)});};

  {/*Hvis brugeren holder længere varende på skærmen kommer der en makør frem eller flere*/}
  const handleLongPress = event => {
  const coordinate = event.nativeEvent.coordinate
  setUserMarkerCoordinates((oldArray) => [...oldArray, coordinate])};

{/*Vælge at sætte en makør på maps som kommer med koordinaterne*/}
{/*Fx hvis du skal sætte makøren på en dagligvarer butik*/}
  const handleSelectMarker = async coordinate =>{
    setSelectedCoordinate(coordinate)
    await Location.reverseGeocodeAsync(coordinate).then((data) => {
          setSelectedAddress(data)})};

{/*Fjerne eller vælge den valgte adressse på maps*/}
  const closeInfoBox = () =>
      setSelectedCoordinate(null) && setSelectedAddress(null)

  //Vi viser den nuværrende lokation og gør at den updatere hvis mobilen rykker sig
  const RenderCurrentLocation = (props) => {
    if (props.hasLocationPermission === null) {
      return null;
    }
    if (props.hasLocationPermission === false) {
      return <Text>No location access. Go to settings to change</Text>;
    }
    return (
//Første View på Maps delen
        <View>
          <Button style title="update location" onPress={updateLocation} />
          {currentLocation && (
              <Text>
                {`lat: ${currentLocation.latitude},\nLong:${
                    currentLocation.longitude
                }\nacc: ${currentLocation.accuracy}`}
              </Text>
          )}
        </View>);};

  {

//Vi tilføjer at personen kan se deres koodinatoer for lokationen så de ved præcis hvor de er
//Ligeledes tilføjer vi views til applikationen så vi kan gøre de visuelle bedre
    return (
//Andet View på Maps delen
        <SafeAreaView style={styles.container}>
          <RenderCurrentLocation props={{hasLocationPermission: hasLocationPermission, currentLocation: currentLocation}} />
{/* Trejde view på maps delen*/}
          <MapView
              provider="google"
              style={styles.map}
              showsUserLocation
              onLongPress={handleLongPress}>

            {userMarkerCoordinates.map((coordinate, index) => (
                <Marker
                    coordinate={coordinate}
                    key={index.toString()}
                    onPress={() => handleSelectMarker(coordinate)}
                />
            ))}

{/* fjerde og femte view på maps delen*/}
          </MapView>
          {selectedCoordinate && selectedAddress && (
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  {selectedCoordinate.latitude}, {selectedCoordinate.longitude}
                </Text>
                <Text style={styles.infoText}>
                  name: {selectedAddress[0].name}  region: {selectedAddress[0].region}
                </Text>
                <Button title="close" onPress={closeInfoBox} />
              </View> )}
        </SafeAreaView>);}}

//Styleing til vores ting på Maps og lokation til vores applikation
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  map: { flex: 1 },
  infoBox: {
    height: 200,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  infoText: {
    fontSize: 15,
  },
});