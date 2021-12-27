import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'

const PruebaRouting = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Navbar />}/>
                </Routes>
            </Router>
        </div>
    )
}

export default PruebaRouting
