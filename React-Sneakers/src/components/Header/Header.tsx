import Logo from "../../assets/LogoSneakers.png";
import Basket from "../../assets/basket.svg";
import User from "../../assets/user.svg";
import "./header.scss"

export default function Header(props){
    return (
        <header className="d-flex justify-between align-center p-40">
            <div className="d-flex align-center">
                <img width="50px" height="50px" src={Logo}/>
                <div className="headerLeft">
                    <h3 className="text-uppercase">React Sneakers</h3>
                    <p>Магазин лучших кроссовок</p>
                </div>
            </div>
            <ul className="headerRight d-flex">
                <li onClick={props.handleChangeCart} className="mr-30 cu-p">
                    <img width={18} height={18} src={Basket}/>
                    <span>0000 руб.</span>
                </li>
                <li>
                    <img src={User}/>
                    <span>Профиль</span>
                </li>
            </ul>
        </header>
    )
}