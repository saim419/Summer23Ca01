import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, FlatList, Picker } from 'react-native';
import axios from 'axios';
import WhiteTigerLogo from '../components/WhiteTigerLogo';

const LoginForm = () => {
    const [countries, setCountries] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthCountry, setBirthCountry] = useState('');
    const [permanentAddress, setPermanentAddress] = useState('');
    const [favoriteColor, setFavoriteColor] = useState('');

    useEffect(() => {
        // Fetch the list of countries from an API
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => {
                // Extract the country names from the API response
                const fetchedCountries = response.data.map(country => country.name.common);
                setCountries(fetchedCountries);
            })
            .catch(error => {
                console.error('Failed to fetch countries:', error);
            });
    }, []);

    const handleUserSelection = (user) => {
        setSelectedUser(user);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setBirthCountry(user.birthCountry);
        setPermanentAddress(user.permanentAddress);
        setFavoriteColor(user.favoriteColor);
    };

    const handleLogin = () => {
        // Create a new user object
        const newUser = {
            firstName,
            lastName,
            birthCountry,
            permanentAddress,
            favoriteColor,
        };

        // Add the new user to the list of users
        setUsers(prevUsers => [...prevUsers, newUser]);

        // Reset the input fields
        setFirstName('');
        setLastName('');
        setBirthCountry('');
        setPermanentAddress('');
        setFavoriteColor('');
    };

    useEffect(() => {
        // Log the list of users whenever it changes
        console.log('Users:', users);
    }, [users]);

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <View style={{ position: 'absolute', top: 0, right: 0 }}>
                <WhiteTigerLogo />
            </View>
            <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 16 }}>
                Login Page
            </Text>
            <TextInput
                style={{ marginBottom: 8 }}
                placeholder="First Name"
                onChangeText={text => setFirstName(text)}
                value={firstName}
            />
            <TextInput
                style={{ marginBottom: 8 }}
                placeholder="Last Name"
                onChangeText={text => setLastName(text)}
                value={lastName}
            />
            <Text style={{ marginBottom: 8 }}>Birth Country:</Text>
            <Picker
                style={{ marginBottom: 8 }}
                selectedValue={birthCountry}
                onValueChange={itemValue => setBirthCountry(itemValue)}
            >
                {countries.map(country => (
                    <Picker.Item key={country} label={country} value={country} />
                ))}
            </Picker>
            <TextInput
                style={{ marginBottom: 8 }}
                placeholder="Permanent Address"
                onChangeText={text => setPermanentAddress(text)}
                value={permanentAddress}
            />
            <TextInput
                style={{ marginBottom: 8 }}
                placeholder="Favorite Color"
                onChangeText={text => setFavoriteColor(text)}
                value={favoriteColor}
            />
            <Button onPress={handleLogin} title="Login" />

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>
                Signed-in Users:
            </Text>
            <FlatList
                data={users}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Text
                        style={{ fontSize: 16, marginVertical: 8 }}
                        onPress={() => handleUserSelection(item)}
                    >
                        {item.firstName} {item.lastName}
                    </Text>
                )}
            />
            {selectedUser && (
                <View>
                    <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold', marginTop: 16 }}>
                        Selected User:
                    </Text>
                    <Text style={{ fontSize: 16, marginVertical: 8 }}>
                        First Name: {selectedUser.firstName}
                    </Text>
                    <Text style={{ fontSize: 16, marginVertical: 8 }}>
                        Last Name: {selectedUser.lastName}
                    </Text>
                    <Text style={{ fontSize: 16, marginVertical: 8 }}>
                        Birth Country: {selectedUser.birthCountry}
                    </Text>
                    <Text style={{ fontSize: 16, marginVertical: 8 }}>
                        Permanent Address: {selectedUser.permanentAddress}
                    </Text>
                    <Text style={{ fontSize: 16, marginVertical: 8 }}>
                        Favorite Color: {selectedUser.favoriteColor}
                    </Text>
                </View>
            )}
        </View>
    );
};

export default LoginForm;

