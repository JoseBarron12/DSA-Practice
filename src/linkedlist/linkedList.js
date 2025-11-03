import { Node } from "./node.js";

export class LinkedList {
    constructor()
    {
        this._head = null;
        this._size = 0;
        this._tail = null;
    }

    get size() {
        return this._size;
    }

    set size(newSize) {
        this._size = newSize;
    }

    get head() {
        return this._head;
    }

    set head(newHead) {
        this._head =  newHead;
    }

    get tail() {
        return this._tail;
    }

    set tail(newTail) {
        this._tail = newTail;
    }

    pop() {
        if(this.size == 0) return;
        
        let tempNode = this.head;

        for(let i = 0; i != this.size - 1; i++) // get to second to last node.
        {
            tempNode = tempNode.next;
        }
        tempNode.next = null;
        this.tail = tempNode;
        this.size = this.size - 1;
        return;
    }

    append(value) {
        if(this._head == null)
        {
            this._head = new Node(value, null);
            this.size = this.size + 1;
            return;
        }
            
        let tempNode = this.head;

        while(tempNode.next != null) // get to end of list
        {
            tempNode = tempNode.next;
        }

        let newNode = new Node(value, null);

        tempNode.next = newNode;
        this.tail = newNode
        this.size = this.size + 1;
        return;
    }

    prepend(value) {
        if(this._head == null)
        {
            this._head = new Node(value, null);
            this.size = this.size + 1;
            return;
        }
        let tempNode = this.head;
        let newNode = new Node(value, tempNode);
        this.head = newNode;
        this.size = this.size + 1;
        return;
    }

    toString() {
        let tempNode = this.head;
        let string = "";

        for(let i = 0; i != this.size ; i++)
        {
            string += `( ${tempNode.value} ) -> `;
            tempNode = tempNode.next;
        }
        return string += " null";
    }

    contains(value) {
        let tempNode = this.head;

        for(let i = 0; i != this.size ; i++)
        {
            if(tempNode.value == value)
            {
                return true;
            }
            tempNode = tempNode.next;
        }
        return false;
    }

    find(value) {
        let tempNode = this.head;

        for(let i = 0; i != this.size ; i++)
        {
            if(tempNode.value == value)
            {
                return i;
            }
            tempNode = tempNode.next;
        }
        return null;
    }

    insertAt(value, index) {
        if(this._head == null) {
            this._head = new Node(value, null);
            return;
        }

        if(index >= this.size) 
        {
            return;
        }
        else if(index == 0)
        {
            this.prepend(value);
            return;
        }

        let tempNode = this.head;

        for(let i = 0; i != index - 1 ; i++) // get the node before desired index
        {
            tempNode = tempNode.next;
        }

        let nextNode = tempNode.next; // node at desired index
        let newNode = new Node(value,nextNode); // New Node points to node at desired index

        tempNode.next = newNode; // Point previous node to new Node.


        this.size = this.size + 1;
        return;
    }

    removeAt(index) {
        if(index >= this.size) 
        {
            return;
        }
        else if(index == 0) // start of list
        {
            let tempNode = this.head;
            this.head = tempNode.next;
            this.size = this.size - 1;
            return;
        }
        else if(index == this.size - 1) // end of list
        {
            this.pop();
            return;
        }

        let tempNode = this.head;

        for(let i = 0; i != index - 1 ; i++) // get the node before desired index
        {
            tempNode = tempNode.next;
        }

        let desiredNode = tempNode.next; // node at desired index
        let nextNode = desiredNode.next; // node that is pointed by desired node

        tempNode.next = nextNode; // point previous node to node that is pointed by desired node
        
        this.size = this.size - 1;
        return;

    }
}



