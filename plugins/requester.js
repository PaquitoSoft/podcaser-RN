import { DOMParser } from 'xmldom';
import { getValue, storeValue } from './local-cache.js';

const _xmlParser = new DOMParser();

const parsersMap = {
	base: parseJson,
	'text/javascript': parseJson,
	'application/json': parseJson,
	'text/xml': parseXml
};

function checkResponseStatus(res) {
	console.log('Response status:', res.status);
	console.log('Response headers:', res.headers);
	if (res.status < 400) {
		return res;
	} else {
		let error = new Error(res.statusText);
		error.statusCode = res.status;
		error.response = res;
		throw error;
	}
}

function parseXml(res) {
	return new Promise((resolve) => {
		console.log('Using XML parser...');
		res.text().then(text => {
			resolve({
				result: _xmlParser.parseFromString(text, 'application/xml'),
				url: res.url,
				response: res
			});
		});
	});
}

function parseJson(res) {
	return new Promise((resolve) => {
		console.log('Using JSON parser...');
		res.json().then(data => {
			resolve({
				result: data,
				url: res.url,
				response: res
			});
		});
	});
}

function parseResponse(res) {
	console.log('ContentType header:', res.headers.get('content-type'));
	const header = (res.headers.get('content-type') || '').split(';')[0];
	const parser = parsersMap[header] || parsersMap.base;
	return parser(res);
}

function cacheResponse(cacheOptions = {}) {
	return ({ url, result, response }) => {
		console.log('CacheControl header:', response.headers.get('cache-control'));
		const cacheControlHeader = (response.headers.get('cache-control') || '')
			.split(',')
			.map(token => {
				const [key, value] = token.trim().split('=');
				return { key, value };
			})
			.find(({ key }) => key === 'max-age');

		if (cacheControlHeader) {
			console.log('Ajax::cacheResponse# Caching response with key:', url, 'for', cacheControlHeader.value, 'seconds (server cache info).');
			storeValue(url, result, cacheControlHeader.value); // Last parameter is TTL in seconds
		} else if (cacheOptions.defaultTtl) {
			console.log('Ajax::cacheResponse# Caching response with key:', url, 'for', cacheOptions.defaultTtl, 'seconds (default cache info).');
			storeValue(url, result, cacheOptions.defaultTtl); // Last parameter is TTL in seconds
		}

		return result;
	}

}

export async function getData({ url, requestOptions, cacheOptions }) {
	console.log(`Let's fetch ${url}`);
	let data = await getValue(url);

	if (data) {
		console.log(`Returning cached value for ${url}`);
		return data;
	} else {
		console.log(`Let's request ${url}`);
		const reqOptions = Object.assign({}, requestOptions);
		return fetch(url, requestOptions)
			.then(checkResponseStatus)
			.then(parseResponse)
			.then(cacheResponse(cacheOptions));
	}
}
