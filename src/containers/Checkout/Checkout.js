import React,{Component} from 'react';
import CheckoutSummary from '../../componets/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients:null,
        price:0
    }
    // Access of qury param in componentWillMount in componentDidMount it gave error
    componentWillMount(){
        // console.log("[Checkout.js]", this.props)
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for(let param of query.entries()){
            // ['salad', '1']
            // console.log(param)
            if(param[0] === 'price'){
                price =param[1]

            }else{
                ingredients[param[0]] = +param[1];
            }
            
            this.setState({
                ingredients:ingredients,
                totalPrice:price
            })
        }
    }
    checkoutCancelledHandler = ()=>{
        this.props.history.goBack();
    }

    checkoutContinuedHandler = ()=>{
        this.props.history.replace('/checkout/contact-data')
    }

    render(){

        return(
            <div>
                <CheckoutSummary
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
                ingredients={this.state.ingredients} />
                {/* <Route path={this.props.match.url + "/contact-data"} component={ContactData} /> */}

                {/* Pass the data throigh props in Route */}
                <Route path={this.props.match.url + "/contact-data"} 

                // Passing props to <ContactData />
                render={(props)=> 
                (<ContactData 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice} 
                {...props}
                />)} />
            </div>
        );
    }
}

export default Checkout;