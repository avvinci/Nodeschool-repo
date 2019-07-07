function saveFn(){
    
let q = document.getElementById('quoteTA') ; 
let a = document.getElementById('authorTA') ; 
console.log(q.innerHTML); 
console.log(a.innerHTML); 


}



let b = document.getElementById('addButton') ; 

b.addEventListener('click', saveFn); 