import AsyncStorage from '@react-native-community/async-storage';
import React, { useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {Input, Image, Button} from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import getChef from '../api/getChef'
import {Feather} from '@expo/vector-icons';
import { navigate } from '../navigationRef';
import createOrder from '../api/createOrder';

const OrderCreatedScreen = ({navigation}) => {

    return (
        <View style={{justifyContent:'center',alignItems:'center',height:'100%'}}>
            <Feather name="check" size={150} style={{color:'#34A853'}} />
            <Text style={{fontSize:25,fontWeight:'bold'}}>Your order has been created!</Text>
            <View style={{marginTop:30}} />
            <Button title="&nbsp;&nbsp;See my orders&nbsp;&nbsp;" onPress={() => {
                navigate('History')
            }} />
        </View>
    )
};

const styles = StyleSheet.create({
});

export default OrderCreatedScreen;