import React, { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { searchPodcasts } from '../api/listen-notes';

import Colors from '../constants/Colors';

function SearchScreen() {
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
			<View style={styles.searchResultsContainer}>
				<Text>Search results: {searchResults.length}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	searchPodcasts: {
		display: 'flex',
		flex: 1,
		alignItems: 'center',
		padding: 15
	},
	searchFormContainer: {
		display: 'flex',
		width: '80%',
		flexDirection: 'row'
	},
	searchTerm: {
		flex: 11,
		fontSize: 24,
		borderRadius: 20,
		paddingLeft: 10,
		backgroundColor: '#eee',
		height: 40
	},
	searchIcon: {
		flex: 1,
		paddingLeft: 10,
		paddingTop: 8
	},
	searchResultsContainer: {
		marginTop: 15
	}
});

SearchScreen.navigationOptions = {
  title: 'Search',
};

export default SearchScreen;
