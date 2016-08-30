import { describe, beforeEach } from 'ava-spec'
import Tradedoubler from '../'

describe(`Tradedoubler`, it => {
	let TD

	beforeEach(() => {
		TD = new Tradedoubler({
			affiliateId: `2873187`,
			reportKey: `ff9c958527d97be7f7578c8693895ed3`,
			vouchersToken: `CDF26351E7C10018235704171C49982B42F42530`,
		})
	})

	it(`Advertisers`, expect => {
		return TD.getAdvertisers().then(advertisers => {
			expect.true(advertisers.length > 0)
		})
	})

	it(`Vouchers`, expect => {
		return TD.getVouchers().then(vouchers => {
			expect.true(vouchers.length > 0)
		})
	})
})
