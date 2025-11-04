import { LinkedList } from "../linkedlist/linkedList.js";

class HashNode {
    constructor(key, value)
    {
        this._key= key;
        this._value = value;
    }

    get value() {
        return this._value
    }
    
    set value(newValue) {
        this._value = newValue;
    }

    get key() {
        return this._key;
    }
    
    set key(newKey) {
        this._key = newKey;
    }
}

export class HashMap {
    constructor()
    {
        this._capacity = 16;
        this._loadFactor = 0.75;
        this._buckets = new Array(16).fill(null);
        this._filledBuckets = 0;
    }

    get capacity() {
        return this._capacity;
    }

    set capacity(newCapacity) {
        this._capacity = newCapacity;
    }

    get buckets() {
        return this._buckets;
    }

    set buckets(newBuckets) {
        this._buckets = newBuckets;
    }

    get filledBuckets() {
        return this._filledBuckets;
    }

    set filledBuckets(newNum) {
        this._filledBuckets = newNum;
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for(let i = 0; i < key.length; i++)
        {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % this.capacity; // ensures hashcode is a valid index
        }
        
        return hashCode;
    }

    set(key,value) {
        const index = this.hash(key); 
        
        if(index < 0 || index >= this._buckets.length)
        {
            throw new error("Trying to access index out of bounds");
        }

        if(this.buckets[index] == null) // Index of HashMap is empty
        {
            this.buckets[index] = new LinkedList();
            this.buckets[index].append(new HashNode(key, value));
            this.filledBuckets = this.filledBuckets + 1;
        }
        else // Linked list already exists
        {
            if( !this.buckets[index].updateKey(key, value)) // Same index but different key
            {
                this.buckets[index].append(new HashNode(key, value));
                this.filledBuckets = this.filledBuckets + 1;
            }
        }
        
        this.resize(); // Check to see if buckets need to grow
        return;
    }
    
    has(key) {
        const index = this.hash(key);  
        if(index < 0 || index >= this._buckets.length)
        {
            throw new error("Trying to access index out of bounds");
        }
        else if(this.buckets[index] == null) // Empty bucket, key doesnt exist
        {
            return false;
        }

        return this.buckets[index].hasKey(key);
    }

    get(key) {
        if(!this.has(key))
        {
            return null;
        }

        const index = this.hash(key); 
        return this._buckets[index].getValueFromKey(key);  
    }

    remove(key) {
        if(!this.has(key))
        {
            return false;
        }
        
        const index = this.hash(key);
        this._buckets[index].removeAt(this._buckets[index].getIndexOfKey(key));
        
        this.filledBuckets = this.filledBuckets - 1;

        return true;
    }

    length() {
        return this.filledBuckets;
    }

    clear() {
        this._buckets = new Array(this.capacity).fill(null);
        this.filledBuckets = 0;
        return;
    }

    keys() {
        let tempArr = [];
        for(let i = 0; i < this.buckets.length; i++)
        {
            const bucket = this.buckets[i];
            if(bucket !== null) // Linked List exists in bucket
            {
                tempArr.push(...bucket.getKeyEntries());
            }
        }
        return tempArr;
    }

    values() {
        let tempArr = [];
        for(let i = 0; i < this.buckets.length; i++)
        {
            const bucket = this.buckets[i];
            if(bucket !== null) // Linked List exists in bucket
            {
                tempArr.push(...bucket.getValueEntries());
            }
        }
        return tempArr;
    }

    entries() {
        let tempArr = [];
        for(let i = 0; i < this.buckets.length; i++)
        {
            const bucket = this.buckets[i];
            if(bucket !== null) // Linked List exists in bucket
            {
                const nodes = bucket.getEntries();
                for(const node of nodes)
                {
                    const entry = [node.key, node.value];
                    tempArr.push(entry);
                }
            }
        }
        return tempArr;
    }

    resize() {
        if(this.capacity * this._loadFactor < this.filledBuckets) // Check to avoid collisions
        {
            let currentEntries = this.entries(); // Save all current entries

            this.capacity = this.capacity * 2; // Double capacity 
            this.clear(); // Clear all entries within hashmap, ready to rehash
            
            for(const entry of currentEntries) // Rehashing all elements 
            {
                this.set(entry[0], entry[1]);
            }
        }
        return;
    }

}