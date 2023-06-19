import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const WhiteTigerLogo = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/whitetiger0810a.png')} // Replace with the actual path to your white tiger logo image
                style={styles.logo}
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '50%',
        right: '30%',
        transform: [{ translateX: 90, translateY: -90 }],
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
});

export default WhiteTigerLogo;


