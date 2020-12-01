import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary'
import Burger from '../../componets/Burger/Burger'
import BuildControls from '../../componets/Burger/BuildControls/BuildControls'
import OrderSummary from '../../componets/OrderSummary/OrderSummary'
import Modal from '../../componets/UI/Modal/Modal'


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
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false

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
        alert('You continue!')
        // this.setState({
        //     purchasing: false
        // })
    }




    render() {
        const disableInfo = { ...this.state.ingredients }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler} >
                    <OrderSummary 
                    ingredients={this.state.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                     />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disableInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;