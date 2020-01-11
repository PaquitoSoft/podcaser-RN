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
import PodcastDetailScreen from '../screens/PodcastDetailScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

function buildStackNavigator({ label, screens, iconName, path = '' }) {
	const _screens = screens.reduce((result, { label, screen }) => {
		result[label] = screen;
		return result;
	}, {});
	console.log(_screens);
	const Stack = createStackNavigator(
	  screens.reduce((result, { label, screen }) => {
		  result[label] = screen;
		  return result;
	  }, {}),
	  config
	);

	Stack.navigationOptions = {
	  tabBarLabel: screens[0].label,
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
	screens: [
		{ label: 'Home', screen: HomeScreen },
		{ label: 'PodcastDetail', screen: PodcastDetailScreen }
	],
	iconName: 'apps'
});

const SearchStack = buildStackNavigator({
	screens: [
		{ label: 'Search', screen: SearchScreen },
		{ label: 'PodcastDetail', screen: PodcastDetailScreen }
	],
	iconName: 'search'
});

const FavoritesStack = buildStackNavigator({
	screens: [
		{ label: 'Favorites', screen: FavoritesScreen }
	],
	iconName: 'star'
});

const PlayerStack = buildStackNavigator({
	screens: [
		{ label: 'Player', screen: PlayerScreen }
	],
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
