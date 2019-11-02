import Inventory from './inventory';


let inventory;
beforeAll(() =>{
	// jest runs files according to their absolute path
	const filename = `${__dirname}/sales_data_sample.csv`;
	inventory = new Inventory(filename);
});


test('read the csv, count records', async () => {
	const records = await inventory.records();

	expect(records.length).toBe(2823);
});

test('sales by state', async () => {
	const numStates = await inventory.numStates();

	expect(numStates).toBe(17); // not independently verified
});

test('totalprice by state', async () => {
	const dollarVolumeByState = await inventory.dollarVolumeByState();

	expect(dollarVolumeByState['NY']).toBe(524069.11); // not independently verified
});
