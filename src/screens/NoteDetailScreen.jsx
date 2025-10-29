import React from 'react';
import { View, Text } from 'react-native';
import { useAppSelector } from '../hooks/useRedux';

export default function NoteDetailScreen({ route }) {
  const { id } = route.params;
  const note = useAppSelector((s) => s.notes.entities[id]);
  if (!note) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#0F1115',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: '#9AA4B2' }}>Note not found</Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#0F1115', padding: 16 }}>
      <Text style={{ color: '#E6EDF3', fontSize: 24, fontWeight: '700' }}>
        {note.title}
      </Text>
      <Text style={{ color: '#9AA4B2', marginTop: 12 }}>{note.content}</Text>
      <Text
        style={{
          color: '#E6EDF3',
          fontSize: 18,
          marginTop: 16,
          fontWeight: '600',
        }}
      >
        Moments
      </Text>
      {note.moments.length === 0 ? (
        <Text style={{ color: '#9AA4B2', marginTop: 8 }}>No moments yet</Text>
      ) : (
        note.moments.map((m) => (
          <View
            key={m.id}
            style={{
              marginTop: 8,
              padding: 12,
              backgroundColor: '#121319',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#242832',
            }}
          >
            <Text style={{ color: '#E6EDF3' }}>{m.title}</Text>
            <Text style={{ color: '#9AA4B2', fontSize: 12 }}>{m.type}</Text>
          </View>
        ))
      )}
    </View>
  );
}
