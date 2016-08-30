import _ from 'lodash'

export function normalizeAdvertiserData(advertisers) {
	let merchants = advertisers.rows[0].row

	merchants = merchants.map(({ programname, programid, programtariffamount, programtariffcurrency, programtariffpercentage, event }) => ({
		programName: programname[0],
		programId: programid[0],
		programTariffAmount: programtariffamount[0],
		programTariffCurrency: programtariffcurrency[0],
		programTariffPercentage: programtariffpercentage[0],
		event: event[0],
	}))

	let merchantsOutput = _.uniq(merchants.map(merchant => merchant.programId)).map(id => ({
		name: merchants.filter(merchant => merchant.programId === id)[0].programName,
		id,
		commissions: merchants.filter(merchant => merchant.programId === id).map(({ programTariffAmount, programTariffCurrency, programTariffPercentage, event }) => ({
			event,
			programTariffAmount: +programTariffAmount,
			programTariffCurrency,
			programTariffPercentage: +programTariffPercentage,
		})),
	}))

	return merchantsOutput
}
