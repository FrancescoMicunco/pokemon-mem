import './homepage.css'
import { useState, useEffect } from 'react'





// sul click, mostro la carta e la aggiungo all'array delle carte girate,

// attendo che nell'array ci siano due elementi, quindi controllo che siano  DONE
// differenti o uguali. Nel primo caso attendo 3 secondi e poi giro nuovamente le carte;
// nel secondo caso le lascio scoperte e trasferisco il contenuto dell'array nell'array delle carte trovate
// aggiorno il contatore dei punti

let okCards = []
let i = []
let n = []

const GameTable = (card, { setScore, score }) => {
    const [isActive, setIsActive] = useState(false)


    let str = card.card.url

    //  estraggo il numero del singolo pokemon dall'url di base per recuperare l'url dello sprite
    let substr = str.substr(-3).split('').slice(0, 2).filter(filter).reduce((i, c) => i + c)

    function filter(e) {
        return e !== "/";
    }

    const spriteUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"

    const isShow = () => {
        let isShow = true
        return
    }

    const isUnShow = () => {
        let isShow = false
        return
    }

    const addCard = (e) => {
        e.preventDefault()
        let iPokemon = e.target.lastChild.innerText //index del pokemon

        let name = e.target.innerText //name del pokemon

        // "n" è l'array dei nomi e "i" è l'array degli indici
        setIsActive(true)
        if (n.length !== 0) {
            if (i[0] === i[1]) {
                alert("hai selezionato la stessa carta")
                return
            } else {
                i.push(iPokemon)

                n.push(name)
            }
        } else {
            i.push(iPokemon)

            n.push(name)
        }

        if (i.length == 2) {
            if ((i[0] !== i[1]) && (n[0] === n[1])) {

                alert(`indovinato`);
                setScore([score += 1])
                console.log("this is the score", score)
                let tempArr = i.slice();

                okCards = [...okCards, tempArr]
                i = [];
                n = [];

                if (okCards.length == 4) {
                    alert("complimenti hai VINTO!")
                }
            } else {
                alert(`allenati di più`);
                i = [];
                n = [];

            }
            setIsActive(false)
        }
    }


    return (
        isActive ? <div className='card'>
            <img variant="top"
                src={`${spriteUrl}${substr}.png`}
                alt={card.card.name}
            />
            <h5 onClick={(e) => addCard(e)}> {card.card.name}
                <span style={{ display: "none" }}>{card.i}</span></h5>

        </div>
            :

            <div className='card'>
                <img variant="top"
                    src={`${spriteUrl}${substr}.png`}
                    alt={card.card.name}
                    style={{ opacity: "0.0" }}
                />
                <h5 onClick={(e) => addCard(e)} style={{ opacity: "0.0" }}> {card.card.name}
                    <span style={{ display: "none" }}>{card.i}</span></h5>

            </div>


    )
}
export default GameTable

