import React, { useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {Input, Image, Button} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker';
import {FontAwesome5} from '@expo/vector-icons';
import { navigate } from '../navigationRef';
import mealpalApi from '../api/mealpal';
import getChef from '../api/getChef'
import AsyncStorage from '@react-native-community/async-storage';

const MealDetailScreen = ({navigation}) => {
    const [mealObj, setMealObj] = useState({});
    const [image, setImage] = useState({uri:'https://firebasestorage.googleapis.com/v0/b/mealpal-b97b8.appspot.com/o/meal_default_image.png?alt=media&token=c73cc96f-cfc0-4f68-a769-8aa187fe73aa'});
    const mealEmail = navigation.getParam('email');

    useState(async () => {
        var chefObj = await getChef(mealEmail);
        setMealObj({
          mealType: chefObj[0].mealType,
          image: chefObj[0].image,
          title: chefObj[0].title,
          description: chefObj[0].description,
          ingredients: chefObj[0].ingredients,
          calories: chefObj[0].calories,
          carbs: chefObj[0].carbs,
          fats: chefObj[0].fats,
          protein: chefObj[0].protein
        })
        setImage({uri:chefObj[0].image})
    })

    return (
                <ScrollView>
                    <View style={styles.image}>
                    <Image
                        style={{width:350, height: 300}}
                        source={{uri: image.uri}}
                    />
                    </View>
                    <Text style={{fontSize:16,fontWeight:'bold',marginLeft:9,color:'#86939e'}}>Meal Type</Text>
                    <Text style={{marginLeft:10,marginBottom:5}}>{mealObj.mealType}</Text>
                    <Text style={{fontSize:16,fontWeight:'bold',marginLeft:9,color:'#86939e'}}>Title</Text>
                    <Text  style={{marginLeft:10,marginBottom:5}}>{mealObj.title}</Text>
                    <Text style={{fontSize:16,fontWeight:'bold',marginLeft:9,color:'#86939e'}}>Description</Text>
                    <Text  style={{marginLeft:10,marginBottom:5}}>{mealObj.description}</Text>
                    <Text style={{fontSize:16,fontWeight:'bold',marginLeft:9,color:'#86939e'}}>Ingredients</Text>
                    <Text  style={{marginLeft:10,marginBottom:5}}>{mealObj.ingredients}</Text>
                    <Text style={{fontSize:16,fontWeight:'bold',marginLeft:9,color:'#86939e',marginBottom:10}}>Nutrition</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginRight:10,marginBottom:30}}>
                            <View style={{alignItems:'center'}}>
                                <Text style={{fontSize:16,fontWeight:'bold',marginLeft:9,color:'#86939e'}}>Carbs</Text>
                                <Text>{mealObj.carbs}g</Text>
                            </View>
                            <View style={{alignItems:'center'}}>
                                <Text style={{fontSize:16,fontWeight:'bold',marginLeft:9,color:'#86939e'}}>Fats</Text>
                                <Text>{mealObj.fats}g</Text>
                            </View>
                            <View style={{alignItems:'center'}}>
                                <Text style={{fontSize:16,fontWeight:'bold',marginLeft:9,color:'#86939e'}}>Protein</Text>
                                <Text>{mealObj.protein}g</Text>
                            </View>
                        </View>
                    <View style={{marginHorizontal:10,flexDirection:'row',justifyContent:'space-between'}}>
                    <Button title="&nbsp;&nbsp;See Reviews&nbsp;&nbsp;" />
                    <Button title="&nbsp;&nbsp;Add to Cart&nbsp;&nbsp;" onPress={() => {
                            navigate('Cart', {email:mealEmail})
                    }} />
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

export default MealDetailScreen;