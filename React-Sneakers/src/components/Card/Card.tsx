import FavUnliked from "../../assets/favorites-unliked.svg";
import FavLiked from "../../assets/favorites-liked.svg";
import Plus from "../../assets/btn-default.svg";
import Success from "../../assets/btn-success.svg"
import "./card.scss"
import React, {useState,useEffect} from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../../context.tsx";

export default function Card({id, title, image, price, onClickFavorite, onClickPlus, favorited = false, loading = false}) {
    const {isItemAdded, isItemFavorite} = React.useContext(AppContext)
    const [ isFavorite, setIsFavorite] = useState(favorited)
    const itemObj =  {id, parentId: id, title, image, price }
    function handleIsAdded(){
        onClickPlus(itemObj)
    }
    const clickFavorite = () => {
        onClickFavorite(itemObj)
        setIsFavorite(!isFavorite);
    }

    return (
        <div className="card">
            { loading ? (
                <ContentLoader
                    speed = {2}
                    width = {155}
                    height = {265}
                    viewBox = "0 0 155 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb">
                    <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
                    <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
                    <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                    <rect x="1" y="234" rx="5" ry="5" width="80" height="25"/>
                    <rect x="118" y="230" rx="10" ry="10" width="32" height="32" />
                </ContentLoader>
            ) : (<>
                <div className="favorite">
                    {onClickFavorite && <img src={isItemFavorite(id) ? FavLiked : FavUnliked} alt="Unlicked" onClick={clickFavorite}/>}
                </div>
                <img width="100%" height={130} src={image} alt=""/>
                <h5>{title}</h5>
                <div className="d-flex justify-between align-center">
                    <div className="d-flex flex-column">
                        <span>Цена:</span>
                        <b>{price} руб.</b>
                    </div>
                    { onClickPlus &&
                        <img className="btn-plus" onClick={handleIsAdded} width={11} height={11}
                         src={isItemAdded(id) ? Success : Plus} alt="Plus"/>}
                </div>
            </> )}

        </div>
)
}