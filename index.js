// let picture = require('cat-picture')
// let image = require('lightning-image-poly')
let remote = require('electron').remote
let fs = require('fs')
// let src = picture.src
// picture.remove()
// let viz = new image('#visualization', null , [src], {hullAlgorithm: 'convex'})

function save(){
    remote.getCurrentWebContents().printToPDF({
        potrait: true
    }, function (err, data){
        fs.writeFile('annotation.pdf', data, function(err){
            if(err) alert('error generating pdf! ' + err.message)
            else alert('pdf saved!')
        })
    })
}

window.addEventListener('keydown', function(e){
    if(e.keyCode == 80 ) save() 
})