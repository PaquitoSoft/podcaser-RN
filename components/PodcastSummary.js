import React, { Fragment } from 'react';
import {
	View,
	StyleSheet,
	Text,
	Image,
	TouchableHighlight
} from 'react-native';

const noop = () => false;

function PodcastSummary({
	summary: {
		id,
		name,
		author,
		description,
		cover,
		releaseDate,
		lastEpisodeDate
	},
	onPress = noop
}) {
	return (
		<View
			style={styles.podcastSummary}
		>
			<TouchableHighlight onPress={onPress}>
				<Image
					source={{ uri: cover }}
					style={{ width: 150, height: 150 }}
				/>
			</TouchableHighlight>
			<Text style={styles.podcastName}>{name}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	podcastSummary: {
		flex: 1,
		alignItems: 'center',
		padding: 10
	},
	podcastName: {
		marginTop: 5
	}
});

export default PodcastSummary;
