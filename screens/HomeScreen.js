import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AppBar from '../components/AppBar';
import FloatingActionButton from '../components/FloatingActionButton';

const HomeScreen = ({ navigation, notes }) => {
    return (
        <View style={styles.container}>
            <AppBar title="Notes" />
            {notes.length > 0 ? (
                <FlatList
                    data={notes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.note}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text>{item.description}</Text>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noNotes}>No notes here.</Text>
            )}
            <FloatingActionButton onPress={() => navigation.navigate('NewNote')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    noNotes: {
        textAlign: 'center',
        marginTop: 20,
        color: '#999',
    },
    note: {
        padding: 10,
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 5,
    },
    title: {
        fontWeight: 'bold',
    },
});

export default HomeScreen;
