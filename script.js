const joinBtn=document.getElementById("joinBtn");

joinBtn.addEventListener("click",function(){
alert("Welcome to SurConnect!");
});

const search=document.getElementById("search");
const cards=document.querySelectorAll(".card");

search.addEventListener("keyup",function(){

const value=search.value.toLowerCase();

cards.forEach(function(card){

if(card.innerText.toLowerCase().includes(value)){
card.style.display="block";
}else{
card.style.display="none";
}

});

});
