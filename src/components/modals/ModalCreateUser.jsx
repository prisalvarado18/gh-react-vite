import React from 'react';
import '../../styles/ModalDelivered.css';

function ModalCreateUser({ setOpenModal, handleCreate, handleChange, addedUser }) {
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
					<input onChange={handleChange} type='text' placeholder='email address' name='email'/>
					<input onChange={handleChange} type='password' placeholder='password' name='password'/>
                    <input onChange={handleChange} type='text' placeholder='name' name='name' value={addedUser.name}/>
					<select onChange={handleChange} name='roles' value={addedUser.roles.admin ? 'Admin' : 'User'}>
						<option value='User'>User</option>
						<option value='Admin'>Admin</option>
					</select>
					<input type='submit' value='Create' className='create-product-button'/>
				</form>
			</div>
		</div>
	);
}

export default ModalCreateUser;