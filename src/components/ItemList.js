import React, {useEffect, useState} from 'react'
import Celulares from '../archivos-json/celulares.json'
import Item from './Item';


const ItemList = () => {
    const URL = Celulares;
    const [celulares, setCelulares] = useState([]);

    const getData = () => {
        const newPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([...URL])
                reject("No se pudo conseguir la información solicitada")
            }, 2000);
        })
        newPromise.then(res => setCelulares(res))
                 .catch(err => console.log(err));
    }
    

    useEffect(() => {
        getData()
    }, [])



    return (
        <div className='itemList__container'>
            {celulares.map((c, index) =>
                <Item model={c.modelo} year={c.año} stock={c.stock} key={index}/>
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
