import React, { useEffect } from 'react';
import {Text, View, StyleSheet } from 'react-native';
import NavigateButton from '../components/NavigateButton';
import Spacer from '../components/Spacer';

const Welcome = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to MealPal</Text>
            <Text style={styles.subtitle}>Get started with our healthy, delicious, home-cooked meals!</Text>
            <View style={styles.buttonGrp}>
            <Text style={styles.question}>What would you like to do:</Text>
                <NavigateButton text="I want to order meals" role="Customer" routeName="Signup" />
                <View style={{marginTop:10}}></View>
                <NavigateButton text="I want to prepare and sell meals" role="Chef" routeName="Signup" />
                <View style={{marginTop:10}}></View>
                <NavigateButton text="I want to deliver meals" role="Delivery Driver" routeName="Signup" />
                <View style={{marginTop:10}}></View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    title: {
        fontSize: 45,
        fontWeight: "bold",
        padding: 10
    },
    subtitle: {
        fontSize: 20,
        padding: 10
    },
    buttonGrp: {
        padding: 10,
        width: '100%',
        position: 'absolute',
        bottom: 0
    },
    question: {
        fontSize: 20,
        marginBottom: 20
    }
});

export default Welcome;