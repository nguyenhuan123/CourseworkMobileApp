import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Screen/Home';
import Result from './Screen/Result';
import Detail from './Screen/Detail';
import Search from './Screen/Search';
import Update from './Screen/Update';

const stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen 
        options={{
          title: "Home",
        }}
        name = "Home"
        component = {Home} />
        <stack.Screen
        options={{
          title: "Result",
        }}
        name = "Result"
        component={Result}
        />
        <stack.Screen
        options={{
          title: "Detail",
        }}
        name = "Detail"
        component={Detail}
        />
        <stack.Screen
        options={{
          title: "Search",
        }}
        name = "Search"
        component={Search}
        />
        <stack.Screen options={{
          title: "Update"
        }}
        name = "Update"
        component={Update} 
        />
      </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
