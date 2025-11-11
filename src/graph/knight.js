const validMove = (x, y) => {
    return (x >= 0 && x < 8) && (y >= 0 && y < 8);
}

const sameMove = (startMove, endMove) => {
    return startMove[0] == endMove[0] && startMove[1] == endMove[1];
}

// Return arr of possible moves [Max of 8]
const getPossibleKnightMoves = (x, y) => {
    let arr = [];
    
    // Case 1: Up Move
    if(validMove(x, y + 2))
    {
        // Case 1.1: Up Move + left
        if(validMove(x - 1, y + 2))
        {
            arr.push([x - 1, y + 2]);
        }
        // Case 1.2: Up Move + right
        if(validMove(x + 1, y + 2))
        {
            arr.push([x + 1, y + 2]);
        }
    }

    // Case 2: Down Move
    if(validMove(x, y - 2))
    {
        // Case 2.1: Down Move + left
        if(validMove(x - 1, y - 2))
        {
            arr.push([x - 1, y - 2]);
        }
        // Case 2.2: Down Move + right
        if(validMove(x + 1, y - 2))
        {
            arr.push([x + 1, y - 2]);
        }
    }

    // Case 3: Left Move
    if(validMove(x - 2, y))
    {
        // Case 3.1: Left Move + up
        if(validMove(x - 2, y + 1))
        {
            arr.push([x - 2, y + 1]);
        }
        // Case 3.2: Left Move + down
        if(validMove(x - 2, y - 1))
        {
            arr.push([x - 2, y - 1]);
        }
    }

    // Case 4: Right Move
    if(validMove(x + 2, y))
    {
        // Case 4.1: Right Move + up
        if(validMove(x + 2, y + 1))
        {
            arr.push([x + 2, y + 1]);
        }
        // Case 4.2: Right Move + down
        if(validMove(x + 2, y - 1))
        {
            arr.push([x + 2, y - 1]);
        }
    }

    return arr;
}

// Position class to keep track of moves
class Position {
    constructor(x, y, moves , previousMove)
    {
        this._x = x
        this._y = y
        this._moves = moves;
        this._previous = previousMove;
    }

    get x() {return this._x};
    set x(newX) { this._x = newX; }

    get y() {return this._y};
    set y(newY) { this._y = newY; }

    get moves() {return this._moves}
    set moves(newMoves) {this._moves = newMoves}

    get previous() { return this._previous}
    set previous(newPosition) { this._previous = newPosition}


}


const knightMoves = (startMove, endMove) => {

    // Breadth-First Search used for keeping track of next positions
    let queue = [];

    // Adjacency List for visited positions
    let board = new Array(8);
    for(let i  = 0; i < board.length ; i++ )
    {
        board[i] = new Array(8).fill(false); // Initialized board w/ false visited flag
    }

    const startPos = new Position(startMove[0], startMove[1], 0, null)

    let possibleMoves = getPossibleKnightMoves(startPos.x, startPos.y);

    for(let i = 0; i < possibleMoves.length; i++)
    {
        queue.push(new Position(possibleMoves[i][0], possibleMoves[i][1], 0, startPos));
    }

    while(queue.length > 0)
    {
        let nextMove = queue.shift(); 

        if(board[nextMove.x][nextMove.y] == true) continue; // Ensures node is dequeued without looking for further paths

        board[nextMove.x][nextMove.y] = true; // Visited Node
        
        nextMove.moves = nextMove.moves + 1;
        
        if(nextMove.x == endMove[0] && nextMove.y == endMove[1]) // Reached Node
        {
            
            console.log(`=> You made it in ${nextMove.moves}! Here's your path:`)
            
            let temp = nextMove;
            let path = []; // Stack to display from start to end of path
            while(temp != null)
            {
                path.push(temp);
                temp = temp.previous;
            }

            while(path.length > 0)
            {
                temp = path.pop();
                console.log(`[${temp.x}, ${temp.y}]`);
            }

            return;
        }

        possibleMoves = getPossibleKnightMoves(nextMove.x, nextMove.y);

        for(let i = 0; i < possibleMoves.length; i++)
        {
            queue.push(new Position(possibleMoves[i][0], possibleMoves[i][1], nextMove.moves, nextMove));
        }

    }

}

knightMoves([0,0], [3,3]);

knightMoves([3,3], [4,3]);
