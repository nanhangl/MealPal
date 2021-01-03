import React, { useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {Input, Image, Button} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker';
import {FontAwesome5} from '@expo/vector-icons';
import { navigate } from '../navigationRef';
import mealpalApi from '../api/mealpal';
import * as firebase from 'firebase';
import uuid from 'uuid';
import * as Location from 'expo-location';
import MapView, {Circle} from 'react-native-maps';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBFW_RA0aBHxa31nvvC4mdLzpL5rpVVmwg",
    authDomain: "mealpal-b97b8.firebaseapp.com",
    projectId: "mealpal-b97b8",
    storageBucket: "mealpal-b97b8.appspot.com",
    messagingSenderId: "631819321871",
    appId: "1:631819321871:web:ef5a0e2bfc8ab32182997a",
    measurementId: "G-JRY2226R1K"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  
    const ref = firebase
      .storage()
      .ref()
      .child(uuid.v4());
    const snapshot = await ref.put(blob);
  
    // We're done with the blob, close and release it
    blob.close();
  
    return await snapshot.ref.getDownloadURL();
  }

const OrderDeliveredScreen = ({navigation}) => {
    const [image, setImage] = useState({uri:'https://firebasestorage.googleapis.com/v0/b/mealpal-b97b8.appspot.com/o/21226%20%5BConverted%5D2.png?alt=media&token=54215ba4-d38d-4893-8c3b-43881136553c'});
    const [errorMessage, setErrorMessage] = useState("");
    const [location, setLocation] = useState({ latitude: 1.3521, longitude: 103.8198, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
    var orderObj = navigation.getParam('order');
    var customerObj = navigation.getParam('customer');

    useState(async () => {
        let gpsdata = await Location.getCurrentPositionAsync({});
        var gpsdataObj = {latitude: gpsdata.coords.latitude, longitude: gpsdata.coords.longitude, latitudeDelta: 0.0005, longitudeDelta: 0.0005}
        setLocation(gpsdataObj);
      })

    const openCamera = async () => {
        ImagePicker.requestCameraPermissionsAsync()
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1
        });
    
        if (!result.cancelled) {
            setImage(result);
        }
      };

      const submitForm = async () => {
        var errMsg = []
        if (image.uri == "" || image.uri == 'https://firebasestorage.googleapis.com/v0/b/mealpal-b97b8.appspot.com/o/21226%20%5BConverted%5D2.png?alt=media&token=54215ba4-d38d-4893-8c3b-43881136553c') {
            errMsg.push("No Image")
        }
        if (location == { latitude: 1.3521, longitude: 103.8198, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }) {
            errMsg.push("No Location")
        }
        if (errMsg.length > 0) {
            setErrorMessage(errMsg.join(", "))
        } else {
            var downloadUrl = await uploadImageAsync(image.uri);
            var gps = [location.latitude, location.longitude]
            var orderId = orderObj._id
            mealpalApi.post('/orderDelivered', { orderId, downloadUrl, gps }).then(() => {
                navigate('Home');
            })
        }
      }
    return (
                <ScrollView>
                    <View style={styles.image}>
                    <Image
                        style={{width:350, height: 300}}
                        source={{uri: image.uri}}
                    />
                    <TouchableOpacity style={styles.addImage} onPress={openCamera}>
                    <FontAwesome5 name="camera" size={24} color="#0b68bf" />
                    <Text style={{fontWeight:'bold',marginLeft:10,marginTop:2,color:'#0b68bf'}}>Take Photo of Unit Number</Text>
                    </TouchableOpacity>
                    </View>
                    <Text style={{fontSize:16,fontWeight:'bold',marginLeft:9,color:'#86939e'}}>Delivery Location</Text>
                    <Text style={{marginLeft:10}}>{customerObj.address}</Text>
                    <Text style={{fontSize:16,fontWeight:'bold',marginLeft:9,marginTop:10,color:'#86939e'}}>Current Location</Text>
                    <MapView region={location} style={{width:'95%',height:150,marginHorizontal:10,marginTop:10}}>
                    <Circle
                        center={location}
                        radius={10}
                        strokeColor="rgba(158, 158, 255, 1.0)"
                        fillColor="rgba(158, 158, 255, 0.3)"
                    />
                    </MapView>
                    <View style={{marginTop:30,marginHorizontal:10}}>
                    <Button title="Confirm Delivery" onPress={submitForm} />
                    </View>
                </ScrollView>
            )
};

const styles = StyleSheet.create({
    image: {
        alignItems: 'center',
        marginVertical: 20
    },
    addImage: {
        flexDirection: 'row',
        marginTop: 20
    }, 
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginBottom: 20,
        marginHorizontal: 11
      }
});

export default OrderDeliveredScreen;