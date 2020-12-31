import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {Input, Image, Button} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker';
import {FontAwesome5} from '@expo/vector-icons';

const AddMealScreen = ({errorMessage, onSubmit}) => {
    const [image, setImage] = useState('https://firebasestorage.googleapis.com/v0/b/mealpal-b97b8.appspot.com/o/meal_default_image.png?alt=media&token=c73cc96f-cfc0-4f68-a769-8aa187fe73aa');
    const [mealType, setMealType] = useState("Keto");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [calories, setCalories] = useState("");
    const [carbs, setCarbs] = useState("");
    const [fats, setFats] = useState("");
    const [protein, setProtein] = useState("");

    const openCamera = async () => {
        ImagePicker.requestCameraPermissionsAsync()
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

    return (
                <ScrollView>
                    <View style={styles.image}>
                    <Image
                        style={{width:350, height: 300}}
                        source={{uri: image}}
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
                    <View style={{marginHorizontal:10}}>
                    <Button title="Add" onPress={() => onSubmit({ image, mealType, title, description, ingredients, calories, carbs, fats, protein })} />
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
    }
});

export default AddMealScreen;