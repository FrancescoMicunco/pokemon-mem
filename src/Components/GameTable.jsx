import './homepage.css'
import { useState, useEffect } from 'react'


let cardsToCheck = []
let checkeCdCards = []


// sul click, mostro la carta e la aggiungo all'arrai delle carte girate,

// attendo che nell'array ci siano due elementi, quindi controllo che siano  DONE
// differenti o uguali. Nel primo caso attendo 3 secondi e poi giro nuovamente le carte; 
// nel secondo caso le lascio scoperte e trasferisco il contenuto dell'array nell'array delle carte trovate
// aggiorno il contatore dei punti







const GameTable = ({ card }) => {
    const [score, setScore] = useState(null)
    const [isOk, setIsOk] = useState(false)


    let str = card.url

    //  estraggo il numero del singolo pokemon dall'url di base per recuperare l'url dello sprite
    let substr = str.substr(-3).split('').slice(0, 2).filter(filter).reduce((i, c) => i + c)

    function filter(e) {
        return e !== "/";
    }

    const spriteUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"

    const checkGame = (e) => {
        console.log("value", e.target.innerText)
        console.log("cardsTocheck", cardsToCheck)
        //  aggiungo la carta selezionata all'array di controllo
        cardsToCheck?.push(e.target.innerText)

        //  verifico che le due carte siano state selezionate e poi eseguo il controllo tra loro
        // if (cardsToCheck.length < 2) {
        //     (alert("scegli un'altra carta"))

        // } else
        if (cardsToCheck.length === 2) {
            // let add = cardsToCheck.slice()   variabile utile a creare l'array
            if (cardsToCheck[0] === cardsToCheck[1]) {

                alert('bravo hai indovinato!')
                if (checkeCdCards.length < card.length) {

                    checkeCdCards = [...checkeCdCards, add]
                    console.log("carte indovinate", checkeCdCards)

                    cardsToCheck = []
                    console.log("dopo il gioco", cardsToCheck)

                } else {
                    alert("complimenti! Hai completato il gioco")
                    checkeCdCards = []
                    console.log("carte indovinate", checkeCdCards)
                }
            } else {
                alert("allenati ancora!");

                cardsToCheck = []
                console.log("dopo il gioco", cardsToCheck)
            }
        }
    }


    return (

        <div className='card'>
            <img variant="top"
                src={`${spriteUrl}${substr}.png`}
                alt={card.name}
            />

            <h5 value={card.name} onClick={(e) => checkGame(e)}> {card.name} </h5>

        </div>

    )

}
export default GameTable

