import React from 'react';
import shoe1 from '../images/p1.png';
import shoe2 from '../images/p2.png';
import shoe3 from '../images/p3.png';
import shoe4 from '../images/p4.png';
import shoe5 from '../images/p5.png';
import shoe6 from '../images/p6.png';
import shoe7 from '../images/p7.png';
import shoe8 from '../images/slide-1.png';
import shoe9 from '../images/slide-2.png';

const ProductData = [
    {
        id: 1,
        name: 'Air Jordan XXXVII Low PF',
        newPrice: 16295,
        oldPrice: 18295,
        discount: 10.93,
        image: { desktop: shoe1 }
    },
    {
        id: 2,
        name: 'Air Jordan 1 Mid SE',
        newPrice: 12295,
        oldPrice: 20000,
        discount: 38.52,
        image: { desktop: shoe2 }
    },
    {
        id: 3,
        name: 'Jordan Why Not .6 PF',
        newPrice: 13995,
        oldPrice: 16995,
        discount: 17.65,
        image: { desktop: shoe3 }
    },
    {
        id: 4,
        name: 'Jordan Stay Loyal 2',
        newPrice: 10295,
        oldPrice: 20295,
        discount: 49.27,
        image: { desktop: shoe4 }
    },
    {
        id: 5,
        name: 'Air Jordan 13 Retro',
        newPrice: 19295,
        oldPrice: 40000,
        discount: 51.76,
        image: { desktop: shoe5 }
    },
    {
        id: 6,
        name: 'Air Jordan 6 Retro',
        newPrice: 18395,
        oldPrice: 23000,
        discount: 20.02,
        image: { desktop: shoe6 }
    },
    {
        id: 7,
        name: 'Air Jordan 1 Retro High',
        newPrice: 16995,
        oldPrice: 51000,
        discount: 66.68,
        image: { desktop: shoe7 }
    },
    {
        id: 8,
        name: 'Air Jordan 1 Mid SE Craft',
        newPrice: 10295,
        oldPrice: 20295,
        discount: 49.27,
        image: { desktop: shoe8 }
    },
    {
        id: 9,
        name: 'Jordan Stay Loyal 2',
        newPrice: 10295,
        oldPrice: 20295,
        discount: 49.27,
        image: { desktop: shoe9 }
    }
];

const Products = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {ProductData.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img 
                        src={product.image.desktop} 
                        alt={product.name} 
                        className="w-full h-60 object-cover"
                    />
                    <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                        <p className="text-gray-500 mb-2">{product.discount}% off</p>
                        <p className="text-lg font-bold text-gray-800">
                            <span className="line-through text-gray-500">${product.oldPrice}</span> 
                            ${product.newPrice}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Products;
