import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import SignInForm from '../components/SignInForm';
import NavLink from '../components/NavLink';
import { Context } from '../context/AuthContext';

const SigninScreen = ({navigation}) => {
  const { state, signin, clearErrorMessage } = useContext(Context);
  const header = `${navigation.getParam('role')} Sign In`
  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <SignInForm
        role={navigation.getParam('role')}
        headerText={header}
        errorMessage={state.errorMessage}
        onSubmit={signin}
        submitButtonText="Sign In"
      />
      <NavLink
        text="Dont have an account? Sign up instead"
        routeName="Signup"
        role={navigation.getParam('role')}
      />
    </View>
  );
};

SigninScreen.navigationOptions = {
  header: () => false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250,
  },
});

export default SigninScreen;
