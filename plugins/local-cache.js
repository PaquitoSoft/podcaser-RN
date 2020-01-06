import { AsyncStorage } from 'react-native';
import { XMLSerializer, DOMParser } from 'xmldom';
// import AsyncStorage from '@react-native-community/async-storage';

const xmlSerializer = new XMLSerializer();
const xmlParser = new DOMParser();
const SEPARATOR = '@@@';

function serializeValue(value) {
	let type = 'string';
	let raw = value;

	if (typeof value.createElement === 'function') {
		type = 'xml';
		raw = xmlSerializer.serializeToString(value);
	} else if (typeof value === 'object') {
		type = 'json';
		raw = JSON.stringify(value);
	}

	return { type, raw };
}

function parseStoredValue(value, type) {
	switch (type) {
		case 'json':
			return JSON.parse(value);
		case 'xml':
			return xmlParser.parseFromString(value, 'application/xml');
		default:
			return value;
	}
}

export function storeValue(key, value, ttl = 0) { // ttl in seconds
	const { type, raw } = serializeValue(value);
	const _ttl = Date.now() + (ttl * 1000);
	return AsyncStorage.setItem(key, `${_ttl}${SEPARATOR}${type}${SEPARATOR}${raw}`);
}

export async function getValue(key) {
	const value = await AsyncStorage.getItem(key);

	if (value) {
		const [ttl, type, raw] = value.split(SEPARATOR);
		if (Date.now() < ttl) {
			return parseStoredValue(raw, type);
		} else {
			return null;
		}
	} else {
		return null;
	}
}
