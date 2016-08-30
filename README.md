Tradedoubler API Helper Methods
-------------------------------

_Warning: ALPHA release - unstable API and feature incomplete_

Contains utilities to simplify interaction with the Tradedoubler Affiliate Marketing Network APIs.

Provides support for the following data types:

 - Merchants / Advertisers
 - Vouchers

## Prerequisites

 - Node.js / NPM

## Install

```
npm i tradedoubler --save
```

## Usage

```
var TD = new Tradedoubler({
  affiliateId: '123456',
	reportKey: 'ABCD...',
	vouchersToken: 'ABCDE...'
})
```

### Advertisers

Get a list of all advertisers in the Tradedoubler system linked to the particular Affiliate ID

```
TD.getAdvertisers()
```

### Vouchers

Get voucher codes linked to a particular Affiliate ID

```
TD.getVouchers()
```

## Test

```
npm test
```
