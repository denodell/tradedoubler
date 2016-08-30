import 'babel-polyfill'
import 'source-map-support/register'
import { requestAdvertisers, requestLinks, requestVouchers, requestProducts, requestTransactions } from './utils'
//import dateFormat from 'dateformat'

const defaultOptions = {
	affiliateId: '',
	reportKey: '',
	vouchersToken: '',
}

export default class Tradedoubler {
	constructor(options) {
		this.options = Object.assign({}, defaultOptions, options)
	}

	getAdvertisers({ reportKey, affiliateId } = this.options) {
		return requestAdvertisers({ reportKey, affiliateId })
	}

	getVouchers({ reportKey, affiliateId, vouchersToken } = this.options) {
		return requestVouchers({ reportKey, affiliateId, vouchersToken })
	}

	getTransactions() {
		const { apiKey, affiliateId } = this.options

		return requestTransactions({
			apiKey,
			affiliateId,
		})
	}

  // TODO
	getProducts() {

	}

  // TODO
	searchProducts() {

	}
}
