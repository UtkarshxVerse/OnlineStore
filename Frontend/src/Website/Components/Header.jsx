import { useEffect } from "react";
import { FaShoppingCart, FaAngleDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { lsToCart } from "../../redux/features/cartSlice";

const Header = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user.data);

    useEffect(
        () => {
            dispatch(lsToCart());
        }, []
    )
    return (
        <header className="w-full bg-white shadow-sm px-6 py-1 flex items-center justify-between text-sm font-medium ">
            {/* Center: Logo and navigation */}
            <div className="flex items-center gap-100">
                {/* Logo */}
                <Link>
                    <div>
                        <img src="logo.png" alt="" width='150px' />
                    </div>
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-6 font-bold text-[16px]">
                    <Link to={"/"}>
                        <div className="cursor-pointer">HOMES <FaAngleDown className="inline ml-1" /></div>
                    </Link>
                    <div className="cursor-pointer">PAGES <FaAngleDown className="inline ml-1" /></div>
                    <Link to={"/store"}>
                        <div className="cursor-pointer">PRODUCTS <FaAngleDown className="inline ml-1" /></div>
                    </Link>
                    <Link to={"/contact"}>
                        <div className="cursor-pointer">CONTACT US</div>
                    </Link>
                </nav>
            </div>

            {/* Right: User actions */}
            <div className="flex items-center gap-10">

                <div className="text-right">
                    <div className="text-xs text-gray-500">WELCOME</div>
                    {
                        user == null ?
                            <Link to={"/login?ref=header"}>
                                <div className="font-bold cursor-pointer hover: underline">LOG IN / REGISTER</div>
                            </Link>
                            :
                            <div className="font-bold cursor-pointer hover: underline">LOGOUT</div>
                    }
                </div>

                {/* Auth & Cart */}
                <Link to={"/cart"}>
                    <div className=" flex items-center gap-2 cursor-pointer">
                        <div className="relative flex items-center">
                            <FaShoppingCart className="text-xl " />
                            <div className="absolute -top-4 -right-2  bg-teal-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cart.items.length}</div>
                        </div>
                        <span className="font-semibold">${cart.final_total}</span>
                    </div>
                </Link>
            </div>
        </header>
    );
}

export default Header;