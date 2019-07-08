function saveFn(){
    
    let quote = document.getElementById('quoteTA').value ; 
    let author = document.getElementById('authorTA').value ; 
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
        
}

let b = document.getElementById('addButton') ; 
b.addEventListener('click', saveFn); 