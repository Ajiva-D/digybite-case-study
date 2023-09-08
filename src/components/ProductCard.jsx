import { useState } from "react"

/* eslint-disable react/prop-types */
const ProductCard = ({ code, name, price, bg, discount, onUpdateCart }) => {
	const [amount, setAmount] = useState(1)
	return (
		<div className={`p-6 rounded ${bg} text-left`}>
			<img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2960&q=80" alt="placeholder" className="w-full object-contain pb-4" />
			<h5>{name}</h5>
			<div className="flex gap-1">
				<p className=" text-gray-500">${price}</p>
				{!!discount && <p className=" text-gray-500"> - {discount}</p>}
			</div>
			<input type="number" name="amount" id="amount" className="rounded p-2 bg-white border border-black w-full" value={amount} onChange={(e) => setAmount(e.target.value)} />
			<button className="bg-black text-white rounded p-3 w-full mt-4" onClick={() => onUpdateCart({ code, amount, name, price })}>Add to cart</button>
		</div>
	)
}

export default ProductCard