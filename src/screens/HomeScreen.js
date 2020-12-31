import React, { useContext, useState } from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity, View } from 'react-native';
import NavigateButton from '../components/NavigateButton';
import { NavigationEvents } from 'react-navigation';
import getChef from '../api/getChef'
import { ListItem } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

const HomeScreen = ({ navigation }) => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [chefMeal, setChefMeal] = useState({});

  useState(() => {
    AsyncStorage.getItem('role').then(r => {
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
    })
  })

  if (role == "Customer") {
    return (
      <Text>yay Cust</Text>
    )
  } else if (role == "Chef") {
    if (chefMeal.mealType) {
      return (
        <Text>yay Chef</Text>
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
      <Text></Text>
    )
  }
};

HomeScreen.navigationOptions = {
  title: 'MealPal'
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
  }
});

export default HomeScreen;
