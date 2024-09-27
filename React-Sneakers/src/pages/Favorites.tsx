import React from "react";
import sadBoy from "../assets/sadBoy.jpg"
import Card from "../components/Card/Card.tsx";
import AppContext from "../context.tsx";
import {Link} from "react-router-dom";


function Favorites ({onAddToFavorite,onAddToCart}) {
    const {favorites} = React.useContext(AppContext)
    return (
        <div className="content p-40">
            {favorites.length > 0 ? (
                <>
                    <div className="d-flex align-center justify-between mb-40">
                        <h1>Мои избранные</h1>
                    </div>
                    <div className="d-flex flex-wrap">
                        {favorites.map((item, index) => {
                            return <Card
                                key={index}
                                favorited={true}
                                onClickPlus={onAddToCart}
                                onClickFavorite={onAddToFavorite}
                                {...item}
                            />
                        })}
                    </div>
                </>
            ) : (
                <div className="emptyFavorites">
                    <img src={sadBoy} />
                    <h2>Закладок нет :(</h2>
                    <p>Вы ничего не добавляли в закладки</p>
                    <Link to='/'>
                    <button className="greenButton">Вернуться в каталог</button>
                    </Link>
                </div>
            )
            }
        </div>
    );
}

export default Favorites;