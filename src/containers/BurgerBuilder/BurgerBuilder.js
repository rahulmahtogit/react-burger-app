import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../componets/Burger/Burger'
import BuildControls from '../../componets/Burger/BuildControls/BuildControls'
import OrderSummary from '../../componets/OrderSummary/OrderSummary'
import Modal from '../../componets/UI/Modal/Modal'
import axios from '../../axios-orders'
import Spinner from '../../componets/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
}
class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state ={...}
    // }
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading:false,
        error:false

    }
     componentDidMount(){
         axios.get('/ingredients.json').then(res=>{
            //  console.log(res)
             this.setState({ingredients:res.data})
         }).catch(error =>{
            this.setState({error:true})
         })
     }
 
    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0)
        this.setState({
            purchaseable: sum > 0
        })


    }

    removeIngredientHandler = (itemtype) => {
        if (this.state.ingredients[itemtype] <= 0) {
            return;
        }
        const updatedIngredients = { ...this.state.ingredients }

        updatedIngredients[itemtype] = updatedIngredients[itemtype] - 1

        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - INGREDIENT_PRICES[itemtype]
        console.log(itemtype, newPrice)
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice

        })
        this.updatePurchaseState(updatedIngredients)
    }

    addIngredientHandler = (itemtype) => {
        const updatedIngredients = { ...this.state.ingredients }
        updatedIngredients[itemtype] = updatedIngredients[itemtype] + 1

        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + INGREDIENT_PRICES[itemtype]
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice

        });
        this.updatePurchaseState(updatedIngredients);

    }

    purchaseHandler = () =>  {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () =>  {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () =>  {
        this.setState({loading:true})

        const order = {
            ingredients: this.state.ingredients,
            price:this.state.totalPrice,
            customer:{
                name:"Rahul",
                address:{
                    city:"Delhi",
                    state:"New Delhi",
                    country:"India"
                },
                email:"rahul@yumail.com",
                deliveryMethod:"fastest"
            }
        }
        // alert('You continue!')
        axios.post('/orders.json',order).then(response=>{
            this.setState({loading:false, purchasing:false})
            console.log(response.data)
        }).catch(error=>{
            this.setState({loading:false, purchasing:false})
            console.log(error)
        })
    
    }




    render() {
        const disableInfo = { ...this.state.ingredients }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null
        let burger = this.state.error ? <p>Ingredients can't be loaded</p>:<Spinner/>
       
        if(this.state.ingredients){
        burger = (            <Aux>
            <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disableInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}
                />
        </Aux>);
        if(this.state.loading){
               orderSummary = <Spinner />
                }
        orderSummary=  (<OrderSummary 
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
             />);

        }


        return (
            <Aux>
                <Modal show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
                
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios);