export default function textdiff(textA, textB) {
	let index = 0;

	while (index <= textA.data.length && textA.data[index] === textB.data[index]) {
		++index
	}

	if (index === textA.data.length) {
		// add additional text after the text node
		textB.data = textB.data.slice(index);

		textA.parentNode.insertBefore(textB, textA.nextSibling);
	} else {
		// otherwise, update the text node
		textA.data = textB.data;
	}
}
