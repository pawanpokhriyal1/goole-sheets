//cell storage

let sheetDB = [];

for (let i = 0; i < rows; i++) {
    let sheetRow = [];
    for (let j = 0; j < columns; j++) {
        let cellProp = {
            bold: false,
            italic: false,
            underline: false,
            alignment: "left",
            fontFamily: "monospace",
            fontSize: "12",
            fontColor: "#000000",
            BGcolor: "rgb(0 0 0 / 0%)",//just for indication purpose default is set to black
            value: "",
            formula: "",
            children: [],

        }
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}

// Selectors for cell properties

let bold = document.querySelector(".bold")
let italic = document.querySelector(".italic")
let underline = document.querySelector(".underline")
let fontSize = document.querySelector(".font-size-prop")
let fontFamily = document.querySelector(".font-family-prop")
let fontColor = document.querySelector(".font-color-prop")
let BGcolor = document.querySelector(".BGcolor-prop")
let alignment = document.querySelectorAll(".alignment")
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];
let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";

// let addressBar = document.querySelector(".address-bar")
// Application of two away binding
// Attach property listeners

bold.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);

    //property modification
    cellProp.bold = !cellProp.bold;
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
})


italic.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);

    //property modification
    cellProp.italic = !cellProp.italic;
    cell.style.fontFamily = cellProp.italic ? "italic" : "regular";
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
})


underline.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);

    //property modification
    cellProp.underline = !cellProp.underline;
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
})

fontSize.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);

    //property modification
    cellProp.fontSize = fontSize.value;
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;
})

fontFamily.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);
    console.log("object33", cellProp)
    //property modification
    cellProp.fontFamily = fontFamily.value;
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
})


fontColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);

    //property modification
    cellProp.fontColor = fontColor.value;
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
})

BGcolor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);

    //property modification
    cellProp.BGcolor = BGcolor.value;
    cell.style.backgroundColor = cellProp.BGcolor;
    BGcolor.value = cellProp.BGcolor;
})



alignment.forEach((alignElement) => {
    alignElement.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [cell, cellProp] = activecell(address);

        //property modification
        let alignValue = e.target.classList[0];
        cellProp.alignment = alignValue;
        cell.style.textAlign = alignValue;

        switch (alignValue) {
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;

                break;
            case "center":
                centerAlign.style.backgroundColor = activeColorProp;
                leftAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;

                break;
            case "right":
                rightAlign.style.backgroundColor = activeColorProp;
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                break;

        }

    })
})


let allCells = document.querySelectorAll(".cell");

for (i = 0; i < allCells.length; i++) {
    addListenerToAttachCellProperties(allCells[i]);
}


function addListenerToAttachCellProperties(cell) {
    //work

    cell.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [rid, cid] = decodeRIDCIDFromAddress(address);
        let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
        let cellProp = sheetDB[rid][cid];
        // activecell

        // Apply cell pproperties
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.fontFamily = cellProp.italic ? "italic" : "regular";
        cell.style.textDecoration = cellProp.underline ? "underline" : "none";
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.BGcolor;
        cell.style.textAlign = cellProp.alignment;

        switch (cellProp.alignment) {
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;

                break;
            case "center":
                centerAlign.style.backgroundColor = activeColorProp;
                leftAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;

                break;
            case "right":
                rightAlign.style.backgroundColor = activeColorProp;
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                break;

        }
        console.log("object", cellProp)
        //apply properties to UI prop container 
        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
        fontSize.value = cellProp.fontSize;
        fontFamily.value = cellProp.fontFamily;
        fontColor.value = cellProp.fontColor;
        BGcolor.value = cellProp.BGcolor;

        let formulaBar = document.querySelector(".formula-bar");
        formulaBar.value = cellProp.formula;
        cell.value = cellProp.value;

    })

}


function activecell(address) {
    let [rid, cid] = decodeRIDCIDFromAddress(address);
    // Access cell & storage object
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    return [cell, cellProp];

}

function decodeRIDCIDFromAddress(address) {
    // address => "A1"
    let rid = Number(address.slice(1) - 1);
    let cid = Number(address.charCodeAt(0) - 65)
    return [rid, cid];
}
function fontSelector(e) {
    fontFamily.value = e.target.value;
}