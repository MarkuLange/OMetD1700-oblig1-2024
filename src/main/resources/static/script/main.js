"use strict"
/* DOM-ELEMENTS */
const buyBtn = document.getElementById("buy")
const resetBtn = document.getElementById("reset")
const billetter = document.querySelector(".billetter")
const filmValg = document.getElementById("film")
const antall = document.getElementById("antall")
const fornavn = document.getElementById("fornavn")
const etternavn = document.getElementById("etternavn")
const telefonnr = document.getElementById("telefonnr")
const epost = document.getElementById("epost")

/* REGEX INFO, AND INITIALIZERS */
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

/* MAIN CODE */
class Person {
    #fName;
    #lName;
    #eMail;
    #tlfNr;
    constructor(fName, lName, eMail, tlfNr) {
       this.#fName = fName.charAt(0).toUpperCase() + lName.slice(1).toLowerCase();
       this.#lName = lName.charAt(0).toUpperCase() + lName.slice(1).toLowerCase();
       this.#eMail = eMail.toLowerCase();
       this.#tlfNr = tlfNr;
    }

    get fullName() {
        return `${this.#fName} ${this.#lName}`
    }

    get tlfNr() {
        return this.#tlfNr;
    }

    get eMail() {
        return this.#eMail;
    }
}
const checkValid = function (input){
    const str = input.el.value;
    return !(!str || str === "placeholder" || !input.regex.test(str));
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
            movie: filmValg.value.charAt(0).toUpperCase() + filmValg.value.slice(1),
            amount: antall.value
        }
        ticketArr.push(ticket);
        showTicket(ticket);
        document.getElementById("order").reset();
    }
}

const showTicket = function (ticket) {
    console.log(ticket)
    billetter.insertAdjacentHTML("afterbegin", `<li>${ticket.movie}: [${ticket.amount}] -
${ticket.customer.fullName} | ${ticket.customer.tlfNr} | ${ticket.customer.eMail} </li>`)
}

const displayError = function (el){
    if(el.id === "film" || el.id === "antall") {
        el.insertAdjacentHTML("afterend", `<span class="error"> Vennligst velg ${el.name}</span>`);
    } else {
        el.insertAdjacentHTML("afterend", `<span class="error"> Vennligst skriv inn gyldig ${el.name}</span>`);
    }
}

/* EVENT LISTENERS */
buyBtn.addEventListener("click", function (e){
    e.preventDefault();
    buyTickets();
})
resetBtn.addEventListener("click", function (){
    document.getElementById("order").reset();
    ticketArr.length = 0;
    billetter.innerHTML="";
})