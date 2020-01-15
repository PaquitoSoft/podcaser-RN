import React, { useState } from 'react';
import {
  Platform,
  TextInput,
  View,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { searchPodcasts } from '../api/listen-notes';

import PodcastsSummaryGrid from '../components/PodcastsSummaryGrid';
import Colors from '../constants/Colors';

function SearchScreen({ navigation }) {
	const [searchResults, setSearchResults] = useState([]);

	const onSearchSubmit = async ({ nativeEvent }) => {
		try {
			const podcasts = await searchPodcasts({ searchTerm: nativeEvent.text });
			setSearchResults(podcasts);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<View style={styles.searchPodcasts}>
			<View style={styles.searchFormContainer}>
				<TextInput
					autoFocus={true}
					onSubmitEditing={onSearchSubmit}
					placeholder="Search podcasts..."
					style={styles.searchTerm}
				/>
				<Ionicons
			      name={Platform.OS === 'ios' ? `ios-search` : `md-search`}
			      size={26}
			      style={styles.searchIcon}
			      color={Colors.tabIconDefault}
			    />
			</View>
			{
				searchResults.length > 0 &&
				<View style={styles.searchResultsContainer}>
					<PodcastsSummaryGrid
						podcasts={searchResults}
						onPress={(podcastSummary) => navigation.navigate('PodcastDetail', { summary: podcastSummary })}
					/>
				</View>
			}
		</View>
	);
}

const styles = StyleSheet.create({
	searchPodcasts: {
		display: 'flex',
		flex: 1,
		alignItems: 'center',
		padding: 5
	},
	searchFormContainer: {
		display: 'flex',
		marginTop: 10,
		width: '80%',
		flexDirection: 'row'
	},
	searchTerm: {
		flex: 11,
		fontSize: 24,
		borderRadius: 20,
		paddingLeft: 15,
		backgroundColor: '#eee',
		height: 40
	},
	searchIcon: {
		flex: 1,
		paddingLeft: 10,
		paddingTop: 8
	},
	searchResultsContainer: {
		marginTop: 10,
		width: '100%',
		flex: 1
	}
});

SearchScreen.navigationOptions = {
  title: 'Search',
};

export default SearchScreen;
