/* eslint-disable max-classes-per-file */
/**
 * STEP 1: The two main classes
 *  - This step asks me to create 2 classes:
 *    - Node class / factory, containing a value function and a link to the
 *        nextNode, set both as null by default.
 *    - LinkedList [class / factory], which will represent the full list.
 *      So, I made a Linked List class that has a head pointer, initially null.
 */
class Node {
	constructor(value = null, pointer = null) {
		this.value = value;
		this.next = pointer;
	}
}

export default class LinkedList {
	constructor() {
		this.head = null;
	}

	/**
	 * STEP 2: Add the functions
	 *  - This step asks me to add functions with which, I can work.
	 *  - append(value) adds a new node containing value to the end of the list.
	 *    - So, we make a new node. Then, add a check to see if the linked list's
	 *      empty or not. If it is, we can simply assign it to the head. Else,
	 *      we move through the list, find the tail, and append it to the end.
	 */
	append(value) {
		const newNode = new Node(value);

		if (this.head === null) {
			this.head = newNode;
			return this;
		}

		let tail = this.head;
		while (tail.pointer !== null) {
			tail = tail.pointer;
		}
		tail.pointer = newNode;
		return this;
	}

	/**
	 *  - prepend(value) adds a new node containing value to the start of the list.
	 *    - So, we make a new Node again. Then we fetch the head, add it to the
	 *      pointer of this new node, making this the new head, so we reassign
	 *      this to the head of the linked list.
	 */
	prepend(value) {
		const newNode = new Node(value);
		newNode.pointer = this.head;
		this.head = newNode;
		return this;
	}

	/**
	 *  - size() returns the total number of nodes in the list.
	 *    - So, I take the initial count as 0, and the head as a pointer. Then I
	 *      run a loop, till I hit the end pointer [null], and track the number of
	 *      pointers passed as a count. I return the count at last.
	 */
	size() {
		let count = 0;
		let position = this.head;

		if (position !== null) {
			position = position.pointer;
			count++;
		}
		return count;
	}

	/**
	 *  - head() returns the first node in the list.
	 *    - Uhm... just return head?
	 */
	head() {
		return this.head;
	}

	/**
	 *  - tail() returns the last node in the list.
	 *    - So, I check if the initial head is empty. If it is, I return null.
	 *      Else, I keep looping till I hit the end and return the last value.
	 */
	tail() {
		if (this.head === null) return null;

		let position = this.head;
		if (position.pointer !== null) position = position.pointer;
		return position;
	}

	/**
	 *  - at(index) returns the node at the given index.
	 *    - So, first, I check for valid Indices. If index is 0, that's the first
	 *      element. If it's not, I keep looping through, reducing the index's
	 *      value by one at each step, till I finally reach 0.
	 */
	at(index) {
		if (index < 0 || index >= this.size() || Number.isInteger(+index))
			throw new Error("Please enter a valid index.");

		if (index === 0) return this.head;

		let position = this.head;
		while (index > 0) {
			position = position.pointer;
			// eslint-disable-next-line no-param-reassign
			index--;
		}
		return position;
	}

	/**
	 *  - pop() removes the last element from the list.
	 *    - So, first, I check if it's empty, then if it has just 1 element. Else,
	 *      I traverse through the list, find the last element, and simply
	 *      remove and return it.
	 */
	pop() {
		if (this.head === null) throw new Error("The linked list is empty!");

		if (this.head.pointer === null) {
			const node = this.head;
			this.head = null;
			return node;
		}

		let previous = this.head;
		let next = this.head.pointer;

		while (next.pointer !== null) {
			previous = next;
			next = next.pointer;
		}

		previous.pointer = null;
		return next;
	}

	/**
	 *  - contains(value) returns true if the passed in value is in the list and
	 *    otherwise returns false.
	 *    - So, I check if the list is initially empty. If it isn't I loop over it,
	 *      and check if it exists. If I reach the end, I return false.
	 */
	contains(value) {
		if (this.head === null) throw new Error("The linked list is empty!");

		let position = this.head;
		while (position !== null) {
			if (position.value === value) return true;
			position = position.pointer;
		}
		return false;
	}

	/**
	 *  - find(value) returns the index of the node containing value, or nil if
	 *    not found.
	 *    - Similar to contains(value), but I keep track of a counter counting the
	 *      current index position.
	 */
	find(value) {
		if (this.head === null) throw new Error("The linked list is empty!");

		let position = this.head;
		let counter = 1;
		while (position !== null) {
			if (position.value === value) return counter;
			position = position.pointer;
			counter++;
		}
		return null;
	}

	/**
	 *  - toString() represents your LinkedList objects as strings, so you can
	 *    print them out and preview them in the console. The format should be:
	 *    ( value ) -> ( value ) -> ( value ) -> null
	 *    -
	 */
	toString() {
		if (this.head === null) console.log("null");

		let position = this.head;
		let string = "";
		while (position !== null) {
			if (
				typeof position.value === "function" ||
				typeof position.value === "symbol"
			) {
				console.log(`${string} -> null`);
				throw new Error("The value found cannot be strigified!");
			} else if (typeof position.value === "string") {
				string += `${position.value} -> `;
			} else if (typeof position.value === "object") {
				string += `${JSON.stringify(position.value)} -> `;
			} else {
				string += `${position.value.toString()} -> `;
			}

			position = position.pointer;
		}
		return `${string} -> null`;
	}

	/**
	 *  - insertAt(value, index) that inserts a new node with the provided value
	 *    at the given index.
	 *    - So, first I check if the list is empty. If it is, I ignore the index.
	 *      If it isn't, I check the index for validity. If it is valid, I check
	 *      if the index is the starting position. If it is, I prepend it. Else,
	 *      I fetch the previous node, make a new one with the given value and the
	 *      pointer to the next nodes, and append it to the previous one.
	 */
	insertAt(value, index) {
		if (this.head === null) {
			this.head = new Node(value);
			return this;
		}

		if (index < 0 || index >= this.size() || Number.isInteger(+index))
			throw new Error("Please enter a valid index.");

		if (index === 0) {
			this.prepend(value);
			return this;
		}

		const previous = this.at(index - 1);
		const newNode = new Node(value, previous.pointer);
		previous.pointer = newNode;
		return this;
	}

	/**
	 *  - removeAt(index) that removes the node at the given index.
	 *    - Again, I check if the linked list is empty, if it is, I throw an
	 *      error. If it isn't, I check for index validity. If it is valid, I
	 *      check if it is a the first element, and if it is, I simply reassign
	 *      the head. Else, I fetch the previous node, reassign the next one's
	 *      pointer to it
	 */
	removeAt(index) {
		if (this.head === null) throw new Error("The linked list is empty!");

		if (index < 0 || index >= this.size() || Number.isInteger(+index))
			throw new Error("Please enter a valid index.");

		if (index === 0) {
			this.head = this.head.pointer;
			return this;
		}

		const previous = this.at(index - 1);
		previous.pointer = previous.pointer.pointer;
		return this;
	}
}
