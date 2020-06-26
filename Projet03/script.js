console.log('ok')
function number_aleatoire(min, max)

{
let nb = min + (max-min+1)*Math.random();
return Math.floor(nb);
}

let number = number_aleatoire(1, 100);
let tentative = document.querySelector('#tentative')
let message = document.querySelector('#message')
let envoyer = document.querySelector('#send')
// console.log="nombre aleatoire";
// alert("vous lancez un dé " + number);

let cpt=0;

envoyer.addEventListener ('click', comparer)

//vérification regex

//vérification de compa
function comparer (){
if (cpt < 5){
if ( tentative.value > number){
message.innerText='Trop haut'
tentative.value=""
tentative.focus
cpt ++
}else if ( tentative.value < number){
message.innerText='Trop bas'
tentative.value=""
tentative.focus
cpt = cpt + 1
}else{
message.innerText='Gagné'
}
}else{
message.innerText='game over'
alert("Perdu");
}
}
