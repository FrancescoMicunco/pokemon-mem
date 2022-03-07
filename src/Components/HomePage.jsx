import { Form, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import GameTable from './GameTable'
import './homepage.css'
import uniqid from 'uniqid'



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

            // genero un numero casuale
            const rdm = Math.abs(Math.floor(Math.random() * 20) - (i + 1))

            // estraggo dall'array copia l'elemento con indice pari al random number
            let el = newPoke[rdm]

            //  elimino l'elemento dall'array principale per evitare duplicazioni
            newPoke.splice(rdm, 1)

            //  aggiungo l'elemento all'array temporaneo delle carte scelte
            halfGameStack.push(el)


            //  creo un array doppio di halfGameStack
            let newStack = [...halfGameStack, ...halfGameStack]


            // mischio in modo casuale lo stack
            let shuffleStack = newStack.sort(() => Math.random() - 0.5)



            //  setto il nuovo stato dello stack di carte
            if (shuffleStack) setCardsSelected(shuffleStack)


        }


    }


    // LOGICA DEL GIOCO
    // l'utente chiede di giocare   DONE
    // l'utente sceglie il livello   DONE
    // l'utente vede le carte scoperte per 5 secondi, in numero relativo al livello di difficoltà scelto
    // l'utente seleziona la prima carta  DONE
    // l'utente seleziona la seconda carta  DONE
    // l'utente indovina o sbaglia  DONE
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


            <div className='cardStack' >{
                cardsSelected?.map((card, index) =>

                    <GameTable key={index} card={card} />

                )}</div>

        </>)


}
export default HomePage
