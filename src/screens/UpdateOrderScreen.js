import React from 'react';
import {Text, StyleSheet } from 'react-native';
import { navigate } from '../navigationRef';

const UpdateOrderScreen = ({navigation}) => {
    navigate('OrderDetail', {role:navigation.getParam('role'),order:navigation.getParam('order')});
    return (
        <Text>Updating</Text>
    )
};

export default UpdateOrderScreen;