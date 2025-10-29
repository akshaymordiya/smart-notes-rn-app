import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import Button from '../components/ui/Button';
import FilePreview from '../components/ui/FilePreview';
import { useAppDispatch } from '../hooks/useRedux';
import { createNoteThunk } from '../features/notes/notesThunks';
import { ROUTES } from '../navigation/routes';

export default function NoteCreateScreen({ navigation }) {
  const dispatch = useAppDispatch();
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState([]);

  const submit = async () => {
    const title = content.split('\n')[0]?.slice(0, 60) || 'Untitled';
    await dispatch(createNoteThunk({ title, content, attachments, tags: [] }));
    navigation.navigate(ROUTES.APP.HOME);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#0F1115' }}
      contentContainerStyle={{ padding: 16 }}
    >
      <Text
        style={{
          color: '#E6EDF3',
          fontSize: 24,
          fontWeight: '700',
          marginBottom: 12,
        }}
      >
        Create Note
      </Text>
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="Start typing your note..."
        placeholderTextColor="#6B7280"
        multiline
        style={{
          minHeight: 160,
          backgroundColor: '#121319',
          color: '#E6EDF3',
          padding: 14,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#242832',
        }}
      />
      <View style={{ flexDirection: 'row', marginTop: 12 }}>
        {attachments.map((a) => (
          <FilePreview key={a.id} name={a.name} type={a.type} />
        ))}
      </View>
      <View style={{ height: 12 }} />
      <Button
        title="Attach file (stub)"
        onPress={() =>
          setAttachments((arr) => [
            ...arr,
            {
              id: Date.now().toString(),
              name: 'mock.pdf',
              type: 'application/pdf',
            },
          ])
        }
        variant="ghost"
      />
      <View style={{ height: 12 }} />
      <Button title="Save" onPress={submit} />
    </ScrollView>
  );
}
