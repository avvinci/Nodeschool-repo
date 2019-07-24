let viewButton = getElem("viewButton");
if (viewButton) viewButton.addEventListener("click", viewFn);
let addBox = getElem("addBox");

function createViewBox() {
  let box = document.createElement("div");
  box.setAttribute("id", "viewBox");
  box.setAttribute("class", "list-group");
  let addButton = document.createElement("Button");
  addButton.innerHTML = "Submit New Quote";
  addButton.setAttribute(
    "class",
    "btn btn-outline-success btn-block mb-5 mt-5"
  );
  addButton.style.width = "60%";
  addButton.style.marginLeft = "20%";

  box.appendChild(addButton);
  addButton.onclick = () => {
    addBox.style.display = "block";
    getElem("viewBox").remove();
  };

  return box;
}

function viewFn() {
  addBox.style.display = "none";
  let box = createViewBox();
  ipcRenderer.send("needViewData", null);

  ipcRenderer.on("viewData", (event, jsonObj) => {
    jsonObj.forEach(elem => {
      var newlabel = document.createElement("Label");
      // newlabel.className = "listElem";
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
