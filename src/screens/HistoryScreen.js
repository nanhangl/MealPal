import '../_mockLocation';
import React, { useContext, useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import Map from '../components/Map';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';
import {View} from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import getOrderHistory from '../api/getOrderHistory';
import AsyncStorage from '@react-native-community/async-storage';
import { navigate } from '../navigationRef';

const HistoryScreen = () => {
  const [role, setRole] = useState('');
  const [history, setHistory] = useState('');

  useState(async () => {
    AsyncStorage.getItem('role').then(async r => {
      setRole(r)
        var orderHistory = await getOrderHistory(r);
        var orderHistoryArray = []
        for (orderItem in orderHistory) {
          orderHistoryArray.push(JSON.stringify(orderHistory[orderItem]))
        }
        setHistory(orderHistoryArray);
    })
  })

  if (role == "Customer") {
    return (
      <View style={{marginTop:20,marginHorizontal:10}}>
        <FlatList data={history} keyExtractor={item => item} renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => {
              navigate('OrderDetail', {role:role, order:item})
            }}>
            <View style={{borderTopWidth:1,borderBottomWidth:1,borderTopColor:'#d0d0d0',borderBottomColor:'#d0d0d0',paddingVertical:20,flexDirection:'row',alignItems:'center'}}>
              <View>
                <Text style={{fontSize:18,fontWeight:'bold'}}>Order #{JSON.parse(item)._id}</Text>
                <Text style={{marginTop:10}}>{JSON.parse(item).meals.length} Meal(s)</Text>
                <Text style={{fontSize:18,marginTop:10}}>{JSON.parse(item).status}</Text>
              </View>
              <Feather name="chevron-right" size={30} style={{marginLeft:'auto'}} />
            </View>
            </TouchableOpacity>
          )
        }} />
      </View>
    );
  } else if (role == "Chef") {
    return (
      <View style={{marginTop:20,marginHorizontal:10}}>
        <FlatList data={history} keyExtractor={item => item} renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => {
              navigate('OrderDetail', {role:role, order:item})
            }}>
            <View style={{borderTopWidth:1,borderBottomWidth:1,borderTopColor:'#d0d0d0',borderBottomColor:'#d0d0d0',paddingVertical:20,flexDirection:'row',alignItems:'center'}}>
              <View>
                <Text style={{fontSize:18,fontWeight:'bold'}}>Order #{JSON.parse(item)._id}</Text>
                <Text style={{marginTop:10}}>{JSON.parse(item).meals.length} Meal(s)</Text>
                <Text style={{fontSize:18,marginTop:10}}>{JSON.parse(item).status}</Text>
              </View>
              <Feather name="chevron-right" size={30} style={{marginLeft:'auto'}} />
            </View>
            </TouchableOpacity>
          )
        }} />
      </View>
    );
  } else {
    return (
      <View style={{marginTop:20,marginHorizontal:10}}>
        <FlatList data={history} keyExtractor={item => item} renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => {
              navigate('OrderDetail', {role:role, order:JSON.parse(item)})
            }}>
            <View style={{borderTopWidth:1,borderBottomWidth:1,borderTopColor:'#d0d0d0',borderBottomColor:'#d0d0d0',paddingVertical:20,flexDirection:'row',alignItems:'center'}}>
              <View>
                <Text style={{fontSize:18,fontWeight:'bold'}}>Order #{JSON.parse(item)._id}</Text>
                <Text style={{marginTop:10}}>{JSON.parse(item).meals.length} Meal(s)</Text>
                <Text style={{fontSize:18,marginTop:10}}>{JSON.parse(item).status}</Text>
              </View>
              <Feather name="chevron-right" size={30} style={{marginLeft:'auto'}} />
            </View>
            </TouchableOpacity>
          )
        }} />
      </View>
    );
  } 
};

HistoryScreen.navigationOptions = {
  title: 'History',
  tabBarIcon: <FontAwesome name="history" size={20} />
};

const styles = StyleSheet.create({});

export default withNavigationFocus(HistoryScreen);
