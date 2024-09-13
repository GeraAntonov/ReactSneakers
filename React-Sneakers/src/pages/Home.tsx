import Loop from "../assets/Loop.svg";
import Delete from "../assets/delete.svg";
import Card from "../components/Card/Card.tsx";


function Home ({items,cartItems,searchValue,setSearchValue,onChangeSearchInput,onAddToCart,onAddToFavorite}) {
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
                <div className="search-block d-flex">


                    <img src={Loop}/>
                    {searchValue && (<img
                            onClick={() => setSearchValue('')}
                            className='clear cu-p'
                            src={Delete} alt="Удалить"/>
                    )}
                    <input value={searchValue} onChange={onChangeSearchInput} placeholder="Поиск..."/>
                </div>
            </div>
            <div className="d-flex flex-wrap">
                {items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
                    .map((item, index) => {
                        return <Card
                            key={index}
                            onClickFavorite={(obj) => onAddToFavorite(obj)}
                            onClickPlus={(obj) => onAddToCart(obj)}
                            added={cartItems.some((obj) => obj.id == item.id)}
                            {...item}
                        />
                    })}
            </div>
        </div>
    );
}

export default Home;