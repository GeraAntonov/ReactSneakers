import react from 'react'
import Delete from "../../assets/delete.svg";
import Sneak1 from "../../assets/Sneakers/1.jpg";
import arrowLeft from "../../assets/arrowLeft.svg";

export default function Drawer() {
    return (
        <div style={{display: 'none'}} className="overlay">
        <div className="drawer">
            <h2 className=" d-flex justify-between mb-30 ">Корзина <img className='cu-p' src={Delete} alt="Удалить"/>
            </h2>

            <div className="items">
                <div className="cartItem mb-20">
                    <div style={{backgroundImage: `url(${Sneak1})`}} className="cartItemImage"></div>

                    <div className="mr-20 flex">
                        <p className="mb-5">Мужские кроссовки Nike Air Max 270</p>
                        <b>12 999 руб.</b>
                    </div>
                    <img
                        className='btn'
                        src={Delete}
                        alt="Удалить"
                    />
                </div>

                <div className="cartItem mb-20">
                    <div style={{backgroundImage: `url(${Sneak1})`}} className="cartItemImage"></div>

                    <div className="mr-20 flex">
                        <p className="mb-5">Мужские кроссовки Nike Air Max 270</p>
                        <b>12 999 руб.</b>
                    </div>
                    <img
                        className='btn'
                        src={Delete}
                        alt="Удалить"
                    />
                </div>


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
                <button className="greenButton">Оформить заказ <img src={arrowLeft} alt="Стрелочка"/></button>
            </div>
        </div>
        </div>
    )
}