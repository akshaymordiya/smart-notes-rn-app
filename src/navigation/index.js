import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import HomeScreen from '../screens/HomeScreen.jsx';
import NoteCreateScreen from '../screens/NoteCreateScreen.jsx';
import SettingsScreen from '../screens/SettingsScreen.jsx';
import NoteDetailScreen from '../screens/NoteDetailScreen.jsx';
import NotificationsScreen from '../screens/NotificationsScreen.jsx';
import { ROUTES } from './routes';
import { useAppSelector } from '../hooks/useRedux';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#121319' },
        tabBarActiveTintColor: '#7C5CFF',
      }}
    >
      <Tabs.Screen
        name={ROUTES.APP.HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name={ROUTES.APP.CREATE}
        component={NoteCreateScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name={ROUTES.APP.NOTIFICATIONS}
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name={ROUTES.APP.SETTINGS}
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

export function AppNavigator() {
  const token = useAppSelector((s) => s.auth.token);
  const isAuthed = Boolean(token);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_bottom' }}
    >
      {isAuthed ? (
        <>
          <Stack.Screen name={ROUTES.APP.TABS} component={MainTabs} />
          <Stack.Screen
            name={ROUTES.APP.NOTE_DETAIL}
            component={NoteDetailScreen}
          />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}

export default AppNavigator;
