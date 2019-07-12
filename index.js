let quoteTA = document.getElementById("quoteTA");
let authorTA = document.getElementById("authorTA");
let addBox = document.getElementById("addBox");
let viewButton = document.getElementById("viewButton");
if (viewButton) viewButton.addEventListener("click", viewFn);
let mainAddButton = document.getElementById("addButton");
mainAddButton.addEventListener("click", saveFn);

const csvFilePath = "./quotes.csv";

function createViewBox() {
  let box = document.createElement("div");
  box.setAttribute("id", "viewBox");
  box.setAttribute("class", "list-group");
  let addButton = document.createElement("Button");
  addButton.innerHTML = "Add Quote";
  addButton.setAttribute("class", "btn btn-success btn-block mb-5 mt-5");
  box.appendChild(addButton);
  addButton.onclick = () => {
    addBox.style.display = "block";
    document.getElementById("viewBox").remove();
  };

  return box;
}

function saveFn() {
  let quote = quoteTA.value;
  let author = authorTA.value;
  console.log(quote);
  console.log(author);
  const records = [{ quote, author }];
  const createCsvWriter = require("csv-writer").createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: "quotes.csv",
    header: [
      { id: "quote", title: "QUOTE" },
      { id: "author", title: "AUTHOR" }
    ],
    append: true
  });
  csvWriter
    .writeRecords(records) // returns a promise
    .then(() => {
      console.log("...Done");
    });

  authorTA.value = "";
  quoteTA.value = "";
}

function viewFn() {
  addBox.style.display = "none";
  let box = createViewBox();
  const csv = require("csvtojson");
  csv()
    .fromFile(csvFilePath)
    .then(jsonObj => {
      console.log(jsonObj);
      jsonObj.forEach(elem => {
        var newlabel = document.createElement("Label");
        newlabel.innerHTML = elem.QUOTE;
        newlabel.setAttribute("class", "list-group-item");
        box.appendChild(newlabel);
      });
    });
  let bxc = document.getElementById("boxContainer");
  bxc.appendChild(box);
}
