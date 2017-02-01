import _ from 'lodash'

export function normalizeAdvertiserData(advertisers, affiliateId) {
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
		linkUrl: `http://clkuk.tradedoubler.com/click?p(${id})a(${affiliateId})`,
		commissions: merchants.filter(merchant => merchant.programId === id).map(({ programTariffAmount, programTariffCurrency, programTariffPercentage, event }) => ({
			event,
			programTariffAmount: +programTariffAmount,
			programTariffCurrency,
			programTariffPercentage: +programTariffPercentage,
		})),
	}))

	return merchantsOutput
}

export function normalizeTransactionData(trans) {
	let transactions = trans.rows[0].row

	transactions = transactions.map(({ programid, timeofvisit, timeofevent, lastmodified, ordernr, epi1, pendingstatus, ordervalue, affiliatecommission }) => ({
		programId: programid[0],
		timeOfVisit: timeofvisit[0] ? new Date(timeofvisit[0]) : timeofvisit[0],
		timeOfEvent: timeofevent[0] ? new Date(timeofevent[0]) : timeofevent[0],
		lastModified: lastmodified[0] ? new Date(lastmodified[0].substr(0, lastmodified[0].lastIndexOf(' ') - 1)) : lastmodified[0],
		orderNr: ordernr[0],
		epi1: epi1[0],
		status: pendingstatus[0],
		orderValue: +ordervalue[0],
		affiliateCommission: +affiliatecommission[0],
	}))

	return transactions
}
