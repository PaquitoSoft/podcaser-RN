import { stringify } from 'query-string';
import { getData } from '../plugins/requester';
import PodcastSummary from '../models/podcast-summary';

const BASE_URL = 'https://listen-api.listennotes.com/api/v2';
const API_KEY = '';

const ONE_DAY = 24 * 60 * 60; // in seconds
const ONE_HOUR = 60 * 60; // in seconds

export function getGenres() {
	return getData({
		url: `${BASE_URL}/genres`,
		requestOptions: { headers: { 'X-ListenAPI-Key': API_KEY } },
		cacheOptions: {
			defaultTtl: ONE_DAY
		}
	});
}

export async function searchPodcasts({ searchTerm }) {
	const query = {
		q: searchTerm,
		type: 'podcast',
		offset: 0,
		genre_ids: [134]
	};

	const result = await getData({
		url: `${BASE_URL}/search?${stringify(query)}`,
		requestOptions: { headers: { 'X-ListenAPI-Key': API_KEY } },
		cacheOptions: {
			defaultTtl: ONE_DAY
		}
	});

	return result.results.map(raw => new PodcastSummary(raw));
}
