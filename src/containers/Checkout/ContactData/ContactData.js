import React,{Component} from 'react';
import Button from '../../../componets/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders'
import Spinner from '../../../componets/UI/Spinner/Spinner';
import Input from '../../../componets/UI/Input/Input';


class ContactData extends Component {
    state ={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Your name'
                },
                value:''
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Your email'
                },
                value:''
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Street'
                },
                value:''
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Zip Code'
                },
                value:''
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Country'
                },
                value:''
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options: [
                        {value:'fastest', displayValue: 'Fastest'},
                        {value:'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value:''
            }
        },
       
        loading:false
    }
    orderHandler = (event)=>{
        event.preventDefault();
        console.log("Contact Data.js",this.props.ingredients)
        this.setState({loading:true})

        const order = {
            ingredients: this.state.ingredients,
            price:this.props.price
        }
        // alert('You continue!')
        axios.post('/orders.json',order).then(response=>{
            this.setState({loading:false, purchasing:false})
            this.props.history.push('/')
            // console.log(response.data)
        }).catch(error=>{
            this.setState({loading:false, purchasing:false})
            console.log(error)
        })
    }
    render(){
        let form = (<form >
        {/* <Input inputType="input" type="text" name="name" placeholder="Your Name"  /> */}
        <Input elementType="..." elementConfig="..." value=".."  />

             <Input inputtype="input" className={classes.Input} type="text" name="name" placeholder="Your Name" />
            <Input inputtype="input" className={classes.Input} type="text" name="email" placeholder="Your Email" />       
            <Input inputtype="input" className={classes.Input} type="text" name="street" placeholder="Your Locality" />   
            <Input inputtype="input" className={classes.Input} type="text" name="postal" placeholder="Your Postal Code" />
            <Button btnType="Success" clicked={this.orderHandler} >ORDER</Button>
        </form>);
        if(this.state.loading){
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;