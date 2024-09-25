import Loop from "../assets/Loop.svg";
import Delete from "../assets/delete.svg";
import Card from "../components/Card/Card.tsx";
import React from "react";
function Home (
    {
        items,
        cartItems,
        searchValue,
        setSearchValue,
        onChangeSearchInput,
        onAddToCart,
        onAddToFavorite,
        isLoading,
    }) {
    const renderItems = () => {
        const filtredItems = items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
        );

    return (isLoading ? [...Array(12)] : filtredItems).map((item, index) => (
                <Card
                key={index}
                onClickFavorite={(obj) => onAddToFavorite(obj)}
                onClickPlus={(obj) => onAddToCart(obj)}
                loading={isLoading}
                {...item}
            />
        ))
    }

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
                {renderItems()}
            </div>
        </div>
    );
}

export default Home;