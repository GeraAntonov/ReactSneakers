import react from 'react';
import FavUnliked from "../../assets/favorites-unliked.svg";
import Sneak1 from "../../assets/Sneakers/1.jpg";
import Plus from "../../assets/Plus.svg";


export default function Card(props) {
    return (<div className="card">
        <div className="favorite">
            <img src={FavUnliked} alt="Unlicked"/>
        </div>
        <img width={133} height={112} src={Sneak1} alt=""/>
        <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
        <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>12 999 руб.</b>
            </div>
            <button className="button">
                <img width={11} height={11} src={Plus} alt="Plus"/>
            </button>
        </div>
    </div>)
}