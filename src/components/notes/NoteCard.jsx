import React from 'react';
import { View, Text } from 'react-native';
import Card from '../ui/Card';
import IconButton from '../ui/IconButton';

export default function NoteCard({ note, onPress }) {
  return (
    <Card style={{ marginBottom: 12 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#E6EDF3', fontSize: 18, fontWeight: '600' }}>
          {note.title}
        </Text>
        <IconButton name="chevron-forward" onPress={onPress} />
      </View>
      <Text style={{ color: '#9AA4B2', marginTop: 6 }} numberOfLines={2}>
        {note.content}
      </Text>
      <View
        style={{
          marginTop: 8,
          paddingVertical: 4,
          paddingHorizontal: 8,
          alignSelf: 'flex-start',
          borderRadius: 8,
          backgroundColor: note.status === 'processing' ? '#1F2937' : '#0B3B2E',
        }}
      >
        <Text
          style={{
            color: note.status === 'processing' ? '#F59E0B' : '#34D399',
            fontSize: 12,
          }}
        >
          {note.status}
        </Text>
      </View>
    </Card>
  );
}
