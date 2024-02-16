"use strict"
const buyBtn = document.getElementById("buy")
const resetBtn = document.getElementById("reset")
const billetter = document.querySelector(".billetter")
const filmValg = document.getElementById("film")
const antall = document.getElementById("antall")
const fornavn = document.getElementById("fornavn")
const etternavn = document.getElementById("etternavn")
const telefonnr = document.getElementById("telefonnr")
const epost = document.getElementById("epost")

const info = [
    {el: filmValg, regex: /^[\w-]+$/},
    {el: antall, regex: /^[0-9]{1,2}$/},
    {el: fornavn, regex: /^[a-zA-ZøæåØÆÅ]+$/},
    {el: etternavn, regex: /^[a-zA-ZæøåÆØÅ]+$/},
    {el: telefonnr, regex: /^[0-9]{8}$/},
    {el: epost, regex: /^[\w-.]+@[\w-]+\.+[\w-]{2,4}$/}
]
const ticketArr = [];
let valid = true;

class Person {
    #fName;
    #lName;
    #eMail;
    #tlfNr;
    constructor(fName, lName, eMail, tlfNr) {
       this.#fName = fName;
       this.#lName = lName;
       this.#eMail = eMail;
       this.#tlfNr = tlfNr;
    }
}
const checkValid = function (input){
    const str = input.el.value;
    if (!str || str==="placeholder" || !input.regex.test(str)) {
        return false
    }
    else {
        return true
    }
}

const buyTickets = function () {
    valid = true;
    document.querySelectorAll(".error").forEach(e => e.remove());

    for(let i of info){
        if (!checkValid(i)){
            valid = false;
            displayError(i.el)
        }
    }
    if(valid) {
        const ticket = {
            customer: new Person(fornavn.value, etternavn.value, epost.value, telefonnr.value),
            movie: filmValg.value,
            amount: antall.value
        }
        ticketArr.push(ticket)
        billetter.insertAdjacentHTML("afterbegin", `<li>${ticket.movie}: [${ticket.amount}]</li>`)
        document.getElementById("order").reset();
    }
}

const displayError = function (el){
    el.insertAdjacentHTML("afterend", `<span class="error"> Vennligst skriv inn gyldig ${el.name}</span>`);
}

buyBtn.addEventListener("click", function (e){
    e.preventDefault();
    buyTickets();
})
resetBtn.addEventListener("click", function (){
    ticketArr.length = 0;
    billetter.innerHTML="";
})