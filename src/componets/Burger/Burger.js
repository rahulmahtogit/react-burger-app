import React, {Componet} from 'react'
import {withRouter} from 'react-router-dom';
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    console.log(props)
    const isIngrAdded = Object.values(props.ingredients).find(igVal => igVal !== 0)
    const transformedIngredients = isIngrAdded ? Object.keys(props.ingredients).map(
        igKey => {
            return [...Array(props.ingredients[igKey])].map((_,i)=>{       
              return  <BurgerIngredient key={igKey+i} type={igKey} />
            })
        }
    ): <p>Please Add ingredients</p>
    
   return (
      <div className={classes.Burger}>
          <BurgerIngredient type="bread-top" />
           {transformedIngredients}
          <BurgerIngredient type="bread-bottom" />

      </div>
   );

};

// export default burger;
// You can get access to all props from adjacent parent
export default withRouter(burger);