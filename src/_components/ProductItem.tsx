import React from 'react';
import { GlobalContext, productType } from '../_context/GlobalState';

const ProductItem = ( { data, isList } : { data : productType, isList: boolean } ) => {

    const value = React.useContext(GlobalContext);

    return (
        <div className={`${isList && 'flex flex-wrap sm:flex-nowrap  justify-between items-center'} product-item border-[1px] rounded-lg overflow-hidden`}>
            <img src={require('../_assets/img/product_place.png')} alt='product' className={`${isList ? `aspect-video sm:aspect-square w-[100%] sm:w-[160px] lg:w-[200px]` : `aspect-video w-[100%]`} object-cover`} />
            <div className={`${isList && 'flex flex-wrap sm:flex-nowrap items-start grow gap-4 lg:gap-10 justify-between'} p-5`}>
                <div className={`${isList && 'w-[100%] sm:w-[60%]'} max-w-[700px]`}>
                <h4 className='font-bold text-[20px] line-clamp-1 capitalize'>{data?.title}</h4>
                <p className='line-clamp-2 mb-4 capitalize'>{data?.description}</p>
                </div>
                <h4 className='font-bold text-[20px] mb-4 whitespace-nowrap'>Price : ${data?.price}</h4>
                <div className='flex gap-2'>
                    <button className='px-3 min-w-[100px] justify-center border-[1px] py-2 border-[#ddd] bg-[#ddd] rounded-[8px] hover:opacity-60 transition-all duration-500 focus:outline-none flex items-center' onClick={() => value?.setDataProduct(data?.id)}><span className='text-sm '>Edit</span></button>
                    <button className='px-3 min-w-[100px] justify-center py-2 text-sm border-[1px] border-[#ddd] rounded-[8px] hover:opacity-60 transition-all duration-500 focus:outline-none flex items-center' onClick={() => value?.removeProduct(data?.id)}><span className='ms-0'>Delete</span></button>
                </div>
            </div>
        </div>
    )
}

export default ProductItem