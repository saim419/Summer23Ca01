import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CountChange from './CountChange';
import UsernameContext from './UsernameContext';
import LoginForm from './LoginForm';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View>
      <Button
        title="Go to Tim's profile"
        onPress={() => navigation.navigate('Profile', { name: 'Tim' })}
      />
      <Button
        title="Count Change"
        onPress={() => navigation.navigate('CountChange')}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const ProfileScreen = ({ navigation, route }) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};

const MyStack = () => {
  return (
    <UsernameContext.Provider value="tjhickey">
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Welcome' }}
          />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="CountChange" component={CountChange} />
          <Stack.Screen name="Login" component={LoginForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </UsernameContext.Provider>
  );
};

export default MyStack;

