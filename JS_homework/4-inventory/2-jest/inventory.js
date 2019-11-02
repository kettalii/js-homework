// global
import fs from 'fs';
import csv from 'csv-parser';

// local
import { groupBy } from './utils';


class Sale {
	/**
     * All values are deconstructed, regardless if they are used or not. This is simply to make it easier
     * to add new values later down the line. This is generally unpreferred. We use the tag 
     * `eslint-disable-line no-unused-vars` to specify to our linter that these lines should be ignored 
     * 
     * @param {*} sale - raw sale object, to be deconstructed here 
     */
	constructor({
		ORDERNUMBER,
		QUANTITYORDERED,
		PRICEEACH,
		ORDERLINENUMBER, // eslint-disable-line no-unused-vars
		SALES, // eslint-disable-line no-unused-vars
		ORDERDATE, // eslint-disable-line no-unused-vars
		STATUS, // eslint-disable-line no-unused-vars
		QTR_ID, // eslint-disable-line no-unused-vars
		MONTH_ID,
		YEAR_ID,
		PRODUCTLINE, // eslint-disable-line no-unused-vars
		MSRP, // eslint-disable-line no-unused-vars
		PRODUCTCODE, // eslint-disable-line no-unused-vars
		CUSTOMERNAME, // eslint-disable-line no-unused-vars
		PHONE, // eslint-disable-line no-unused-vars
		ADDRESSLINE1, // eslint-disable-line no-unused-vars
		ADDRESSLINE2, // eslint-disable-line no-unused-vars
		CITY,
		STATE,
		POSTALCODE, // eslint-disable-line no-unused-vars
		COUNTRY, // eslint-disable-line no-unused-vars
		TERRITORY, // eslint-disable-line no-unused-vars
		CONTACTLASTNAME, // eslint-disable-line no-unused-vars
		CONTACTFIRSTNAME, // eslint-disable-line no-unused-vars
		DEALSIZE, // eslint-disable-line no-unused-vars
	}) {
		this._id = ORDERNUMBER;
		this.quantity = QUANTITYORDERED;
		this.month = MONTH_ID;
		this.year = YEAR_ID;
		this.averagePrice = PRICEEACH;

		this.city = CITY;
		this.state = STATE;
	}

	totalPrice() {
		return this.averagePrice * this.quantity;
	}
}

export default class Inventory {

	constructor(filename) {
		if (!filename) {
			throw Error('No filename');
		}

		this.filename = filename;
	}

	async records() {
		if (!this._records) {
			this._records = await new Promise((resolve) => {
				const results = [];
				fs.createReadStream(this.filename)
					.pipe(csv())
					.on('data', (data) => results.push(data))
					.on('end', () => resolve(results));
			});

			if (! this._records.length) {
				throw Error(`Could not open ${this.filename}`);
			}
		}

		return this._records;
	}

	async sales() {
		if (!this._sales) {
			const records = await this.records();
			this._sales = records.map(record => new Sale(record));
		}

		return this._sales;
	}

	async mapStateToSale() {
		if (!this._salesByState) {
			const sales = await this.sales();

			this._salesByState = groupBy(sales, sale => sale.state);
		}

		return this._salesByState;
	}

	async numStates() {
		if (!this._numStates) {
			this._numStates = Object.keys(await this.mapStateToSale()).length;
		}

		return this._numStates;
	}

	async dollarVolumeByState() {
		if (!this._dollarVolumeByState) {
			const mapStateToSale = await this.mapStateToSale();

			
			this._dollarVolumeByState = Object.entries(mapStateToSale).reduce((accum, [key, sale]) => {
				accum[key] = sale.map(sale => sale.totalPrice()).reduce((a, b) => a + b);

				return accum;
			}, {});
		}
		return this._dollarVolumeByState;
	}
}
