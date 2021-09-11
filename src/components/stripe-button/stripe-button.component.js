import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';

import { clearCart } from '../../redux/cart/cart.actions';

const StripeCheckoutButton = ({ price, clearCart }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51JXvg8KQOzZKN9an5xRjR1OrlfNv89lBI7xJUh8UH9FAevwnHCsQyWT3ftwgkCCdkSmoBElV8YL7zq7ddZTnQQiZ00haA8zMIb';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
        clearCart();
    };

    return (
        <StripeCheckout label='Pay Now' name='CRWN Clothing Ltd.' billingAddress shippingAddress image='https://svgshare.com/i/CUz.svg' description={ `Your total is $${ price }` } amount={ priceForStripe } panelLabel='Pay Now' token={ onToken } stripeKey={ publishableKey } />
    );
};

const mapDispatchToProps = dispatch => ({
    clearCart: item => dispatch(clearCart(item))
});

export default connect(null, mapDispatchToProps)(StripeCheckoutButton);