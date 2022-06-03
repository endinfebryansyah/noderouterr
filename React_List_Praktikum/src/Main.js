import React from "react"
import { Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Lingkungan from './pages/Lingkungan'
import Produk from './pages/Cart';
import Cart from './pages/cart2';

class Main extends React.Component{
    render(){
        return(
            <Routes>
                <Route exact path='/' element={<Home/>}></Route>
                <Route path='/Lingkungan' element={<Lingkungan/>}></Route>
                <Route path='/cart' element={<Produk/>}></Route>
                <Route path='/cart2' element={<Cart/>}></Route>
            </Routes>
        )
    }
}

export default Main;