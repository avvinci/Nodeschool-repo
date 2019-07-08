function saveFn(){
    
    let q = document.getElementById('quoteTA') ; 
    let a = document.getElementById('authorTA') ; 
    console.log(q.value); 
    let content  = q.value
    console.log(a); 
    var fs = require('fs');
    try { fs.writeFileSync('myfile.txt', content, 'utf-8'); }
    catch(e) { alert('Failed to save the file !'); }

    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
        path: 'quotes.csv',
        header: [
            {id: 'quote', title: 'QUOTE'},
            {id: 'author', title: 'AUTHOR'}
        ]
    });
    
    const records = [
        {quote: 'A journey begins',  author: 'avvinci'},
        {quote: 'Perfect is the enemy of good',  author: 'Anne'},

    ];
    
    csvWriter.writeRecords(records)       // returns a promise
        .then(() => {
            console.log('...Done');
        });
        


}

let b = document.getElementById('addButton') ; 

b.addEventListener('click', saveFn); 