import Delete from "../../assets/delete.svg";
import arrowLeft from "../../assets/arrowLeft.svg";
import emptyBasket from "../../assets/EmptyBasket.png"
import "./cartDrawer.scss"

export default function Drawer({handleCloseDrawer, onRemove, cartItems = []}) {
    return (
        <div className="overlay">
        <div className="drawer">
            <h2 className=" d-flex justify-between mb-30 ">Корзина <img onClick={handleCloseDrawer} className='cu-p' src={Delete} alt="Удалить"/>
            </h2>
            {cartItems.length > 0 ? (
                <div>
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
                        <button className="greenButton">Оформить заказ <img src={arrowLeft} alt="Стрелочка"/>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                    <img className="mb-20" width="120px" height="120px" src={emptyBasket}/>
                    <h2>Корзина пустая</h2>
                    <p className="empty-6">Добавьте хотя бы одну пару, чтобы сделать заказ</p>
                    <button onClick={handleCloseDrawer} className="greenButton">
                        <img src={arrowLeft}/> Вернуться назад
                    </button>
                </div>
            )}


        </div>
        </div>
    )
}