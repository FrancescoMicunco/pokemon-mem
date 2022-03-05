import { Form, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import GameTable from './GameTable'

const HomePage = () => {
    const [level, setLevel] = useState(undefined)  // Select the difficult level
    const [pokemon, setPokemon] = useState([])  // first 80 pokemon from API
    const [cardToPlay, setCardToPlay] = useState([])  //extract random cards from pokemon array. Those are n number as from level select
    const [play, setPlay] = useState(false)

    //  getting pokemon and store it in state
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

    // 1) estraggo random da pokemon.array un numero di pokemon pari a level/2 e sposto questi elementi in un array temporaneo
    const handleStartGame = (e) => {
        e.preventDefault();
        setPlay(true)
        console.log("this is the level = ", level)
        const extractCardsFromStack = pokemon.slice
    }
    // const index = Math.floor(Math.random() * 80);
    // console.log("primo", index)
    // for (let i = 0; i < { level } / 2; i++) {
    //     console.log("i=", i)

    // let tempArray = pokemon.slice(index - 1, 6)
    // console.log("tArr", tempArray)
    // console.log("this is tempArray", tempArray)





    // 2) creo un nuovo array con spread operator in modo da duplicare gli elementi dell'array temporaneo
    // 3) dispongo in modo casuale gli elementi dell'array nuovo

    // LOGICA DEL GIOCO
    // l'utente chiede di giocare   DONE
    // l'utente sceglie il livello   DONE
    // l'utente vede le carte coperte in numero relativo al livello di difficoltà scelto
    // l'utente seleziona la prima carta
    // l'utente seleziona la seconda carta
    // l'utente indovina o sbaglia
    //l'utente indovina tutte le carte





    // first call for getting pokemon
    useEffect(() => { getPokemon() }, [])


    return (
        <>
            <h1 > POKEMON MEMORY GAME </h1>
            <Button style={play ? { display: 'none' } : { display: 'block' }} onClick={handleStartGame}>Start new game</Button>
            <div>
                <h5 style={play ? { display: 'block' } : { display: 'none' }}>select level</h5>
                <Form.Select aria-label="Default select example" size="sm" onChange={(e) => setLevel(e.target.value)} style={play ? { display: 'block' } : { display: 'none' }}>
                    <option value="6">Easy</option>
                    <option value="10">Medium</option>
                    <option value="16">Hard</option>
                </Form.Select>
            </div>

            {level !== undefined &&
                pokemon?.map(card =>
                    <GameTable />)
            }

        </>)


}
export default HomePage
