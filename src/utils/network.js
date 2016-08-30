import { fetchXmlAsJson, fetchJson } from './fetch'

async function fetchData(url) {
	return fetchXmlAsJson(url)
}

export async function requestData(url) {
	try {
		let data = await fetchData(url)
		return Promise.resolve(data)
	} catch (err) {
		throw new Error(err)
	}
}

export function requestJsonData(url) {
	return fetchJson(url)
}
