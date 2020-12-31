import React, { useContext } from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { ListItem } from 'react-native-elements';
import { Context as TrackContext } from '../context/TrackContext';
import { Feather } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext);

  return (
    <>
      <NavigationEvents onWillFocus={fetchTracks} />
      <FlatList
        data={state}
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('TrackDetail', { _id: item._id })
              }
            >
              <ListItem>
              <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
                <Feather name="chevron-right" size={24} />
              </ListItem>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

HomeScreen.navigationOptions = {
  title: 'MealPal'
};

const styles = StyleSheet.create({});

export default HomeScreen;
