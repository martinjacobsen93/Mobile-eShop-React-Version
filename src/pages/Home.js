import React from 'react'
import { useNavigate } from 'react-router-dom'
import TituloPagina from '../components/TituloPagina'
import phone from '../img/phone.svg'

const Home = () => {

    const navigate = useNavigate();

    return (
        <main className='main'>
            <TituloPagina titulo={"Home"} />
            <div className='main__Home'>
                <h2 className='my-5'>Bienvenido a Mobile Imports</h2>
                <img src={phone} alt='phone-img'/>
            </div>
            <h4 className='m-2'>Si desea ver nuestros productos haga click en el siguiente enlace</h4>
            <button className='botonGenerico2' onClick={()=> navigate('/productos')}>Tienda</button>
        </main>
    )
}

export default Home
