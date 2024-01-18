// storage ---> 2D matrix

let graphComponentMatrix = [];

for (let i = 0; i < rows; i++) {
    let rows = [];
    for (let j = 0; j < columns; j++) {
        // why array more than 1 child relation dependency
        rows.push([]);

    }
    graphComponentMatrix.push(rows);
}

console.log(graphComponentMatrix)
// check for cyclic dependency detection algorithm
function isGraphCyclic(graphComponentMatrix) {
    // Dependency --> visited,dfsvisited (2D aaray)
    let visited = [];
    let dfsvisited = [];

    for (let i = 0; i < rows; i++) {
        let visitedRow = [];
        let dfsvisitedRow = [];
        for (let j = 0; j < columns; j++) {
            visitedRow.push(false);
            dfsvisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsvisited.push(dfsvisitedRow);
    }

    console.log(visited);
    console.log(dfsvisited)
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (visited[i][j] === false) {
                let response = dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsvisited);
                // found cycle so return immediaely , no need to explore more path
                if (response === true) return true;
            }
        }
    }
    return false;
}

//start -> visited(true) dfsvisted(true)
//End ->dfsVis (false)
//if vis[i][j]->already explored path ,so go back no use to explore again
//Cycle detection condition ->if(vis[i][j] == true && dfsVis[i][j]==true)-> cycle

function dfsCycleDetection(graphComponentMatrix, srcr, srcc, visited, dfsvisited) {
    visited[srcr][srcc] = true;
    dfsvisited[srcr][srcc] = true;

    //A1 -> [[0,1],[1,2],......]
    for (let children = 0; children < graphComponentMatrix[srcr][srcc].length; children++) {
        let [crid, ccid] = graphComponentMatrix[srcr][srcc][children];
        if (visited[crid][ccid] === false) {
            let response = dfsCycleDetection(graphComponentMatrix, crid, ccid, visited, dfsvisited)
            // found cycle so return immediaely , no need to explore more path
            if (response === true) return true;
        }
        else if (visited[crid][ccid] === true && dfsvisited[crid][ccid] === true) {
            // found cycle so return immediaely , no need to explore more path
            return true;
        }
    }
    dfsvisited[srcr][srcc] = false;
    return false;
}