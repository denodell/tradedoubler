import { describe, beforeEach } from 'ava-spec'
import sinon from 'sinon'
import Tradedoubler from '../'
import fs from 'fs'
import fetchLib from '../dist/utils/fetch'

describe(`Tradedoubler`, it => {
	let TD

	beforeEach(() => {
		TD = new Tradedoubler({
			affiliateId: `-`,
			reportKey: `-`,
			vouchersToken: `-`,
		})
	})

	it(`Advertisers`, expect => {
		const advertisersXml = fs.readFileSync('mock-data/advertisers.xml', 'utf-8')
		sinon.stub(fetchLib, 'fetchXml').returns(Promise.resolve(advertisersXml))

		return TD.getAdvertisers().then(advertisers => {
			expect.true(advertisers.length > 0)
			fetchLib.fetchXml.restore()
		})
	})

	it(`Vouchers`, expect => {
		const advertisersXml = fs.readFileSync('mock-data/advertisers.xml', 'utf-8')
		const vouchersJson = JSON.parse(fs.readFileSync('mock-data/vouchers.json', 'utf-8'))
		sinon.stub(fetchLib, 'fetchXml').returns(Promise.resolve(advertisersXml))
		sinon.stub(fetchLib, 'fetchJson').returns(Promise.resolve(vouchersJson))

		return TD.getVouchers().then(vouchers => {
			expect.true(vouchers.length > 0)
			fetchLib.fetchXml.restore()
			fetchLib.fetchJson.restore()
		})
	})
})
