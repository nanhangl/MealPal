import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import Spacer from './Spacer';

const AuthForm = ({ role, headerText, errorMessage, onSubmit, submitButtonText }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [postal, setPostal] = useState('');

  if (role == "Delivery Driver") {
    onSubmit(role, email, phone, line1, line2, postal);
  }

  return (
    <>
      <Spacer>
        <Text h3>{headerText}</Text>
      </Spacer>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        label="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType='phone-pad'
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        label="Address Line 1"
        value={line1}
        onChangeText={setLine1}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        label="Address Line 2"
        value={line2}
        onChangeText={setLine2}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        label="Postal Code"
        value={postal}
        onChangeText={setPostal}
        keyboardType='number-pad'
        autoCapitalize="none"
        autoCorrect={false}
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          title={submitButtonText}
          onPress={() => onSubmit({ role, email, phone, line1, line2, postal })}
        />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15
  }
});

export default AuthForm;
