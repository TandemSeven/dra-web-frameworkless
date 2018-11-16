// return whether both nodes are matching tags
export default function isShallowEqualElementTag(nodeA, nodeB) {
	return Object(nodeA).nodeType === 1 && nodeA.tagName === Object(nodeB).tagName;
}
