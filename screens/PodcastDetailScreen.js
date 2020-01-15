import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';
import { getPodcastEpisodes } from '../api/listen-notes';

function PodcastDetailScreen({ navigation }) {
	const { id, name, author, cover, totalEpisodes } = navigation.getParam('summary');
	const [episodes, setEpisodes] = useState(null);
	
	useEffect(() => {
		getPodcastEpisodes(id)
			.then(episodes => setEpisodes(episodes))
			.catch(error => console.error(error));
	}, [id]);
	
	return (
		<View
			style={styles.podcastDetail}
		>
			<Image
				style={styles.podcastCover}
				source={{ uri: cover }}
			/>
			<Text style={styles.podcastName}>{name}</Text>
			<Text style={styles.podcastAuthor}>(by {author})</Text>

			{episodes &&
				<View>
					<Text>Episodes count: {episodes.length}</Text>
				</View>			
			}
		</View>
	);
}

const styles = StyleSheet.create({
	podcastDetail: {
		marginTop: 10,
		display: 'flex',
		alignItems: 'center'
	},
	podcastCover: {
		width: 400,
		height: 400
	},
	podcastName: {
		marginTop: 15,
		fontSize: 24
	},
	podcastAuthor: {
		fontSize: 18,
		color: '#999999'
	}
});

PodcastDetailScreen.navigationOptions = ({ navigation }) => ({
	title: navigation.getParam('summary').name
});

export default PodcastDetailScreen;
