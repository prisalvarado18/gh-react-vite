import React from 'react';
import '../../styles/ModalDelivered.css';

function ModalUpdateUser({ setOpenModal, handleUpdate, handleChange, email, addedUser }) {
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
					<input defaultValue={email} onChange={handleChange} type='text' placeholder='email' name='email'/>
					<select defaultValue={addedUser.roles?.admin ? 'Admin' : 'User'} onChange={handleChange} name='roles'>
						<option value='User'>User</option>
						<option value='Admin'>Admin</option>
					</select>
					<input type='submit' value='Update' className='create-product-button'/>
				</form>
			</div>
		</div>
	);
}

export default ModalUpdateUser;
