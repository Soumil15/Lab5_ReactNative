import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ToastAndroid } from 'react-native';
import AppBar from '../components/AppBar';

const NewNoteScreen = ({ navigation, addNote }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const saveNote = () => {
        if (title.trim() === '' || description.trim() === '') {
            ToastAndroid.show('Please fill out all fields', ToastAndroid.SHORT);
            return;
        }
        addNote({ title, description });
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <AppBar title="New Note" onBack={() => navigation.goBack()} />
            <TextInput
                placeholder="Title"
                style={styles.input}
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                placeholder="Description"
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <Button title="Save" onPress={saveNote} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f8f9fa',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 15,
        padding: 8,
    },
});

export default NewNoteScreen;
