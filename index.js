const { ipcRenderer } = require("electron");

function getElem(id) {
  return document.getElementById(id);
}

let quoteTA = getElem("quoteTA");
let authorTA = getElem("authorTA");
let addBox = getElem("addBox");
let viewButton = getElem("viewButton");
let mainAddButton = getElem("addButton");
mainAddButton.addEventListener("click", saveFn);

if (viewButton) viewButton.addEventListener("click", viewFn);

window.onload = function() {
  document.getElementById("loading").style.display = "none";
};

function createViewBox() {
  let box = document.createElement("div");
  box.setAttribute("id", "viewBox");
  box.setAttribute("class", "list-group");
  let addButton = document.createElement("Button");
  addButton.innerHTML = "Submit New Quote";
  addButton.setAttribute("class", "btn btn-success btn-block mb-5 mt-5");
  addButton.style.width = "60%";
  addButton.style.marginLeft = "20%";

  box.appendChild(addButton);
  addButton.onclick = () => {
    addBox.style.display = "block";
    getElem("viewBox").remove();
  };

  return box;
}

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

function viewFn() {
  addBox.style.display = "none";
  let box = createViewBox();
  ipcRenderer.send("needViewData", null);

  ipcRenderer.on("viewData", (event, jsonObj) => {
    jsonObj.forEach(elem => {
      var newlabel = document.createElement("Label");
      newlabel.innerHTML = elem.QUOTE;
      newlabel.style.width = "80%";
      newlabel.style.marginLeft = "10%";

      newlabel.setAttribute("class", "list-group-item");
      box.appendChild(newlabel);
    });
  });
  let bxc = getElem("boxContainer");
  bxc.appendChild(box);
}
