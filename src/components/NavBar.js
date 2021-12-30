import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Boton from './Boton'
import CartWidget from './CartWidget'

const NavBar = () => {

    const navigate = useNavigate();

    return (
        <nav className='navBar bg-dark container-fluid p-2'>
            <h1 className='navBar__brandTitle' onClick={()=> navigate("/")}>Coders</h1>
            <ul className='navBar__linkList'>
                <li className="itemList"><Link to="/"><Boton content='Home'/></Link></li>
                <li className="itemList"><Link to="/contacto"><Boton content='Contacto'/></Link></li>
                <li className="itemList"><Link to="/productos"><Boton content='Productos'/></Link></li>
                <li className="itemList"><CartWidget /></li>
            </ul>
        </nav>
    )
}

export default NavBar
