import React from 'react'
import Boton from './Boton'

const NavBar = () => {
    return (
        <div className='navBar bg-dark container-fluid p-2'>
            <h1 className='navBar__brandTitle'>Coders</h1>
            <ul className='navBar__linkList'>
                <li className="itemList"><Boton content='Home'/></li>
                <li className="itemList"><Boton content='Contacto'/></li>
                <li className="itemList"><Boton content='Nosotros'/></li>
            </ul>
        </div>
    )
}

export default NavBar
