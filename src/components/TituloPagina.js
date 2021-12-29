import React from 'react'

const TituloPagina = ({titulo}) => {
    return (
        <div>
            <div style={{borderTop: '2px solid black', borderBottom: '2px solid black', backgroundColor: 'coral'}}>
                <h3 style={{margin: 'auto', padding: '5px'}}>{titulo}</h3>
            </div>
        </div>
    )
}

export default TituloPagina
