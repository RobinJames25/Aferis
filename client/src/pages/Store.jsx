import Header from "../components/Header";
import Footer from "../components/Footer.jsx";
import HeroBanner from '../components/HeroBanner.jsx';
import Products from "../components/Products.jsx";
import Wrapper from "../components/Wrapper.jsx";
import { Provider } from "react-redux";
import store from '../store/store.js';
import '../styles/globals.css';

export default function Store({ products }) {
    return (
        <Provider store={store}>
            <Header />
            <HeroBanner />
            <Wrapper>
                <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
                    <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                        Cushioning for Your Miles
                    </div>
                    <div className="text-md md:text-xl">
                        A lightweight Nike ZoomX midsole is combined with increased stack heights to help provide cushioning during extended stretches of running.
                    </div>
                </div>
                <div>
                    <Products />
                </div>
            </Wrapper>
            <Footer />
        </Provider>
    );
}
