import './App.scss'
import 'macro-css'
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import Header from "./components/Header/Header.tsx";
import Drawer from "./components/CartDrawer/Drawer.tsx";
import Home from "./pages/Home.tsx"
import Favorites from "./pages/Favorites.tsx";


function App(isAdded) {

    const [items, setItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [cartOpened, setCartOpened] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    useEffect(()=>{
        axios.get('https://66b9b0dafa763ff550f9227e.mockapi.io/items').then((res)=>{
            setItems(res.data);
        });
        axios.get('https://66b9b0dafa763ff550f9227e.mockapi.io/cart').then((res) =>{
            setCartItems(res.data)
        });
        axios.get('https://66dc2b8b47d749b72acaed97.mockapi.io/Favorites').then((res) =>{
            setFavorites(res.data)
        });
    },[]);


    const onAddToCart = (obj) => {
        axios.post('https://66b9b0dafa763ff550f9227e.mockapi.io/cart', obj);
        setCartItems((prev) => [...prev, obj])
    }

    const onRemoveItem = (id) => {
        axios.delete(`https://66b9b0dafa763ff550f9227e.mockapi.io/cart/${id}`);
        setCartItems((prev) => prev.filter((item) => item.id !== id))
        console.log(cartItems)
    }

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find(favObj => favObj.id == obj.id)){
                axios.delete(`https://66dc2b8b47d749b72acaed97.mockapi.io/Favorites/${obj.id}`)
                setFavorites((prev) => prev.filter((item) => item.id !== obj.id))
            } else {
                const { data} = await axios.post('https://66dc2b8b47d749b72acaed97.mockapi.io/Favorites', obj);
                setFavorites((prev)=> [...prev, data])
            }
        } catch (error) {
            alert('Не удалось добавить в фавориты')
        }
    }

    const onChangeSearchInput = (event) =>{
        setSearchValue(event.target.value)
    }

    return (
        <div className="wrapper clear">
            {cartOpened && <Drawer cartItems = {cartItems} handleCloseDrawer = {() => setCartOpened(false)} onRemove={onRemoveItem}/>}

            <Header handleChangeCart = {() => setCartOpened(true)} />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            items={items}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            onChangeSearchInput={onChangeSearchInput}
                            onAddToFavorite={onAddToFavorite}
                            onAddToCart={onAddToCart}
                        />
                    }
                    exact
                />
                <Route
                    path="/favorites"
                    element={
                        <Favorites items={favorites} onAddToFavorite={onAddToFavorite}/>
                    }
                    exact
                />
            </Routes>
        </div>
    )
}

export default App
