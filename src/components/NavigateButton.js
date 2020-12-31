import React, { useEffect } from 'react';
import { Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import Spacer from './Spacer';

const ActionButton = ({ navigation, text, role, routeName }) => {

    return (
        <Button title={text} onPress={() => {
            navigation.navigate(routeName, {role: role})
        }}>
        </Button>
    )
};

export default withNavigation(ActionButton);