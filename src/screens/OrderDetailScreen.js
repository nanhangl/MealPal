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
import getCust from '../api/getCust';
import updateOrderStatus from '../api/updateOrderStatus';

const OrderDetailScreen = ({navigation}) => {
const [meals, setMeals] = useState('');
const [customer, setCustomer] = useState({}); 
const [chefObj, setChefObj] = useState('');
var role = navigation.getParam('role')
var order = JSON.stringify(navigation.getParam('order'))

useState(async () => {
    try {
    var mealsArray = JSON.parse(order).meals
    var mealObjArray = [];
    for (mealItem in mealsArray) {
        var mealObj = await getChef(mealsArray[mealItem])
        mealObjArray.push(JSON.stringify(mealObj[0]))
    }
    setMeals(mealObjArray)
    } catch {}
    try {
    var custArr = await getCust(JSON.parse(order).customerEmail)
    if (custArr.length > 0) {
        setCustomer(custArr[0])
    }
    } catch {}
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
                <Text style={{fontSize:18,fontWeight:'bold'}}>Order #{JSON.parse(order)._id}</Text>
                <Text style={{fontSize:16,fontWeight:'bold',color:'#86939e',marginTop:10}}>Status</Text>
                <Text>{JSON.parse(order).status}</Text>
                <Text style={{fontSize:16,fontWeight:'bold',color:'#86939e',marginTop:10}}>Delivery Date</Text>
                <Text>{JSON.parse(order).deliveryDate != undefined ? JSON.parse(order).deliveryDate.substring(0,10) : "Not Applicable"}</Text>
            </View>
        )
    } else {
        if (JSON.parse(order).status == 'Delivered') {
            return (
                <View style={{margin:10}}>
                        <Text style={{fontSize:18,fontWeight:'bold'}}>Order #{JSON.parse(order)._id}</Text>
                        <Text style={{fontSize:16,fontWeight:'bold',color:'#86939e',marginTop:10}}>Status</Text>
                        <Text>{JSON.parse(order).status}</Text>
                        <Text style={{fontSize:16,fontWeight:'bold',color:'#86939e',marginTop:10}}>Delivery Date</Text>
                        <Text>{JSON.parse(order).deliveryDate != undefined ? JSON.parse(order).deliveryDate.substring(0,10) : "Not Applicable"}</Text>
                        <Text style={{fontSize:20,fontWeight:'bold',color:'#86939e',marginBottom:10,marginTop:30}}>Collect From</Text>
                        <FlatList data={meals} keyExtractor={item => item} renderItem={({item}) => {
                            return (
                                <View style={{flexDirection:'row',alignItems:'center',borderTopWidth:1,borderBottomWidth:1,borderColor:'#d0d0d0',paddingVertical:10}}>
                                    <View style={{width:250}}>
                                    <Text>{JSON.parse(item).title}</Text>
                                    <Text>Tel: {JSON.parse(item).phone}</Text>
                                    <Text style={{fontSize:20}}>{JSON.parse(item).address}</Text>
                                    </View>
                                </View>
                            )
                        }} />
                        <Text style={{fontSize:20,fontWeight:'bold',color:'#86939e',marginTop:30,marginBottom:10}}>Deliver To</Text>
                        <View style={{borderTopWidth:1,borderBottomWidth:1,borderColor:'#d0d0d0',paddingVertical:10}}>
                        <Text>Tel: {customer.phone}</Text>
                        <Text style={{fontSize:20}}>{customer.address}</Text>
                        </View>
                        <View style={{marginTop:50}}>
                        </View>
                </View>
            )
        }
        return (
            <View style={{margin:10}}>
                    <Text style={{fontSize:18,fontWeight:'bold'}}>Order #{JSON.parse(order)._id}</Text>
                    <Text style={{fontSize:16,fontWeight:'bold',color:'#86939e',marginTop:10}}>Status</Text>
                    <Text>{JSON.parse(order).status}</Text>
                    <Text style={{fontSize:16,fontWeight:'bold',color:'#86939e',marginTop:10}}>Delivery Date</Text>
                    <Text>{JSON.parse(order).deliveryDate != undefined ? JSON.parse(order).deliveryDate.substring(0,10) : "Not Applicable"}</Text>
                    <Text style={{fontSize:20,fontWeight:'bold',color:'#86939e',marginBottom:10,marginTop:30}}>Collect From</Text>
                    <FlatList data={meals} keyExtractor={item => item} renderItem={({item}) => {
                        return (
                            <View style={{flexDirection:'row',alignItems:'center',borderTopWidth:1,borderBottomWidth:1,borderColor:'#d0d0d0',paddingVertical:10}}>
                                <View style={{width:250}}>
                                <Text>{JSON.parse(item).title}</Text>
                                <Text>Tel: {JSON.parse(item).phone}</Text>
                                <Text style={{fontSize:20}}>{JSON.parse(item).address}</Text>
                                </View>
                            </View>
                        )
                    }} />
                    <Text style={{fontSize:20,fontWeight:'bold',color:'#86939e',marginTop:30,marginBottom:10}}>Deliver To</Text>
                    <View style={{borderTopWidth:1,borderBottomWidth:1,borderColor:'#d0d0d0',paddingVertical:10}}>
                    <Text>Tel: {customer.phone}</Text>
                    <Text style={{fontSize:20}}>{customer.address}</Text>
                    </View>
                    <View style={{marginTop:50}}>
                    {JSON.parse(order).status == "Preparing" ? <Button title="All Meals Collected" onPress={async () => {
                        await updateOrderStatus(JSON.parse(order)._id, "Delivering")
                        var updatedOrder = JSON.parse(order)
                        updatedOrder.status = "Delivering"
                        navigate('UpdateOrder', {role:role, order:updatedOrder})
                    }} /> : <Button title="Meal Delivered" onPress={() => {
                        navigate('OrderDelivered', {order:JSON.parse(order), customer:customer})
                    }} /> }
                    </View>
            </View>
        )
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