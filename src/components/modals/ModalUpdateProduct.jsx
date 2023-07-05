import React from 'react';
import '../../styles/ModalDelivered.css';

function ModalUpdateProduct({ setOpenModal, handleUpdate, handleChange, name, price, image, type }) {
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
				<form className="body" onSubmit={(event)=> handleUpdate(event)}>
					<input defaultValue={name} onChange={handleChange} type='text' placeholder='name' name='name'/>
					<input defaultValue={price} onChange={handleChange} type='number' placeholder='price' name='price'/>
					<input defaultValue={image} onChange={handleChange} type='text' placeholder='image URL' name='image'/>
					<select defaultValue={type} onChange={handleChange} name='type'>
						<option>Breakfast</option>
						<option>Lunch</option>
						<option>Dinner</option>
						<option>Drinks</option>
					</select>
					<input type='submit' value='Update' className='create-product-button'/>
				</form>
			</div>
		</div>
	);
}

export default ModalUpdateProduct;
