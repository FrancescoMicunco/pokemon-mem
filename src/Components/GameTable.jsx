import './homepage.css'


const GameTable = ({ card }) => {

    let str = card.url
    //  estraggo il numero del singolo pokemon dall'url di base per recuperare l'url dello sprite

    let substr = str.substr(-3).split('').slice(0, 2).filter(filter).reduce((i, c) => i + c)
    function filter(e) {
        return e !== "/";
    }

    const spriteUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
    return (

        <div className='card'>
            <img variant="top"
                src={`${spriteUrl}${substr}.png`}
                alt={card.name}
            />
            <h5 > {card.name} </h5>

        </div>

    )

}
export default GameTable

