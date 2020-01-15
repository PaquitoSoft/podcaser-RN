import { stringify } from 'query-string';
import { getData } from '../plugins/requester';
import PodcastSummary from '../models/podcast-summary';
import Episode from '../models/episode';

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

export async function getBestPodcasts() {
	const query = {
		genre_id: 134,
		page: 1
	};

	const result = await getData({
		url: `${BASE_URL}/best_podcasts?${stringify(query)}`,
		requestOptions: { headers: { 'X-ListenAPI-Key': API_KEY } },
		cacheOptions: {
			defaultTtl: ONE_DAY
		}
	});

	return result.podcasts.map(raw => new PodcastSummary(raw));
}

export async function getPodcastEpisodes(podcastId) {
	const result = await getData({
		url: `${BASE_URL}/podcasts/${podcastId}`,
		requestOptions: { headers: { 'X-ListenAPI-Key': API_KEY } },
		cacheOptions: {
			defaultTtl: ONE_DAY
		} 
	});

	return result.episodes.map(raw => new Episode(raw));
}