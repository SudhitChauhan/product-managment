import React, { useContext } from 'react';
import { GlobalContext } from '../_context/GlobalState';


const ProductModal: React.FC = () => {

    const value = useContext(GlobalContext);

    const handleSubmitform = (e: any) => {
        e.preventDefault();

        let title = e.target.title.value, description = e.target.description.value, price = e.target.price.value;

        if (value?.activityAction === 'add_product') {

            value?.addProduct({
                title: title,
                description: description,
                price: price,
            });

        } else {
            value?.updateProduct({
                id: value?.product.id,
                title: title,
                description: description,
                price: price,
            });
        }

        e.target.reset();
    }

    const modalClose = () => {
        value?.setProduct({
            title: '',
            description: '',
            price: 0,
        })
        value?.handlePopUp(false)
    }

    return (
        <>
            <div tabIndex={-1} aria-hidden="true" className={`${value?.showPopup ? 'fixed' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[100vh] max-h-full bg-[#0000004d]  flex`}>
                <div className="relative p-4 w-full max-w-lg max-h-full animate__animated animate__backInUp">
                    <div className="relative bg-white shadow rounded-xl">
                        <div className="flex items-center justify-between py-4 px-5 md:py-5 md:px-8 rounded-t border-b">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Add/Edit Product
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={modalClose}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form className='py-4 px-5 md:py-5 md:px-8' onSubmit={handleSubmitform} >
                            <div className='mb-3'>
                                <label>Product title</label>
                                <input name='title' value={value?.product.title} className='rounded-md outline-none py-2 px-4 grow border-[1px] border-[#ddd] block w-[100%] mt-2' type='text' onChange={(e) => value?.setProduct({ ...value?.product, title: e.target.value })} />
                                <span className='text-[12px] text-[#ff0000]'>{value?.errors.title}</span>
                            </div>
                            <div className='mb-3'>
                                <label>Description</label>
                                <textarea name='description' value={value?.product.description} className='rounded-md outline-none py-2 px-4 grow border-[1px] border-[#ddd] block w-[100%] mt-2' rows={4} onChange={(e) => value?.setProduct({ ...value?.product, description: e.target.value })}></textarea>
                                <span className='text-[12px] text-[#ff0000]'>{value?.errors.description}</span>
                            </div>
                            <div className='mb-3'>
                                <label>Price</label>
                                <input name='price' value={value?.product.price} className='rounded-md outline-none py-2 px-4 grow border-[1px] border-[#ddd] block w-[100%] mt-2' type='number' step="any" onChange={(e) => value?.setProduct({ ...value?.product, price: parseInt(e.target.value) })} />
                                <span className='text-[12px] text-[#ff0000]'>{value?.errors.price}</span>
                            </div>
                            <div className='mb-10 mt-5'>
                                <p className='text-sm text-[#909090]'>Note: image upload is not require, <br />please use any default image.</p>
                            </div>
                            <div className='mb-3'>
                                <button className='px-10 py-2 text-base bg-[#659dd0] text-white rounded-[8px] hover:opacity-60 transition-all duration-500 focus:outline-none flex items-center' type='submit'><span>Submit</span></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductModal