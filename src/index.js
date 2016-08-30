import 'babel-polyfill'
import 'source-map-support/register'
import { requestAdvertisers, requestVouchers } from './utils'

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
}
