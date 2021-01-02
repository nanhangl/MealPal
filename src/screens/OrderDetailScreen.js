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
import {Feather} from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';

const OrderDetailScreen = ({navigation}) => {
const [meals, setMeals] = useState('');
var role = navigation.getParam('role')
var order = navigation.getParam('order')

useState(async () => {
    var mealsArray = JSON.parse(order).meals
    var mealObjArray = [];
    for (mealItem in mealsArray) {
        var mealObj = await getChef(mealsArray[mealItem])
        mealObjArray.push(JSON.stringify(mealObj[0]))
    }
    setMeals(mealObjArray)
})

    if (role == 'Customer') {
        if (JSON.parse(order).status == "Delivered") {
            return (
                <View style={{margin:10}}>
                    <Text style={{fontSize:18,fontWeight:'bold'}}>Order #{JSON.parse(order)._id}</Text>
                    <Text style={{fontSize:16,fontWeight:'bold',color:'#86939e',marginTop:10}}>Status</Text>
                    <Text>{JSON.parse(order).status}</Text>
                    <Text style={{fontSize:16,fontWeight:'bold',color:'#86939e',marginTop:10}}>Delivery Proof</Text>
                    <Image source={{uri: JSON.parse(order).deliveryPhoto}} style={{width:199,height:166}} />
                    <Text>{JSON.parse(order).deliveredTime}</Text>
                    <Text style={{fontSize:16,fontWeight:'bold',color:'#86939e',marginTop:10}}>Meal(s) Ordered ({JSON.parse(order).meals.length})</Text>
                    <FlatList data={meals} keyExtractor={item => item} renderItem={({item}) => {
                    return (
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                            <Image source={{uri: JSON.parse(item).image}} style={{width:100,height:67}} />
                            <Text style={{fontSize:16,fontWeight:'bold',marginLeft:10,width:250}}>{JSON.parse(item).title}</Text>
                        </View>
                    )
                }} />
                </View>
            )
        } else {
            return (
                <View style={{margin:10}}>
                    <Text style={{fontSize:18,fontWeight:'bold'}}>Order #{JSON.parse(order)._id}</Text>
                    <Text style={{fontSize:16,fontWeight:'bold',color:'#86939e',marginTop:10}}>Status</Text>
                    <Text>{JSON.parse(order).status}</Text>
                    <Text style={{fontSize:16,fontWeight:'bold',color:'#86939e',marginTop:10}}>Delivery Proof</Text>
                    <Text>Not Applicable - Meal(s) Not Delivered Yet</Text>
                    <Text style={{fontSize:16,fontWeight:'bold',color:'#86939e',marginTop:10}}>Meal(s) Ordered ({JSON.parse(order).meals.length})</Text>
                    <FlatList data={meals} keyExtractor={item => item} renderItem={({item}) => {
                    return (
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
                            <Image source={{uri: JSON.parse(item).image}} style={{width:100,height:67}} />
                            <Text style={{fontSize:16,fontWeight:'bold',marginLeft:10,width:250}}>{JSON.parse(item).title}</Text>
                        </View>
                    )
                }} />
                </View>
            )
        }
    } else if (role == "Chef") {
        return (
            <View style={{margin:10}}>
                <Text style={{fontSize:18,fontWeight:'bold'}}>Order #{order._id}</Text>
                <Text style={{fontSize:16,fontWeight:'bold',color:'#86939e',marginTop:10}}>Status</Text>
                <Text>{order.status}</Text>
                <Text style={{fontSize:16,fontWeight:'bold',color:'#86939e',marginTop:10}}>Delivery Date</Text>
                <Text>{order.deliveryDate != undefined ? order.deliveryDate.substring(0,10) : "Not Applicable"}</Text>
                <View style={{marginTop:20}} />
            </View>
        )
    } else {
        <View></View>
    }
    
};

OrderDetailScreen.navigationOptions = {
    title: 'Order Detail',
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigate('Home') }>
        <Feather name='arrow-left' size={25} style={{marginLeft:15}}/>
      </TouchableOpacity>
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

export default OrderDetailScreen;