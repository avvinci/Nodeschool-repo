function saveFn(){
    let quoteTA =  document.getElementById('quoteTA') ; 
    let authorTA =  document.getElementById('authorTA') ; 
    let quote = quoteTA.value ; 
    let author = authorTA.value ;

    console.log(quote); 
    console.log(author); 

    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
        path: 'quotes.csv',
        header: [
            {id: 'quote', title: 'QUOTE'},
            {id: 'author', title: 'AUTHOR'}
        ],
        append: true
    });
    
    const records = [ {quote, author} ];
    
    csvWriter.writeRecords(records)       // returns a promise
        .then(() => {
            console.log('...Done');
        });
    
    authorTA.value = '' ;
    markDone() ; 
    quoteTA.value = '' ;
}

function markDone(){
    const notifier = require('node-notifier');
    // String
    notifier.notify('Quotes Added');
}

function viewFn(){
    let addBox = document.getElementById('addBox');
    addBox.style.display = 'none';  
    let box = document.createElement('div');
    box.setAttribute('id' , 'viewBox') ; 
    box.setAttribute('class', 'list-group') ;

    const csvFilePath='./quotes.csv'
    const csv=require('csvtojson')
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
        console.log(jsonObj);
        jsonObj.forEach( elem => {
            var newlabel = document.createElement("Label");
            newlabel.innerHTML =elem.QUOTE;
            newlabel.setAttribute('class', 'list-group-item') ;
            box.appendChild(newlabel);
        })
    
    })
    let addButton = document.createElement("Button");
    addButton.innerHTML = "Add Quote" ; 
    addButton.setAttribute('class' , 'btn btn-success btn-block mb-5 mt-5')
    addButton.onclick =  () =>{
        addBox.style.display = 'block';  
        document.getElementById("viewBox").remove();
    } 
    box.appendChild(addButton) ;
    
    let bxc = document.getElementById('boxContainer');
    bxc.appendChild(box) ; 
 
}

let addButton = document.getElementById('addButton') ; 
addButton.addEventListener('click', saveFn); 

let viewButton = document.getElementById('viewButton') ; 
viewButton.addEventListener('click', viewFn); 
