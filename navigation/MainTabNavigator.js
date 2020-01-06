import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import PlayerScreen from '../screens/PlayerScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

function buildStackNavigator({ label, screen, iconName, path = '' }) {
	const Stack = createStackNavigator(
	  { [label]: screen },
	  config
	);

	Stack.navigationOptions = {
	  tabBarLabel: label,
	  tabBarIcon: ({ focused }) => (
	    <TabBarIcon
	      focused={focused}
	      name={iconName}
	    />
	  ),
	};
	Stack.path = path;

	return Stack;
}

const HomeStack = buildStackNavigator({
	label: 'Home',
	screen: HomeScreen,
	iconName: 'apps'
});

const SearchStack = buildStackNavigator({
	label: 'Search',
	screen: SearchScreen,
	iconName: 'search'
});

const FavoritesStack = buildStackNavigator({
	label: 'Favorites',
	screen: FavoritesScreen,
	iconName: 'star'
});

const PlayerStack = buildStackNavigator({
	label: 'Player',
	screen: PlayerScreen,
	iconName: 'play-circle'
});

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  SearchStack,
  FavoritesStack,
  PlayerStack
});

tabNavigator.path = '';

export default tabNavigator;
