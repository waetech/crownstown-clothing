import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';

import {selectCartHidden, selectCartItemsCount} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';

import './header.styles.scss';
import CartDropown from '../cart-dropdown/cart-dropdown.component';


const Header = ({ currentUser, hidden }) => (
    <div className='header'>
       <Link to="/">
        <Logo className='logo'/>
       </Link>
        <div className='options'>
            <Link className='option'>
                SHOP
            </Link>
                <Link className='option'>
                  CONTACT
                </Link>
                {
                    currentUser ?
                    <div className='option' onClick={() => auth.signOut()}>
                        SIGN OUT
                        </div>
                    :
                    <Link className='option' to='/signin'>
                        SIGN IN
                    </Link>
                }
                <CartIcon />
            </div>
            {hidden ? null : <CartDropown />}
      </div>
);


const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);