import { Form, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import GameTable from './GameTable'
import './homepage.css'



const HomePage = () => {
    const [level, setLevel] = useState(undefined)  // Select the difficult level
    const [pokemon, setPokemon] = useState([])  // first 80 pokemon from API
    const [cardsSelected, setCardsSelected] = useState([])  //extract random cards from pokemon array. Those are n number as from level select
    const [play, setPlay] = useState(false)

    //  fetch dei pokemon da API e storage nello state
    const getPokemon = async () => {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`)
            if (res.ok) {
                const data = await res.json()
                if (data) (setPokemon(data.results))

            } else { console.log("error fetching") }

        } catch (error) {
            console.log(error)
        }
    }

    // sul click, mostro la carta e la aggiungo all'arrai delle carte girate,
    // attendo che nell'array ci siano due elementi, quindi controllo che siano
    // differenti o uguali. Nel primo caso attendo 3 secondi e poi giro nuovamente le carte; 
    // nel secondo caso le lascio scoperte e trasferisco il contenuto dell'array nell'array delle carte trovate
    // aggiorno il contatore dei punti

    const checkGame = (c) => { console.log("carta =>") }


    // estraggo random da pokemon.array un numero di pokemon pari a level/2 e sposto questi elementi in un array temporaneo
    const handleStartGame = (e) => {
        e.preventDefault();
        setPlay(true)
        alert("the game is started!")
        //  creo una copia di pokemon array su cui lavorare, così non modifico l'originale ed evito nuove chiamate al server
        let newPoke = pokemon.slice()
        //  creo un array temporaneo come store della carte da giocare
        let halfGameStack = []
        // creo una iterazione per il numero di carte che desidero

        for (let i = 0; i < 4; i++) {
            console.log("newpoke =>", newPoke)
            // genero un numero casuale
            const rdm = Math.abs(Math.floor(Math.random() * 20) - (i + 1))

            // estraggo dall'array copia l'elemento con indice pari al random number
            let el = newPoke[rdm]
            console.log("el =>", el)
            //  elimino l'elemento dall'array principale per evitare duplicazioni
            newPoke.splice(rdm, 1)
            console.log("newPoke after splice =>", newPoke)
            //  aggiungo l'elemento all'array temporaneo delle carte scelte
            halfGameStack.push(el)
            console.log("halfGame =>", halfGameStack)

            //  creo un array doppio di halfGameStack
            let newStack = [...halfGameStack, ...halfGameStack]
            console.log("newStack =>", newStack)

            // mischio in modo casuale lo stack
            let shuffleStack = newStack.sort(() => Math.random() - 0.5)
            console.log("newStack shuffle =>", newStack)


            //  setto il nuovo stato dello stack di carte
            setCardsSelected(shuffleStack)
            console.log("cardSelected", cardsSelected)

        }


    }


    // LOGICA DEL GIOCO
    // l'utente chiede di giocare   DONE
    // l'utente sceglie il livello   DONE
    // l'utente vede le carte scoperte per 5 secondi, in numero relativo al livello di difficoltà scelto
    // l'utente seleziona la prima carta
    // l'utente seleziona la seconda carta
    // l'utente indovina o sbaglia
    //l'utente indovina tutte le carte



    // first call for getting pokemon
    useEffect(() => { getPokemon() }, [])


    return (
        <>
            <h1 > POKEMON MEMORY GAME </h1>

            <div >
                <h5 style={play ? { display: 'none' } : { display: 'block', marginBottom: '5px' }}>select level</h5>


                <Form.Select aria-label="Default select example"
                    size="sm"
                    onChange={(e) => { setLevel(e.target.value) }}
                    style={play ? { display: 'none' } : { display: 'block' }}>

                    <option value="6">Select your level</option>
                    <option value="6">Easy</option>
                    <option value="10">Medium</option>
                    <option value="16">Hard</option>
                </Form.Select>
                <Button style={level ? { display: 'block' } : { display: 'none' }} onClick={handleStartGame}>Start new game</Button>
            </div>


            <div className='cardStack'>{
                cardsSelected?.map(card =>
                    <GameTable key={card.index} card={card} onClick={() => console.log('card')} />)

            }</div>

        </>)


}
export default HomePage
