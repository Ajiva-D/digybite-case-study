import { useState } from 'react'
import './App.css'
import ProductCard from './components/ProductCard'

const products = [
	{
		code: "R01",
		name: "Red Plate",
		price: 32.95,
		bg: "bg-red-400",
		discount: "Buy 1 get 1 half price"
	},
	{
		code: "G01",
		name: "Green Plate",
		price: 24.95,
		bg: "bg-green-300"
	},
	{
		code: "B01",
		name: "Blue Plate",
		price: 7.95,
		bg: "bg-blue-300"
	}
]

function App() {

	const [cart, setCart] = useState([])

	const updateCart = (item) => {
		const hasItem = cart.findIndex((cartItem) => cartItem.code === item.code)
		if (hasItem !== -1) {
			const newCart = [...cart]
			newCart[hasItem].amount = parseInt(item.amount) + parseInt(newCart[hasItem].amount)

			setCart(newCart)
		}
		else {
			setCart([...cart, item])
		}
	}

	const subTotal = () => {
		return cart.reduce((acc, item) => {
			const code = "R01";
			let itemPrice = item.price * item.amount;
			if (item.code === code) {
				if (item.amount % 2 === 0) {
					const halfPrice = itemPrice * 0.25
					console.log('itemPrice:', halfPrice);
					itemPrice = itemPrice - halfPrice

				} else if (item.amount > 1) {
					itemPrice = item.price * (item.amount - 1)
					itemPrice = (itemPrice - itemPrice / 2) + item.price
				}
			}
			return acc += itemPrice
		}, 0)
	}

	const getDeliveryPrice = () => {
		const subTotalVal = subTotal()
		if (subTotalVal < 50) {
			return ({
				price: 4.95,
				description: "For Items less than $50"
			})
		} else if (subTotalVal > 50 && subTotalVal < 90) {
			return ({
				price: 2.95,
				description: "For Items between $50 and $90"
			})
		}
		return ({
			price: 0,
			description: "Free For Items over $90"
		})
	}

	const getTotalPrice = () => {
		return subTotal() + getDeliveryPrice().price
	}

	return (
		<main className='grid grid-cols-12 gap-4 px-6 py-10'>
			<section className=' col-span-9'>
				<h1 className=' font-semibold text-4xl mb-4'>Digybite Case Study</h1>
				<div className="grid grid-cols-3 gap-4">
					{
						products.map((product) => <ProductCard key={product.code} name={product.name} price={product.price} bg={product.bg} code={product.code} onUpdateCart={(e) => updateCart(e)} discount={product.discount} />)
					}
				</div>
			</section>
			<section className=' col-span-3'>
				<h2 className='font-semibold text-2xl mb-4 text-center'>Cart</h2>
				{cart.length <= 0 ? <div className='text-center border border-gray-100 py-20'>
					<h6>Your Cart is Empty!</h6>
					<p>Add items to see them here</p>
				</div> :

					<div className='border border-gray-100 p-10'>
						{cart.map((item) => <div key={item.code} className='mb-5'>
							<h6>Name: {item.name} </h6>
							<p className=' text-gray'>Price: ${item.price} </p>
							<p className=' text-gray'>Amount of items: {item.amount} </p>
						</div>)}

						<p>Subtotal: ${subTotal()}</p>
						<p>Delivery Price: ${getDeliveryPrice().price} - {getDeliveryPrice().description}</p>
						<p>Total Price: <span className='font-bold'>${getTotalPrice()}</span></p>
					</div>}
			</section>
		</main>
	)
}

export default App
