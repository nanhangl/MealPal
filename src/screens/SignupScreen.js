import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);
  const header = `${navigation.getParam('role')} Sign Up`
  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm
        role={navigation.getParam('role')}
        headerText={header}
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signup}
      />
      <NavLink
        routeName="Signin"
        text="Already have an account? Sign in instead!"
        role={navigation.getParam('role')}
      />
      <NavLink
        routeName="Welcome"
        text="Choose another role"
      />
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
});

export default SignupScreen;
