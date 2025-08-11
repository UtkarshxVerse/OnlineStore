import React from 'react'
import ProductCard from '../Components/productCard'
import { Link } from 'react-router-dom'

export default function home() {
    return (
        <div>
            <div className=' w-full h-150 bg-cover bg-center relative' style={{ backgroundImage: "url(../newbanner.jpg)" }}>
                <h1 className='text-white font-extrabold text-8xl font-mono absolute top-[50px] left-35 '>Shop Smart, Live Smarter</h1>
                <Link to={"/store"}>
                    <button className='absolute top-[170px] left-[660px] bg-[#27168C] text-white px-4 py-3 rounded-lg font-extrabold hover:bg-[#492CAA] hover:text-white transition-all '>
                        BROWSE PRODUCTS
                    </button>
                </Link>
            </div>
            <div className='max-w-full flex-wrap'>
                <ProductCard />
            </div>
        </div>
    )
}

