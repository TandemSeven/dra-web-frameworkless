import isShallowEqualElement from './is-shallow-equal-element';

// return whether 2 nodes are shallow equal text
export default function isShallowEqualText(nodeA, nodeB) {
	// both nodes are text
	return Object(nodeA).nodeType === 3 &&
	Object(nodeB).nodeType === 3 &&
	// both texts have shallow equal element parents
	isShallowEqualElement(nodeA.parentNode, nodeB.parentNode);
}
