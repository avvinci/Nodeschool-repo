const { ipcRenderer } = require("electron");

function getElem(id) {
  return document.getElementById(id);
}

let quoteTA = getElem("quoteTA");
let authorTA = getElem("authorTA");
let mainAddButton = getElem("addButton");
mainAddButton.addEventListener("click", saveFn);

// window.onload = function() {
//   document.getElementById("loading").style.display = "none";
// };

function saveFn() {
  let inputData = {
    author: authorTA.value,
    quote: quoteTA.value
  };
  console.log(inputData);
  ipcRenderer.send("inputData", inputData);
  authorTA.value = "";
  quoteTA.value = "";
}
