import domdiff from 'domdiff';
import compare from './domdiff/compare';

// patch the target node using innerHTML
export default function htmldiff(targetNode, innerHTML) {
	if (targetNode.innerHTML !== innerHTML) {
		const element = targetNode.cloneNode();

		element.innerHTML = innerHTML;

		const oldNodes = Array.prototype.slice.call(targetNode.childNodes);
		const newNodes = Array.prototype.slice.call(element.childNodes);
		const options = { compare };

		domdiff(targetNode, oldNodes, newNodes, options);
	}
};
