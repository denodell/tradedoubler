import fetch from 'isomorphic-fetch'
import { parseString as parseXML } from 'xml2js'

let exported = {}

function xmlToJSON(xml) {
	return new Promise((resolve, reject) => {
		parseXML(xml, {
			trim: true,
			stripPrefix: true,
			normalizeTags: true,
			normalize: true,
			explicitRoot: false,
		}, (err, json) => {
			if (err) {
				reject(err)
				return
			}

			if (!json && !json.matrix) {
				reject(xml)
				return
			}

			resolve(json.matrix.pop())
		})
	})
}

function fetchXml(url, headers) {
	return fetch(url, { headers })
	.then(response => {
		if (!response.ok) {
			throw response.statusText
		}
		return response
	})
	.then(response => response.text())
}

function fetchXmlAsJson(url, headers) {
	return new Promise((resolve, reject) => {
		return exported.fetchXml(url, headers)
			.then(xmlToJSON)
	    .then(data => resolve(data))
	    .catch(reject)
	})
}

function fetchJson(url, headers) {
	return fetch(url, { headers }).then(response => response.json())
}

module.exports = exported = {
	fetchXml,
	fetchXmlAsJson,
	fetchJson,
}
