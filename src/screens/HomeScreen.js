import React, { useContext, useState } from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import NavigateButton from '../components/NavigateButton';
import { NavigationEvents } from 'react-navigation';
import getChef from '../api/getChef'
import { ListItem } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import getChefOrders from '../api/getChefOrders';
import getAllChef from '../api/getAllChef';
import { navigate } from '../navigationRef';
import { LogBox } from 'react-native';
import getOrdersToDeliver from '../api/getOrdersToDeliver';
LogBox.ignoreAllLogs(true);
var globalRole;

const HomeScreen = ({ route, navigation }) => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [chefMeal, setChefMeal] = useState({});
  const [chefOrders, setChefOrders] = useState('');
  const [allChef, setAllChef] = useState('');
  const [ordersToDeliver, setOrdersToDeliver] = useState('');

  const orderItem = ({ item }) => (
    item._id == "no_orders" ? <Text style={{marginLeft:10,fontSize:20}}>No Orders</Text> : <TouchableOpacity onPress={() => {navigate('OrderDetail', {role:"Chef", order:item})}}>
      <View style={styles.orderItem}>
        <View>
        <Text style={styles.orderItemEmail}>Order #{item._id}</Text>
        <Text>Prepare by {item.deliveryDate.substring(0,10)}</Text>
        </View>
        <Feather name="chevron-right" size={30} style={{marginLeft:'auto'}} />
      </View>
    </TouchableOpacity>
  );

  useState(async () => {
    AsyncStorage.getItem('role').then(r => {
      globalRole = r
      setRole(r)
    })
    AsyncStorage.getItem('email').then(async e => {
      setEmail(e)
        var chefObj = await getChef(e);
        setChefMeal({
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
        var callGetChefOrders = await getChefOrders(e);
        setChefOrders(callGetChefOrders);
        if (callGetChefOrders.length == 0) {
          setChefOrders([{_id:'no_orders', title: "No Orders"}])
        }
    })
    var callGetAllChef = await getAllChef();
    setAllChef(callGetAllChef);
    var ordersToDeliverArray = await getOrdersToDeliver();
    setOrdersToDeliver(ordersToDeliverArray);
  })
  if (role == "Customer") {
    return (
      <ScrollView>
        <View style={{marginTop:10}}></View>
        <Text style={{marginLeft:10,fontWeight:'bold',fontSize:18}}>Keto</Text>
        <ScrollView>
        <FlatList horizontal data={allChef[0]} keyExtractor={item => item._id} renderItem={({item}) => {
            return(
              <TouchableOpacity onPress={() => navigation.navigate('MealDetail', {email:item.email}) }>
              <View style={{marginHorizontal:10,marginVertical:10}}>
              <Image source={{uri: item.image}} style={{width:199,height:166}} />
              <Text style={{width: 195,marginTop:10,fontWeight:'bold'}}>{item.title}</Text>
              </View>
              </TouchableOpacity>
            );
          }}/>
          </ScrollView>
        <Text style={{marginLeft:10,fontWeight:'bold',fontSize:18}}>Low Carbs</Text>
        <ScrollView>
        <FlatList horizontal data={allChef[1]} keyExtractor={item => item._id} renderItem={({item}) => {
            return(
              <TouchableOpacity onPress={() => navigation.navigate('MealDetail', {email:item.email}) }>
              <View style={{marginHorizontal:10,marginVertical:10}}>
              <Image source={{uri: item.image}} style={{width:199,height:166}} />
              <Text style={{width: 195,marginTop:10,fontWeight:'bold'}}>{item.title}</Text>
              </View>
              </TouchableOpacity>
            );
          }}/>
          </ScrollView>
        <Text style={{marginLeft:10,fontWeight:'bold',fontSize:18}}>Low Calories</Text>
        <ScrollView>
        <FlatList horizontal data={allChef[2]} keyExtractor={item => item._id} renderItem={({item}) => {
            return(
              <TouchableOpacity onPress={() => navigation.navigate('MealDetail', {email:item.email}) }>
              <View style={{marginHorizontal:10,marginVertical:10}}>
              <Image source={{uri: item.image}} style={{width:199,height:166}} />
              <Text style={{width: 195,marginTop:10,fontWeight:'bold'}}>{item.title}</Text>
              </View>
              </TouchableOpacity>);
          }}/>
        </ScrollView>
        <Text style={{marginLeft:10,fontWeight:'bold',fontSize:18}}>High Protein</Text>
        <ScrollView>
        <FlatList horizontal data={allChef[3]} keyExtractor={item => item._id} renderItem={({item}) => {
            return(
              <TouchableOpacity onPress={() => navigation.navigate('MealDetail', {email:item.email}) }>
              <View style={{marginHorizontal:10,marginVertical:10}}>
              <Image source={{uri: item.image}} style={{width:199,height:166}} />
              <Text style={{width: 195,marginTop:10,fontWeight:'bold'}}>{item.title}</Text>
              </View>
              </TouchableOpacity>);
          }}/>
        </ScrollView>
      </ScrollView>
    )
  } else if (role == "Chef") {
    if (chefMeal.mealType) {
      return (
        <View>
          <Text style={{fontSize:16,fontWeight:'bold',marginLeft:9,color:'#86939e',marginVertical:10}}>Your Meal</Text>
          <View style={styles.chefMeal}>
            <Image source={{uri: chefMeal.image}} style={{width: 100, height: 75}} />
            <Text style={{marginLeft:20,fontSize:16,fontWeight:'bold',width:250}}>{chefMeal.title}</Text>
          </View>
          <Text style={{fontSize:16,fontWeight:'bold',marginLeft:9,color:'#86939e',marginBottom:10}}>Orders</Text>
          <FlatList
          data={chefOrders}
          keyExtractor={item => item._id}
          renderItem={orderItem} />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.noMealHeader}>Share your best dish with the community!</Text>
          <Text style={styles.noMealSubheader}>Start selling healthy meals and earn some extra income!</Text>
          <View style={styles.spacing} />
          <NavigateButton text="+&nbsp;&nbsp;Add a Meal" routeName="AddMeal"/>
        </View>
      )
    }
  } else {
    return (
      <View>
        <Text style={{fontSize:16,fontWeight:'bold',marginLeft:9,color:'#86939e',marginVertical:10}}>Orders To Deliver</Text>
        {ordersToDeliver.length > 0 ?
        <FlatList data={ordersToDeliver} keyExtractor={item => JSON.stringify(item)} renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => {navigate('OrderDetail', {role:"Delivery Driver", order:item})}}>
            <View style={styles.orderItem}>
            <View>
            <Text style={styles.orderItemEmail}>Order #{item._id}</Text>
            <Text>Deliver {item.meals.length} Meal(s) on {item.deliveryDate.substring(0,10)}</Text>
            </View>
            <Feather name="chevron-right" size={30} style={{marginLeft:'auto'}} />
            </View>
            </TouchableOpacity>
          )
        }} />
        : <Text style={{marginLeft:10,fontSize:20}}>No Orders</Text>}
      </View>
    )
  }
};

  HomeScreen.navigationOptions = {
    title: 'MealPal',
    headerRight: () => (
      <TouchableOpacity onPress={() => navigate('Cart') }>
        <Feather name='shopping-cart' size={25} style={{marginRight:15}}/>
      </TouchableOpacity>
    )
  };

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginTop: 5
  },
  noMealHeader: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  noMealSubheader: {
    marginTop: 20,
    fontSize: 25
  },
  spacing: {
    marginTop: 30
  },
  chefMeal: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 20,
    alignItems: 'center'
  },
  orderItem: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: '#c0c0c0',
    borderTopWidth: 1,
    borderBottomColor: '#c0c0c0',
    borderBottomWidth: 1,
    height: 70
  },
  orderItemEmail: {
    fontSize: 20
  }
});

export default HomeScreen;
