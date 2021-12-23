import React from 'react'
import Item from './Item';


const ItemList = ({lista}) => {

    return (
        <div className='itemList__container'>
            {lista.map((c, index) =>
                <Item 
                    model={c.modelo} 
                    year={c.año} 
                    stock={c.stock} 
                    img={c.url} 
                    key={index} 
                />
            )}
        </div>
    )
}

export default ItemList















































// import React, { useEffect, useState } from 'react'
// import Item from './Item';


// const ItemList = () => {

//     const [chars, setChars] = useState([]);

//     const obtenerItems = () => {
//         const URL = 'https://rickandmortyapi.com/api/character'
//         fetch(URL)
//         .then(res => res.json())
//         .then(data => {
//             setChars(data.results)
//             // console.log(data.results)
//         })
//     }

//     useEffect(() => {
//         obtenerItems()
//     }, [])

//     return (
//         <div>
//             {chars.map((char, index) => 
//                 <Item name={char.name} species={char.species} key={index}/>
//             )}
//         </div>
//     )
// }

// export default ItemList
