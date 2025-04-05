import Header from "../components/Header";
import Footer from "../components/Footer.jsx";
import { Provider } from "react-redux";
import store from '../store/store.js';
import '../styles/globals.css';


export default function Store() {
    return(
        <Provider store={store}>
            <Header />
            <Footer />
        </Provider>
    )
}