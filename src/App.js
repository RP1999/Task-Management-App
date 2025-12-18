import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { colors, typography } from './styles/theme';

import HomeScreen from './screens/HomeScreen';
import TaskDetailScreen from './screens/TaskDetailScreen';
import CreateEditTaskScreen from './screens/CreateEditTaskScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.surface}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.surface,
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 1,
              borderBottomColor: colors.borderLight,
            },
            headerTintColor: colors.primary,
            headerTitleStyle: {
              fontWeight: typography.semiBold,
              fontSize: typography.h5,
            },
            headerBackTitleVisible: false,
          }}
        >
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
