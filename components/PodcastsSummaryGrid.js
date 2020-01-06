import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import PodcastSummary from './PodcastSummary';

function PodcastsSummaryGrid({ podcasts }) {
	return (
		<View style={styles.container}>
			<FlatList
				data={podcasts}
				numColumns={2}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <PodcastSummary summary={item} />}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
	paddingTop: 30
  }
});

export default PodcastsSummaryGrid;
