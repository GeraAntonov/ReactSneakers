import './App.scss'
import 'macro-css'
import axios from "axios";
import React from "react";
import {Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import Header from "./components/Header/Header.tsx";
import Drawer from "./components/CartDrawer/Drawer.tsx";
import Home from "./pages/Home.tsx"
import Favorites from "./pages/Favorites.tsx";
import AppContext from "./context.tsx";
import Orders from "./pages/Orders.tsx";

function App(isAdded) {

    const state = React.useContext(AppContext)

    const [items, setItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [cartOpened, setCartOpened] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData(){
            try {
                const itemsResponse= await axios.get('https://66b9b0dafa763ff550f9227e.mockapi.io/items');
                const cartResponse = await axios.get('https://66b9b0dafa763ff550f9227e.mockapi.io/cart');
                const favoritesRespose = await axios.get('https://66dc2b8b47d749b72acaed97.mockapi.io/Favorites');

                setIsLoading(false)
                setItems(itemsResponse.data);
                setCartItems(cartResponse.data);
                setFavorites(favoritesRespose.data)
            } catch (error) {
                alert('Ошибка при запросе данных :(')
                console.log(error)
            }
        }
        fetchData();
    },[]);
    const onAddToCart = async (obj) => {
            try {
                const findItem = cartItems.find((item) => parseInt(item.parentId) == parseInt(obj.id))
                if (findItem){
                    await axios.delete(`https://66b9b0dafa763ff550f9227e.mockapi.io/cart/${findItem.id}`);
                    setCartItems((prev) => prev.filter((item) => item.id !== obj.id))
                } else {
                    setCartItems((prev) => [...prev, obj])
                    const {data} = await axios.post('https://66b9b0dafa763ff550f9227e.mockapi.io/cart', obj);
                    setCartItems((prev) => prev.map(item => {
                        if (item.parentId == data.parentId) {
                            return {
                                ...item,
                                id: data.id
                            };
                        }
                        return item;
                    }));
                }
            } catch (error) {
                alert('Ошибка при добавлении товаров в корзину')
                console.log(error)
            }
    }

    const onRemoveItem = (id) => {
        try {
            axios.delete(`https://66b9b0dafa763ff550f9227e.mockapi.io/cart/${id}`);
            setCartItems((prev) => prev.filter((item) => parseInt(item.id) !== parseInt(id)))
        } catch (error) {
            alert('Ошибка при удалении товара :(')
            console.log(error)
        }
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
            console.log(error)
        }
    }

    const onChangeSearchInput = (event) =>{
        setSearchValue(event.target.value)
    }

    const isItemAdded = (id) => {
        return cartItems.some((obj) => obj.parentId == id)
    }

    const isItemFavorite = (id)  => {
        return favorites.some((obj) => obj.id == id)
    }

    return (
        <AppContext.Provider value={{items, cartItems, favorites, isItemAdded,isItemFavorite, setCartOpened, setCartItems, onAddToFavorite, onAddToCart}}>
            <div className="wrapper clear">
                <Drawer
                    cartItems={cartItems}
                    handleCloseDrawer={() => setCartOpened(false)}
                    onRemove={onRemoveItem}
                    opened={cartOpened}/>
                <Header handleChangeCart={() => setCartOpened(true)}/>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                items={items}
                                cartItems={cartItems}
                                searchValue={searchValue}
                                setSearchValue={setSearchValue}
                                onChangeSearchInput={onChangeSearchInput}
                                onAddToFavorite={onAddToFavorite}
                                onAddToCart={onAddToCart}
                                isLoading={isLoading}
                            />
                        }
                        exact
                    />
                    <Route
                        path="/favorites"
                        element={
                            <Favorites
                                onAddToFavorite={onAddToFavorite}
                                onAddToCart={onAddToCart}/>
                        }
                        exact
                    />
                    <Route
                        path="/orders"
                        element={
                        <Orders/>
                        }
                    />
                </Routes>
            </div>
        </AppContext.Provider>
    )
}

export default App
