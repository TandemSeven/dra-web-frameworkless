import domdiff from 'domdiff';
import compare from './domdiff/compare';

// return innerHTML as an array of nodes
export default function htmldiff(targetNode, innerHTML) {
	const element = targetNode.cloneNode();

	element.innerHTML = innerHTML;

	const oldNodes = Array.prototype.slice.call(targetNode.childNodes);
	const newNodes = Array.prototype.slice.call(element.childNodes);
	const options = { compare };

	domdiff(targetNode, oldNodes, newNodes, options);
};
