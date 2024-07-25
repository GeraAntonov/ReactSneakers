import './App.scss'
import 'macro-css'
import Card from './components/Card/Card.tsx'
import Header from "./components/Header/Header.tsx";
import Drawer from "./components/CartDrawer/Drawer.tsx";
import Logo from './assets/LogoSneakers.png'
import Basket from './assets/basket.svg'
import Favorites from './assets/favorites.svg'
import User from './assets/user.svg'
import Plus from './assets/Plus.svg'
import Sneak1 from './assets/Sneakers/1.jpg'
import Sneak2 from './assets/Sneakers/2.jpg'
import Sneak3 from './assets/Sneakers/3.jpg'
import Sneak4 from './assets/Sneakers/4.jpg'
import Loop from './assets/Loop.svg'
import FavUnliked from './assets/favorites-unliked.svg'
import FavLiked from './assets/favorites-liked.svg'
import Delete from './assets/delete.svg'
import arrowLeft from './assets/arrowLeft.svg'

function App() {

  return (
    <div className="wrapper clear">
      <Drawer/>
      <Header/>
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
          <img src={Loop}/>
            <input placeholder="Поиск..."  />
          </div>
        </div>

        <div className="d-flex">
          <Card/>
        </div>

      </div>
    </div>
  )
}

export default App
