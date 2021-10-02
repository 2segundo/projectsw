import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

// Import screens
import PeoplesList from '../screens/PeoplesList';
import FavoritesList from '../screens/FavoritesList';

const Tab = createBottomTabNavigator();

const tabBarOptions = {
  showLabel: false,
  inactiveTintColor: '#2D3038',
  activeTintColor: '#FFFFFF',
  style: {
    height: '10%',
    backgroundColor: '#1E1B26'
  }
};

const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case 'PeoplesList':
      iconName = 'view-dashboard';
      break;
    case 'FavoritesList':
      iconName = 'heart';
      break;
    default:
      break;
  }
 if (route.name == "PeoplesList"){
    return <MaterialCommunityIcons name={iconName} color={color} size={24} />;}
  else {
    return <AntDesign name={iconName} color={color} size={24} />;
  }
};

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='PeoplesList'
        tabBarOptions={tabBarOptions}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color)
        })}
      >
        <Tab.Screen name='PeoplesList' component={PeoplesList} />
        <Tab.Screen name='FavoritesList' component={FavoritesList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;