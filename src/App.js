import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, LogBox } from 'react-native';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { typography } from './styles/theme';

import HomeScreen from './screens/HomeScreen';
import TaskDetailScreen from './screens/TaskDetailScreen';
import CreateEditTaskScreen from './screens/CreateEditTaskScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import ReportsScreen from './screens/ReportsScreen';
import ProfileScreen from './screens/ProfileScreen';

// Ignore specific warnings
LogBox.ignoreLogs([
  'new NativeEventEmitter() was called with a non-null argument',
]);

const Stack = createStackNavigator();

const MainApp = () => {
  const { theme } = useTheme();

  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.background,
      card: theme.surface,
      text: theme.textPrimary,
      border: theme.border,
      primary: theme.primary,
    },
  };

  return (
    <>
      <StatusBar
        barStyle={theme.statusBar}
        backgroundColor={theme.surface}
      />
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator
          initialRouteName="Onboarding"
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.surface,
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 1,
              borderBottomColor: theme.borderLight,
            },
            headerTintColor: theme.primary,
            headerTitleStyle: {
              fontWeight: typography.semiBold,
              fontSize: typography.h5,
            },
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TaskDetail"
            component={TaskDetailScreen}
            options={{
              title: 'Task Details',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CreateEditTask"
            component={CreateEditTaskScreen}
            options={{
              title: 'Task',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Schedule"
            component={ScheduleScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Reports"
            component={ReportsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
};

export default App;
