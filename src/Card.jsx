

const SingleCard = ({pokemon}) => {
    console.log("from card", pokemon)
     return (
     <div>
        <img variant = "top"
        src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt={pokemon.name}/>
        <h3>
        {pokemon.name} 
        </h3> 
    </div>
)}

export default SingleCard