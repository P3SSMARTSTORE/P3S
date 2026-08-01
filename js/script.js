// P3S Store JavaScript
// ===== Product Search =====

const searchInput = document.getElementById("searchInput");

if(searchInput){

searchInput.addEventListener("keyup",function(){

let value=this.value.toLowerCase();

let products=document.querySelectorAll(".product-card");

products.forEach(function(card){

let text=card.innerText.toLowerCase();

if(text.includes(value)){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

}
