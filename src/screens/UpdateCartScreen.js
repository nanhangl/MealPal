import React from 'react';
import {Text, StyleSheet } from 'react-native';
import { navigate } from '../navigationRef';

const UpdateCartScreen = ({navigation}) => {
    navigate('Cart');
    return (
        <Text>Updating</Text>
    )
};

export default UpdateCartScreen;