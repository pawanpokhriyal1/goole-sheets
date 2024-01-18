let addressRowCont = document.querySelector(".address-row-cont")
let cellsCont = document.querySelector(".cells-cont")
let addressColCont = document.querySelector(".address-col-cont")
let addressBar = document.querySelector(".address-bar");
let rows = 100;
let columns = 26;


for (i = 0; i < rows; i++) {
    let addressCol = document.createElement("div");
    addressCol.setAttribute("class", "address-col");
    addressCol.innerText = i + 1;
    addressColCont.appendChild(addressCol);

}


for (i = 0; i < columns; i++) {
    let addressRow = document.createElement("div");
    addressRow.setAttribute("class", "address-row");
    addressRow.innerText = String.fromCharCode(65 + i);
    addressRowCont.appendChild(addressRow);

}


for (i = 0; i < rows; i++) {
    let rowcont = document.createElement("div");
    rowcont.setAttribute("class", "row")
    for (j = 0; j < columns; j++) {
        let cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("contenteditable", true);
        cell.setAttribute("spellcheck", "false")
        //A ttribute for cell and storage identification 
        cell.setAttribute("rid", i);
        cell.setAttribute("cid", j);
        addEventListenerForAddressBar(cell, i, j)
        rowcont.appendChild(cell)

    }
    cellsCont.appendChild(rowcont)

}

function addEventListenerForAddressBar(cell, i, j) {
    cell.addEventListener("click", () => {
        let rowId = i + 1;
        let colId = String.fromCharCode(65 + j);
        addressBar.value = `${colId}${rowId}`;
    })
}

//By default click on first cell

let firstcell = document.querySelector(".cell");
firstcell.click();