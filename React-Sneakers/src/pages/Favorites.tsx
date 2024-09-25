import React from "react";
import Loop from "../assets/Loop.svg";
import Delete from "../assets/delete.svg";
import Card from "../components/Card/Card.tsx";
import AppContext from "../context.tsx";

function Favorites ({onAddToFavorite,onAddToCart}) {
    const {favorites} = React.useContext(AppContext)
    return (
        <div className="content p-40">
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
        </div>
    );
}

export default Favorites;