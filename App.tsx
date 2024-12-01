import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';

// Define a type for the notes
type Note = {
  id: string;
  title: string;
  description: string;
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'Home' | 'NewNote'>('Home');
  const [notes, setNotes] = useState<Note[]>([]); // Notes array with proper type
  const [newNote, setNewNote] = useState<Pick<Note, 'title' | 'description'>>({
    title: '',
    description: '',
  });

  const saveNote = () => {
    if (!newNote.title.trim() || !newNote.description.trim()) {
      ToastAndroid.show('Both Title and Description are required!', ToastAndroid.SHORT);
      return;
    }
    setNotes([
      ...notes,
      { id: Date.now().toString(), title: newNote.title, description: newNote.description },
    ]);
    setNewNote({ title: '', description: '' }); // Clear inputs
    setCurrentScreen('Home');
  };

  const renderHomeScreen = () => (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Text style={styles.appBarText}>Notes</Text>
      </View>
      {notes.length > 0 ? (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.noteCard}>
              <Text style={styles.noteTitle}>{item.title}</Text>
              <Text>{item.description}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noNotesText}>No notes here.</Text>
      )}
      <TouchableOpacity style={styles.fab} onPress={() => setCurrentScreen('NewNote')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  const renderNewNoteScreen = () => (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => setCurrentScreen('Home')}>
          <Text style={styles.backArrow}>{'←'}</Text>
        </TouchableOpacity>
        <Text style={styles.appBarText}>New Note</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={newNote.title}
        onChangeText={(text) => setNewNote({ ...newNote, title: text })}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        value={newNote.description}
        onChangeText={(text) => setNewNote({ ...newNote, description: text })}
        multiline
      />
      <Button title="Save" onPress={saveNote} />
    </View>
  );

  return currentScreen === 'Home' ? renderHomeScreen() : renderNewNoteScreen();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  appBar: {
    height: 60,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  appBarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backArrow: {
    color: '#fff',
    fontSize: 24,
    position: 'absolute',
    left: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6200EE',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: {
    color: '#fff',
    fontSize: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  noNotesText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
  noteCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  noteTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
