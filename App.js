import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import WelcomeScreen from './src/screens/Welcome'
import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import HomeScreen from './src/screens/HomeScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from './src/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import { Provider as LocationProvider } from './src/context/LocationContext';
import { Provider as TrackProvider } from './src/context/TrackContext';
import { FontAwesome } from '@expo/vector-icons';
import AddMealScreen from './src/screens/AddMealScreen';
import MealDetailScreen from './src/screens/MealDetailScreen';
import OrderDetailScreen from './src/screens/OrderDetailScreen';
import UpdateCartScreen from './src/screens/UpdateCartScreen';
import CartScreen from './src/screens/CartScreen';
import OrderCreatedScreen from './src/screens/OrderCreated';
import UpdateOrderScreen from './src/screens/UpdateOrderScreen';
import OrderDeliveredScreen from './src/screens/OrderDelivered';

const homeFlow = createStackNavigator({
  Home: HomeScreen,
  TrackDetail: TrackDetailScreen,
});

homeFlow.navigationOptions = {
  title: 'Home',
  tabBarIcon: <FontAwesome name="home" size={20} />,
};

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Welcome: WelcomeScreen,
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  mainFlow: createBottomTabNavigator({
    homeFlow,
    History: HistoryScreen,
    Account: AccountScreen,
  }),
  chefFlow: createStackNavigator({
    AddMeal: AddMealScreen,
  }),
  custFlow: createStackNavigator({
    MealDetail: MealDetailScreen
  }),
  cartFlow: createStackNavigator({
    Cart: CartScreen
  }),
  updateThingsFlow: createStackNavigator({
    UpdateCart: UpdateCartScreen,
    UpdateOrder: UpdateOrderScreen

  }),
  orderCreatedFlow: createStackNavigator({
    OrderCreated: OrderCreatedScreen
  }),
  orderDetailFlow: createStackNavigator({
    OrderDetail: OrderDetailScreen,
    OrderDelivered: OrderDeliveredScreen
  })
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App
            ref={(navigator) => {
              setNavigator(navigator);
            }}
          />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};
