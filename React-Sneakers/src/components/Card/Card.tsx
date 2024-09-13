import FavUnliked from "../../assets/favorites-unliked.svg";
import FavLiked from "../../assets/favorites-liked.svg";
import Plus from "../../assets/btn-default.svg";
import Success from "../../assets/btn-success.svg"
import "./card.scss"
import {useState,useEffect} from "react";

export default function Card({ id,title, image, price, onClickFavorite, onClickPlus, favorited = false, added = false}) {
    const [ isAdded, setIsAdded] = useState(added)
    const [ isFavorite, setIsFavorite] = useState(favorited)

    function handleIsAdded(){
        onClickPlus({id, title, image, price})
        setIsAdded(!isAdded)
    }

    const clickFavorite = () => {
        onClickFavorite({id,title, image, price})
        setIsFavorite(!isFavorite);
    }

    return (<div className="card">
        <div className="favorite">
            <img src={isFavorite ? FavLiked : FavUnliked} alt="Unlicked" onClick={clickFavorite}/>
        </div>
        <img width={133} height={112} src={image} alt=""/>
        <h5>{title}</h5>
        <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>{price} руб.</b>
            </div>
            <img className="btn-plus" onClick={handleIsAdded} width={11} height={11}
                 src={isAdded ? Success :  Plus} alt="Plus"/>
        </div>
    </div>)
}