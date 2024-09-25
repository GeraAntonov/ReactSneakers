import Delete from "../../assets/delete.svg";
import arrowLeft from "../../assets/arrowLeft.svg";
import emptyBasket from "../../assets/EmptyBasket.png";
import OrderSucces from "../../assets/OrderSuccess.png";
import "./cartDrawer.scss";
import Info from '../info.tsx';
import {useState} from "react";
import AppContext from "../../context.tsx";
import React from "react";
import axios from "axios";

export default function Drawer({handleCloseDrawer, onRemove}) {

    const {cartItems,setCartItems} = React.useContext(AppContext);
    const {orderId, setOrderId} = useState(null);
    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const [isLoading, setIsLoading] = useState (true);

    const onClickOrder  = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.post("https://66dc2b8b47d749b72acaed97.mockapi.io/Orders", {
                items: cartItems,
            });
            // setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);

            cartItems.forEach(item => {
                 axios.delete("https://66b9b0dafa763ff550f9227e.mockapi.io/cart/" + item.id)
                }
            )
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }


    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className=" d-flex justify-between mb-30 ">Корзина <img onClick={handleCloseDrawer} className='cu-p' src={Delete} alt="Удалить"/>
                </h2>
                {cartItems.length > 0 ? (
                    <div className="d-flex flex flex-column">
                        <div className="items">
                            {cartItems.map((obj) => {
                                return (
                                    <div>
                                        <div className="cartItem mb-20">
                                            <div style={{backgroundImage: `url(${obj.image})`}}
                                                 className="cartItemImage"></div>

                                            <div className="mr-20 flex">
                                                <p className="mb-5">{obj.title}</p>
                                                <b>{obj.price}</b>
                                            </div>
                                            <img
                                                onClick={() => {
                                                    onRemove(obj.id)
                                                }}
                                                className='btn'
                                                src={Delete}
                                                alt="Удалить"
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="cartTotalBlock">
                            <ul>
                                <li>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>21 489 руб.</b>
                                </li>
                                <li>
                                    <span>Налог 5%:</span>
                                    <div></div>
                                    <b>1074 руб.</b>
                                </li>
                            </ul>
                            <button onClick={onClickOrder} className="greenButton">Оформить заказ <img src={arrowLeft} alt="Стрелочка"/>
                            </button>
                        </div>
                    </div>
                ) : (
                    <Info image={isOrderComplete? OrderSucces : emptyBasket}
                          title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"}
                          description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской службе доставки!` : "Добавьте хотя бы одну пару, чтобы сделать заказ"}/>
                )}
            </div>
        </div>
    )
}