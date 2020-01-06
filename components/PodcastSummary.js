import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

function PodcastSummary({
	summary: {
		id,
		name,
		author,
		description,
		cover,
		releaseDate,
		lastEpisodeDate
	}
}) {
	return (
		<View style={styles.podcastSummary}>
			<Image
				source={{ uri: cover }}
				style={{ width: 150, height: 150 }}
			/>
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
