import './App.scss'
import 'macro-css'
import axios from "axios";
import Card from './components/Card/Card.tsx'
import Header from "./components/Header/Header.tsx";
import Drawer from "./components/CartDrawer/Drawer.tsx";
import Loop from './assets/Loop.svg'
import FavUnliked from './assets/favorites-unliked.svg'
import FavLiked from './assets/favorites-liked.svg'
import {useEffect, useState} from "react";
import Delete from "./assets/delete.svg";

function App(isAdded) {

    const [items, setItems] = useState([]);
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

    const onChangeSearchInput = (event) =>{
        setSearchValue(event.target.value)
    }

  return (
    <div className="wrapper clear">
        {cartOpened && <Drawer cartItems = {cartItems} handleCloseDrawer = {() => setCartOpened(false)} onRemove={onRemoveItem}/>}
      <Header handleChangeCart = {() => setCartOpened(true)} />

      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"`: "Все кроссовки"}</h1>
            <div className="search-block d-flex">


                <img src={Loop}/>
                {searchValue && (<img
                    onClick={()=>setSearchValue('')}
                    className='clear cu-p'
                    src={Delete} alt="Удалить"/>
                )}
                <input value={searchValue} onChange={onChangeSearchInput} placeholder="Поиск..."/>
            </div>
        </div>
          <div className="d-flex flex-wrap">
              {/*<Card title={arr[0].name} price={arr[0].price} image={arr[0].image}/>*/}
            {/*<Card title={arr[1].name} price={arr[1].price} image={arr[1].image}/>*/}
            {items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
                .map((item,index)=> {
                    return <Card
                    key={index}
                    title={item.name}
                    price={item.price}
                    image={item.image}
                    onClickFavorite= {() => console.log('YYYY')}
                    onClickPlus = {(obj)=>onAddToCart(obj)}
                    />
            })}
        </div>
      </div>
    </div>
  )
}

export default App
