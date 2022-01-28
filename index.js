const products = [
	{
		name: 'L1',
		features: ['Genius Framing', '6K Image Sensor', 'Network Enabled'],
	},
	{
		name: 'GO',
		features: ['720p Image Sensor', 'AI', 'Genius Framing', 'MAC OS', 'Linux'],
	},
	{
		name: 'IQ',
		features: ['Genius Framing', '4K Image Sensor', 'AI', 'MAC OS', 'Linux'],
	},
];

/**
 * Find duplicates between multiple arrays,
 * and return an array of objects with the duplicates and their count.
 *
 * Example:
 * [{
 * item: 'Genius Framing',
 * count: 3
 * },
 * {
 * item: 'Camera',
 * count: 2
 * }]
 *
 * @param {array<array>} arrays
 * @returns {array<object>}
 */
function findDuplicatesBetweenArrays(arrays) {
	const duplicates = [];
	const items = arrays.reduce((acc, arr) => [...acc, ...arr], []);
	const uniqueItems = [...new Set(items)];

	uniqueItems.forEach((item) => {
		const count = items.filter((i) => i === item).length;
		if (count > 1) {
			duplicates.push({ item, count });
		}
	});

	return duplicates;
}

function sortProductFeatures(products) {
	const duplicateFeatures = findDuplicatesBetweenArrays(products.map((product) => product.features));

	return products.map((p) => {
		const topFeatures = duplicateFeatures.reduce((acc, d) => {
			if (p.features.includes(d.item)) {
				acc.push(`✅ ${d.item}`);
				p.features = p.features.filter((f) => f !== d.item);
			} else {
				acc.push(`❌ ${d.item}`);
			}
			return acc;
		}, []);

		const otherFeatures = p.features.sort();

		return {
			...p,
			features: [...topFeatures, ...otherFeatures],
		};
	});
}

console.log('Initial products array:');
console.log(products);
console.log('Sort product features:');
console.log(sortProductFeatures(products));
