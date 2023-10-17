import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import WelcomeScreen from '../Screens/WelcomeScreen';
import FilterScreen from '../Screens/FilterScreen';
import SortProductScreen from '../Screens/SortProductScreen';
import ProductDisplay from '../Screens/ProductDisplay';

const AppNavigator = () => {
  const STACK = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <STACK.Navigator>
        <STACK.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <STACK.Screen name="FilterScreen" component={FilterScreen} />
        <STACK.Screen name="SortProduct" component={SortProductScreen} />
        <STACK.Screen
          name="ProductDisplay"
          component={ProductDisplay}
          options={{headerShown: false}}
        />
      </STACK.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
