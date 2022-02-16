import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TituloPagina from '../components/TituloPagina'
import phone from '../img/phone.svg'

const Home = () => {

    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let homeTimeOut;

        setTimeout(() => {
            setVisible(true)
        }, 400);

        return (()=> {
            clearTimeout(homeTimeOut)
        })
    }, [visible])

    return (
        <main className='main'>
            <TituloPagina titulo={"Home"} />
            {visible && 
            <div className='main__Home'>
                <div>
                    <h2 className='my-5'>Bienvenido a Mobile Imports</h2>
                    <img src={phone} alt='phone-img' className='home__phoneImg'/>
                </div>
                <h4 className='m-2'>Si desea ver nuestros productos haga click en el siguiente enlace</h4>
                <button className='botonGenerico2' onClick={()=> navigate('/productos')}>Tienda</button>
            </div>}
        </main>
    )
}

export default Home
