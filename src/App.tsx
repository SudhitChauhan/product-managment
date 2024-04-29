import React, { useState } from 'react';
import ProductModal from './_components/ProductModal';
import { GlobalContext } from './_context/GlobalState';
import ProductItem from './_components/ProductItem';



import { FiPlus } from "react-icons/fi";
import { LuSearch } from "react-icons/lu";
import { CiCircleList } from "react-icons/ci";
import { IoGridOutline } from "react-icons/io5";

function App() {

  const value = React.useContext(GlobalContext);

  const [islist, setIsList] = useState(false);

  const handleListView = (value: boolean) => {
    setIsList(value)
  }

  return (

    <>

      <div className='bg-[#659dd0]'>
        <div className="container mx-auto py-10 px-5 md:px-10">
          <div className='flex justify-between items-center gap-3 flex-wrap'>
            <h1 className='text-3xl font-bold text-white'>Product list</h1>
            <button className='px-5 text-sm py-2 bg-[#ffffff] text-[#000000] rounded-[8px] hover:opacity-60 transition-all duration-500 focus:outline-none flex items-center' onClick={() => value?.handlePopUp(true)}><FiPlus /><span className='ms-2'>Add Expences</span></button>
            <ProductModal />
          </div>

        </div>
      </div>
      <div className="container mx-auto py-10 px-5 md:px-10">


        <div className='flex justify-start items-center mb-5 flex-wrap gap-3'>
          <form className='search-box flex items-center border-[1px] md:min-w-[500px] rounded-lg  me-3'>
            <input className='outline-none py-2 px-4 grow bg-transparent' placeholder='Search...' type='search' />
            <button className='pe-3'><LuSearch /></button>
          </form>

          {
            value?.productList && value?.productList.length > 0 && <div className='hidden sm:flex flex items-center gap-5'>
              <button className={`${islist ? 'bg-[#ffb703]' : ''} px-3 justify-center min-w-[100px] py-[12px] border-[1px] hover:bg-[#ffb703] rounded-[8px] hover:opacity-60 transition-all duration-500 focus:outline-none flex items-center`} onClick={() => handleListView(true)}><CiCircleList /><span className='ms-2 text-sm '>List</span></button>
              <button className={`${!islist ? 'bg-[#ffb703]' : ''} px-3 justify-center min-w-[100px] py-[12px] border-[1px] hover:bg-[#ffb703] rounded-[8px] hover:opacity-60 transition-all duration-500 focus:outline-none flex items-center`} onClick={() => handleListView(false)}><IoGridOutline /><span className='ms-2 text-sm'>Grid</span></button>
            </div>
          }

        </div>

        {
          value?.productList && value?.productList.length > 0 ? <div className={`${islist ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'} grid gap-5 animate__animated`}>
            {
              value?.productList && value?.productList.map((item) => <ProductItem data={item} isList={islist} key={item.id} />)
            }
          </div> : <div className='w-[100%] text-center'>
            <img src={require('./_assets/img/empty-data.jpg')} alt='product' className={`aspect-square w-[400px] mx-auto object-cover`} />
            <h3 className='text-[30px] font-bold'>No Data Found!</h3>
          </div>
        }

      </div>
    </>
  );
}

export default App;
