import AsyncStorage from '@react-native-community/async-storage';
import React, { useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {Input, Image, Button} from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import getChef from '../api/getChef'
import {Feather} from '@expo/vector-icons';
import { navigate } from '../navigationRef';

const CartScreen = ({navigation}) => {
    const [cart, setCart] = useState([]);
    var mealEmail = navigation.getParam('email');
    var mealTitle = navigation.getParam('title');

    useState(async () => {
        var cartFromStorage = await AsyncStorage.getItem('cart');
        if (cartFromStorage == null || cartFromStorage.length == 0) {
            if (mealEmail != undefined) {
                AsyncStorage.setItem('cart', `{"email":"${mealEmail}","title":"${mealTitle}"}`);
                setCart([`{"email":"${mealEmail}","title":"${mealTitle}"}`])
            } else {
                setCart("no_item")
            }
        } else {
            var cartFromStorageList = cartFromStorage.split('mpseparator')
            if (mealEmail != undefined) {
                cartFromStorageList.push(`{"email":"${mealEmail}","title":"${mealTitle}"}`)
                AsyncStorage.setItem('cart', cartFromStorageList.join('mpseparator'))
                setCart(cartFromStorageList)
            } else {
                setCart(cartFromStorageList)
            }
        }
    })

    const checkoutCart = () => {
        
    }

    return (
        cart == "no_item" ? <View>
            <Text style={{fontSize:30,fontWeight:'bold',marginHorizontal:10}}>Come on, add something into your cart!</Text>
        </View> : <View style={{marginHorizontal:10}}>
            <FlatList data={cart} keyExtractor={item => item} renderItem={({item}) => {
                return (
                    <View style={{borderTopWidth:1,borderTopColor:'#c0c0c0',borderBottomWidth:1,borderBottomColor:'#c0c0c0',paddingVertical:20,flexDirection:'row',alignItems:'center'}}>
                        <Text style={{fontSize:20}}>{JSON.parse(item).title}</Text>
                        <TouchableOpacity style={{marginLeft:'auto'}} onPress={() => {
                            navigate('UpdateCart')
                            var cartArray = cart;
                            cartArray.pop(item);
                            AsyncStorage.setItem('cart', cartArray.join('mpseparator'))
                        }}>
                        <Feather name="trash-2" size={25} style={{color:'#EA4335'}} />
                        </TouchableOpacity>
                    </View>
                )
            }} />
            <View style={{marginTop:20}} />
            <Button title="Checkout" onPress={checkoutCart} />
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

export default CartScreen;