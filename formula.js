for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur", (e) => {
            let address = addressBar.value;
            let [activeCell, cellProp] = activecell(address);
            let enteredData = activeCell.innerText;
            console.log("44", enteredData)
            console.log("44", cellProp.value)
            if (enteredData === cellProp.value) { return }
            else {

                cellProp.value = enteredData;
                console.log("56656")

                //if data modified remove P-C relation ,make formual empty ,update children with hardcoded value
                removeChildFromParent(cellProp.formula);
                cellProp.formula = "";
                updateChildrenCells(address)
            }
        })
    }
}







let formulaBar = document.querySelector(".formula-bar");

formulaBar.addEventListener("keypress", (e) => {
    let inputFormula = formulaBar.value;
    if (e.key === "Enter" && inputFormula) {

        // If old formula chnage then break old parent child relation,evaluate formula again and store new parent chils relationship 
        let address = addressBar.value;
        let [cell, cellProp] = activecell(address);
        if (inputFormula !== cellProp.formula) {
            removeChildFromParent(cellProp.formula);
        }
        addChildToGraphComponent(inputFormula, address)
        // check for cyclic dependency detection algorithm
        let isCyclic = isGraphCyclic(graphComponentMatrix);
        console.log("iscyclic", isCyclic)
        if (isCyclic === true) {
            alert("Your formula is cyclic");
            removeChildFromGraphComponent(inputFormula, address);
            return;
        }
        let evaluatedValue = evaluateFormula(inputFormula);
        // To update UI and cellProp in DB
        setCellUIAndCellProp(evaluatedValue, inputFormula, address);
        //add child to parent 
        addChildToParent(inputFormula);
        updateChildrenCells(address);
        console.log(sheetDB)
    }
})

function addChildToGraphComponent(formula, childAddress) {
    let [crid, ccid] = decodeRIDCIDFromAddress(childAddress);
    let encodedFormula = formula.split(" ");

    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [prid, pcid] = decodeRIDCIDFromAddress(encodedFormula[i]);
            graphComponentMatrix[prid][pcid].push([crid, ccid])
        }
    }
    console.log("33", graphComponentMatrix)
}

function removeChildFromGraphComponent(formula, childAddress) {

    let [crid, ccid] = decodeRIDCIDFromAddress(childAddress);
    let encodedFormula = formula.split(" ");

    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [prid, pcid] = decodeRIDCIDFromAddress(encodedFormula[i]);
            graphComponentMatrix[prid][pcid].pop();
        }
    }
}

function updateChildrenCells(parentAddress) {
    let [parentCell, parentCellProp] = activecell(parentAddress);
    let children = parentCellProp.children;

    for (let i = 0; i < children.length; i++) {
        let childAddress = children[i];

        let [childCell, childCellProp] = activecell(childAddress);
        let childFormula = childCellProp.formula;

        let evaluatedValue = evaluateFormula(childFormula);

        setCellUIAndCellProp(evaluatedValue, childFormula, childAddress);

        updateChildrenCells(childAddress);
    }
}

function addChildToParent(formula) {
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [parentCell, parentCellProp] = activecell(encodedFormula[i]);
            parentCellProp.children.push(childAddress);
        }
    }
}

function removeChildFromParent(formula) {
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [parentCell, parentCellProp] = activecell(encodedFormula[i]);
            let idx = parentCellProp.children.indexOf(childAddress);
            parentCellProp.children.splice(idx, 1);
        }
    }
}

function evaluateFormula(formula) {
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [cell, cellProp] = activecell(encodedFormula[i]);
            encodedFormula[i] = cellProp.value;
        }
    }
    let decodedFormula = encodedFormula.join(" ");
    return eval(decodedFormula);
}

function setCellUIAndCellProp(evaluatedValue, formula, address) {
    let [cell, cellProp] = activecell(address);

    cell.innerText = evaluatedValue;//UI Update
    // DB update
    cellProp.value = evaluatedValue;
    cellProp.formula = formula;
}