import React from 'react';
import '../styles/ModalDelivered.css';

function ModalCreateProduct({ setOpenModal, handleCreate, handleChange }) {
	return (
		<div className="modal-background">
			<div className="modal-container">
				<div className="title-close-btn">
					<button
						onClick={() => {
							setOpenModal(false);
						}}
					>
						X
					</button>
				</div>
				<div className="title">
					<h1>CARA</h1>
				</div>
				<p>Create a product</p>
				<form className="body" onSubmit={handleCreate}>
					<input onChange={handleChange} type='text' placeholder='name' name='name'/>
					<input onChange={handleChange} type='number' placeholder='price' name='price'/>
					<input onChange={handleChange} type='text' placeholder='image URL' name='image'/>
					<select onChange={handleChange} name='type'>
						<option>Breakfast</option>
						<option>Lunch</option>
						<option>Dinner</option>
						<option>Drinks</option>
					</select>
					<input type='submit' value='Create' className='create-product-button'/>
				</form>
			</div>
		</div>
	);
}

export default ModalCreateProduct;
