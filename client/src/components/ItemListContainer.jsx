import { useSelector, useDispatch } from 'react-redux';
import ItemListCard from './ItemListCard';

const ItemListContainer = () => {

    const items = useSelector((state) => state.itemList)

    return (
        <div className="w-[70%] mx-auto my-[4rem]">
            <h1 className='text-left text-white text-2xl font-bold'>Item List <span className='text-[16px] font-normal'>({items.length})</span> </h1>
            {items.map((item) =>
                <div key={item.itemId}>
                    <ItemListCard item={item} />
                </div>
            ).reverse()}
        </div>
    )
}

export default ItemListContainer