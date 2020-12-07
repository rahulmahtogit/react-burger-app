import React,{Component} from 'react';
import Button from '../../../componets/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders'
import Spinner from '../../../componets/UI/Spinner/Spinner';


class ContactData extends Component {
    state ={
        name:"",
        email:"",
        address:{
            street:"",
            pincode:""
        },
        loading:false
    }
    orderHandler = (event)=>{
        event.preventDefault();
        console.log("Contact Data.js",this.props.ingredients)
        this.setState({loading:true})

        const order = {
            ingredients: this.state.ingredients,
            price:this.props.price,
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
            this.props.history.push('/')
            // console.log(response.data)
        }).catch(error=>{
            this.setState({loading:false, purchasing:false})
            console.log(error)
        })
    }
    render(){
        let form = (<form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name" ></input>
            <input className={classes.Input} type="text" name="email" placeholder="Your Email" ></input>
            <input className={classes.Input} type="text" name="street" placeholder="Your Locality" ></input>
            <input className={classes.Input} type="text" name="postal" placeholder="Your Postal Code" ></input>
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