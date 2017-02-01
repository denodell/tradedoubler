import { requestData, requestJsonData } from './network'
import { normalizeAdvertiserData, normalizeTransactionData } from './process-data'

export function requestAdvertisers({ affiliateId, reportKey }) {
	const url = `http://reports.tradedoubler.com/pan/aReport3Key.action?metric1.summaryType=NONE&metric1.lastOperator=/&metric1.columnName2=programId&metric1.operator1=/&metric1.columnName1=programId&metric1.midOperator=/&customKeyMetricCount=0&columns=event&columns=programTariffPercentage&columns=programTariffCurrency&columns=programTariffAmount&columns=programId&sortBy=orderProgram&programAffiliateStatusId=3&includeWarningColumn=true&affiliateId=${affiliateId}&latestDayToExecute=0&setColumns=true&reportTitleTextKey=REPORT3_SERVICE_REPORTS_AAFFILIATEMYPROGRAMSREPORT_TITLE&interval=MONTHS&reportName=aAffiliateMyProgramsReport&key=${reportKey}&format=XML`

	return new Promise(async function(resolve, reject) {
		try {
			let advertisers = await requestData(url)
			resolve(normalizeAdvertiserData(advertisers, affiliateId))
		} catch (err) {
			reject(err)
		}
	})
}

export function requestTransactions({ affiliateId, reportKey }) {
	const url = `http://reports.tradedoubler.com/pan/aReport3Key.action?currencyId=GBP&affiliateId=${affiliateId}&startDay=1&startMonth=2&startYear=2016&endDay=1&endMonth=2&endYear=2017&reportName=aAffiliateEventBreakdownReport&key=${reportKey}&format=XML`

	return new Promise(async function(resolve, reject) {
		try {
			let transactions = await requestData(url)
			resolve(normalizeTransactionData(transactions, affiliateId))
		} catch (err) {
			reject(err)
		}
	})
}

export function requestVouchers({ affiliateId, reportKey, vouchersToken }) {
	return new Promise(async function(resolve, reject) {
		try {
			let advertisers = await requestAdvertisers({ affiliateId, reportKey })
			const advertiserIds = advertisers.map(({ id }) => `programId=${id}`).join(';')
			const url = `https://api.tradedoubler.com/1.0/vouchers.json;dateOutputFormat=iso8601;voucherTypeId=1;${advertiserIds}?token=${vouchersToken}`
			let vouchers = await requestJsonData(url)
			resolve(vouchers)
		} catch (err) {
			reject(err)
		}
	})
}
