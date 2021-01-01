import React, { useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {Input, Image, Button} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker';
import {FontAwesome5} from '@expo/vector-icons';
import { navigate } from '../navigationRef';
import mealpalApi from '../api/mealpal';

const AddMealScreen = ({navigation}) => {
    const [image, setImage] = useState({uri:'https://firebasestorage.googleapis.com/v0/b/mealpal-b97b8.appspot.com/o/meal_default_image.png?alt=media&token=c73cc96f-cfc0-4f68-a769-8aa187fe73aa'});
    const [mealType, setMealType] = useState("Keto");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [calories, setCalories] = useState("");
    const [carbs, setCarbs] = useState("");
    const [fats, setFats] = useState("");
    const [protein, setProtein] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const openCamera = async () => {
        ImagePicker.requestCameraPermissionsAsync()
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.1,
          base64: true
        });
    
        if (!result.cancelled) {
            setImage(result);
        }
      };

      const submitForm = () => {
        var errMsg = []
        if (image.uri == "" || image.uri == 'https://firebasestorage.googleapis.com/v0/b/mealpal-b97b8.appspot.com/o/meal_default_image.png?alt=media&token=c73cc96f-cfc0-4f68-a769-8aa187fe73aa') {
            errMsg.push("No Image")
        }
        if (mealType == "") {
            errMsg.push("No MealType")
        }
        if (title == "") {
            errMsg.push("No Title")
        }
        if (description == "") {
            errMsg.push("No Description")
        }
        if (ingredients == "") {
            errMsg.push("No Ingredients")
        }
        if (calories == "") {
            errMsg.push("No Calories")
        }
        if (carbs == "") {
            errMsg.push("No Carbs")
        }
        if (fats == "") {
            errMsg.push("No Fats")
        }
        if (protein == "") {
            errMsg.push("No Protein")
        }
        if (errMsg.length > 0) {
            setErrorMessage(errMsg.join(", "))
        } else {
            var downloadUrl = "data:image/jpg;base64," + image.base64
                mealpalApi.post('/updateChefMeal', { downloadUrl, mealType, title, description, ingredients, calories, carbs, fats, protein }).then(() => {
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
                    <Text style={{fontWeight:'bold',marginLeft:10,marginTop:2,color:'#0b68bf'}}>Take Photo of Meal</Text>
                    </TouchableOpacity>
                    </View>
                    <Text style={{fontSize:16,fontWeight:'bold',marginLeft:9,color:'#86939e'}}>Meal Type</Text>
                    <Picker
                    selectedValue={mealType}
                    style={{marginLeft:1}}
                    onValueChange={(value) => setMealType(value)}>
                    <Picker.Item label="Keto" value="Keto" />
                    <Picker.Item label="Low Carbs" value="Low Carbs" />
                    <Picker.Item label="Low Calories" value="Low Calories" />
                    <Picker.Item label="High Protein" value="High Protein" />
                    </Picker>
                    <Input
                        label="Title"
                        value={title}
                        onChangeText={setTitle}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <Input
                        label="Description"
                        value={description}
                        onChangeText={setDescription}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <Input
                        label="Ingredients"
                        value={ingredients}
                        onChangeText={setIngredients}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <Input
                        label="Calories (kcal)"
                        value={calories}
                        onChangeText={setCalories}
                        keyboardType='decimal-pad'
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <Input
                        label="Carbs (g)"
                        value={carbs}
                        onChangeText={setCarbs}
                        keyboardType='decimal-pad'
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <Input
                        label="Fats (g)"
                        value={fats}
                        onChangeText={setFats}
                        keyboardType='decimal-pad'
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <Input
                        label="Protein (g)"
                        value={protein}
                        onChangeText={setProtein}
                        keyboardType='decimal-pad'
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    {errorMessage != "" ? <Text style={styles.errorMessage}>Error: {errorMessage}</Text> : <></>}
                    <View style={{marginHorizontal:10}}>
                    <Button title="Add" onPress={submitForm} />
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

export default AddMealScreen;