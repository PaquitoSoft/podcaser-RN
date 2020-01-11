import React from 'react';
import {
  Text,
  View,
} from 'react-native';

function PodcastDetailScreen({ navigation }) {
	const summary = navigation.getParam('summary');

	return (
		<View>
			<Text>Podcast detail Screen</Text>
			<Text>Podcast name: {summary.name}</Text>
		</View>
	);
}

PodcastDetailScreen.navigationOptions = ({ navigation }) => ({
	title: navigation.getParam('summary').name
});

export default PodcastDetailScreen;
