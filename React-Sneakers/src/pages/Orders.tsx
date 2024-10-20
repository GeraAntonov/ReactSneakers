import React, {useEffect, useState} from "react";
import Loop from "../assets/Loop.svg";
import Delete from "../assets/delete.svg";
import Card from "../components/Card/Card.tsx";
import AppContext from "../context.tsx";
import axios from "axios";
import soSadBoy from "../assets/soSadBoy.jpg";
import {Link} from "react-router-dom";

function Orders () {
    const {onAddToFavorite, onAddToCart} = React.useContext(AppContext)
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const {data} = await axios.get('https://66dc2b8b47d749b72acaed97.mockapi.io/Orders')
                setOrders(data.reduce((prev,obj) => [...prev,...obj.items], []))
                setIsLoading(false)
            } catch (error){
                console.log('ошибка при запросе заказов',error)
            }
        }
       fetchData();
    },[])

    return (
        <div className="content p-40">
            { orders.length > 0 ? (
                <>
                    <div className="d-flex align-center justify-between mb-40">
                        <h1>Мои заказы</h1>
                    </div>
                    <div className="d-flex flex-wrap">
                        {(isLoading ? [...Array(12)] : orders).map((item, index) => {
                            return <Card
                                key={index}
                                loading={isLoading}
                                {...item}
                            />
                        })}
                    </div>
                </>
            ) : (
                <div className='emptyOrders'>
                    <img src={soSadBoy}/>
                    <h2>У вас нет заказов</h2>
                    <p>Вы ничего не купили, купите пожалуйста</p>
                    <Link to='/'>
                        <button className="greenButton">Вернуться в каталог</button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Orders;