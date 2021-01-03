import React from 'react';
import {Text, StyleSheet } from 'react-native';
import { navigate } from '../navigationRef';

const SubmitReviewScreen = ({navigation}) => {
    navigate('Review', {chef:navigation.getParam('chef')});
    return (
        <Text>Updating</Text>
    )
};

export default SubmitReviewScreen;