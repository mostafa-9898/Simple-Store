import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// svg icons
import cart from '../../assets/icons/shop.svg'

// Context
import { CardContext } from '../../context/CartContextProvider';

// Styles
import styles from './Navbar.module.css'

const Navbar = () => {

    const { state } = useContext(CardContext)

    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                <Link to='/products' className={styles.productLink} >Products</Link>
                <div className={styles.iconContainer}>
                    <Link to='/shopcart' ><img src={cart} alt='shop' /></Link>
                    <span>{state.itemsCounter}</span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;