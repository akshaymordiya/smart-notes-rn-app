import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNotes } from '../hooks/useNotes';
import NoteCard from '../components/notes/NoteCard';
import Loader from '../components/ui/Loader';
import EmptyState from '../components/ui/EmptyState';
import { ROUTES } from '../navigation/routes';

export default function HomeScreen({ navigation }) {
  const { notes, loading } = useNotes();
  const [filter, setFilter] = useState('All');
  const filtered = notes.filter((n) =>
    filter === 'Moments' ? n.moments.length > 0 : true
  );
  return (
    <View style={{ flex: 1, backgroundColor: '#0F1115', padding: 16 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <Text style={{ color: '#E6EDF3', fontSize: 24, fontWeight: '700' }}>
          Notes
        </Text>
        <View style={{ flexDirection: 'row' }}>
          {['All', 'Moments'].map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setFilter(t)}
              style={{
                marginLeft: 8,
                paddingVertical: 6,
                paddingHorizontal: 10,
                borderRadius: 999,
                backgroundColor: filter === t ? '#7C5CFF' : '#121319',
              }}
            >
              <Text style={{ color: filter === t ? '#fff' : '#9AA4B2' }}>
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {loading ? (
        <Loader label="Loading notes" />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No notes yet"
          subtitle="Create your first note to get started"
        />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(ROUTES.APP.NOTE_DETAIL, { id: item.id })
              }
            >
              <NoteCard
                note={item}
                onPress={() =>
                  navigation.navigate(ROUTES.APP.NOTE_DETAIL, { id: item.id })
                }
              />
            </TouchableOpacity>
          )}
        />
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate(ROUTES.APP.CREATE)}
        style={{
          position: 'absolute',
          right: 20,
          bottom: 30,
          backgroundColor: '#7C5CFF',
          padding: 16,
          borderRadius: 999,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '700' }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
