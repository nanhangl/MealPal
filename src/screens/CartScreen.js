import AsyncStorage from '@react-native-community/async-storage';
import React, { useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {Input, Image, Button} from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import getChef from '../api/getChef'

const CartScreen = ({navigation}) => {
    const [cart, setCart] = useState('');
    var mealEmail = navigation.getParam('email');

    useState(async () => {
        setCart(["d", "e"])
    })

    return (
        cart == "no_item" ? <View>
            <Text style={{fontSize:30,fontWeight:'bold',marginHorizontal:10}}>Come on, add something into your cart!</Text>
        </View> : <View>
            <FlatList data={cart} keyExtractor={item => item} renderItem={({item}) => {
                return (
                    <View>
                        <Text>{item}</Text>
                    </View>
                )
            }} />
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