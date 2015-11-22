package task1;

public class Node {
	Node left;

	Node right;

	int value;

	public Node(final int value) {
		this.value = value;
	}

	// public void run() {

	public void insert(final Node node, final int value) {
		if (value < node.value) {
			if (node.left != null) {
				insert(node.left, value);
			} else {
				System.out.println("  Inserted " + value + " to left of "
						+ node.value);
				node.left = new Node(value);
			}
		} else if (value > node.value) {
			if (node.right != null) {
				insert(node.right, value);
			} else {
				System.out.println("  Inserted " + value + " to right of "
						+ node.value);
				node.right = new Node(value);
			}
		}
	}

	/**
	 * uses in-order traversal when the origin is less than the node's value
	 * 
	 * uses reverse-order traversal when the origin is greater than the node's
	 * order
	 */
	public void printFrontToBack(final Node node, final int camera) {

		if (node.value > camera) {
			// print in order
			printFrontToBack(node.left, camera);
			System.out.println("  Traversed " + node.value);
			printFrontToBack(node.right, camera);
		} else if (node.value < camera) {
			// print reverse order
			printFrontToBack(node.right, camera);
			System.out.println("  Traversed " + node.value);
			printFrontToBack(node.left, camera);
		} else {
			// order doesn't matter
			printFrontToBack(node.left, camera);
			printFrontToBack(node.right, camera);
		}
	}

}