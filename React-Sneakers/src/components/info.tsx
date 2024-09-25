import React from "react";
import arrowLeft from "../assets/arrowLeft.svg";
import AppContext from "../context.tsx";
const Info = ({ image, title, description }) => {
    const {setCartOpened} = React.useContext(AppContext)

    return(
            <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                <img className="mb-20" width="120px" height="120px" src={image}/>
                <h2>{title}</h2>
                <p className="empty-6">{description}</p>
                <button onClick={()=>{setCartOpened(false)}} className="greenButton">
                    <img src={arrowLeft}/> Вернуться назад
                </button>
            </div>
    )
}

export default Info