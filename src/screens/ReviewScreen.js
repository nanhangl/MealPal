import React, { useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {Input, Image, Button} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker';
import {FontAwesome5} from '@expo/vector-icons';
import MapView, {Circle} from 'react-native-maps';
import { navigate } from '../navigationRef';
import mealpalApi from '../api/mealpal';
import getChef from '../api/getChef'
import AsyncStorage from '@react-native-community/async-storage';
import {Feather} from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import getCust from '../api/getCust';
import updateOrderStatus from '../api/updateOrderStatus';
import { Rating, AirbnbRating } from 'react-native-ratings';
import submitReview from '../api/submitReview';
import getReviews from '../api/getReviews';

const ReviewScreen = ({navigation}) => {
    const [mealRating, setMealRating] = useState(0);
    const [comments, setComments] = useState('');
    const chefObj = navigation.getParam('chef');
    const [reviews, setReviews] = useState('')

    useState(async () => {
        const allReviews = await getReviews(chefObj.email);
        setReviews(allReviews);
    })

    return (
        <View>
            <Text style={{margin:10,fontSize:20,fontWeight:'bold'}}>{chefObj.title} Reviews</Text>
            <Text style={{fontSize:16,fontWeight:'bold',marginLeft:19,color:'#86939e'}}>Your Review</Text>
            <View style={{marginTop:15}}>
                <AirbnbRating
                showRating={false}
                starContainerStyle={{borderColor:'#f1c40f',borderWidth:2,padding:10}}
                defaultRating={mealRating}
                onFinishRating={(r) => {
                    setMealRating(r)
                }}
                />
                <View style={{marginTop:10,marginHorizontal:10}}>
                <Input label="Comments" value={comments} onChangeText={(c) => setComments(c)}/>
                <Button title="Submit Review" onPress={async () => {
                    if (mealRating > 0 && comments != "") {
                        await submitReview(chefObj.email, mealRating, comments)
                        navigate('SubmitReview', {chef:chefObj})
                    }
                }} />
                </View>
                </View>
            <Text style={{fontSize:16,fontWeight:'bold',marginLeft:19,marginVertical:20,color:'#86939e'}}>All Reviews</Text>
            <ScrollView>
                <FlatList data={reviews} keyExtractor={item => item} renderItem={({item}) => {
                    return (
                        <View style={{borderColor:'#d0d0d0',borderTopWidth:1,borderBottomWidth:1,paddingVertical:10}}>
                            <AirbnbRating defaultRating={item.rating} showRating={false} starContainerStyle={{marginLeft:-150}} />
                            <Text style={{marginHorizontal:19,marginVertical:10}}>{item.comments}</Text>
                        </View>
                    )
                }} />
            </ScrollView>
        </View>
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

export default ReviewScreen;