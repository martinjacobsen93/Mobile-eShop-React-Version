import React, {Fragment} from 'react'

const Boton = ({content}) => {
    return (
        <Fragment>
            <button className="btn btn-primary">{content}</button>
        </Fragment>
    )
}

export default Boton
