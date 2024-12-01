import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AppBar = ({ title, onBack }) => {
    return (
        <View style={styles.container}>
            {onBack && (
                <TouchableOpacity onPress={onBack}>
                    <Text style={styles.backArrow}>{'←'}</Text>
                </TouchableOpacity>
            )}
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: '#6200EE',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        marginLeft: onBack ? 10 : 0,
    },
    backArrow: {
        color: '#fff',
        fontSize: 24,
    },
});

export default AppBar;
