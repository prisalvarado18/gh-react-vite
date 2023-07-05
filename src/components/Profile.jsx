import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import axios from 'axios';
import '../styles/Users.css';

const Profile = () => {
	const [user, setUser] = useState({
    email: '',
    password: '',
    roles: ''
  });

	const [userObtained, setUserObtained] = useState(false);

	useEffect(() => {
    const userId = localStorage.getItem('userId');
		const token = localStorage.getItem('token');
		let headers = { Authorization: `Bearer ${token}` };

		if (!userObtained) {
			axios
				.get(
					`https://palvaradoristorante.onrender.com/users/${userId}`,
					{ headers }
				)
				.then((response) => {
					setUser(response.data);
					setUserObtained(true);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, []);


	/* Update User*/

	const [newData, setNewData] = useState({});

	const handleUpdateChange = ({ target }) => {
		const { name, value } = target;

		if (name === 'roles') {
			setNewData((prevState) => ({
				...prevState,
				roles: {
					...prevState.roles,
					admin: value === 'Admin',
				},
			}));
		} else {
			setNewData((prevState) => ({
				...prevState,
				[name]: value,
			}));
		}
	};

	const handleUpdate = (event) => {
		event.preventDefault();
   	const userId = localStorage.getItem('userId');
		const token = localStorage.getItem('token');
		let headers = { Authorization: `Bearer ${token}` };
		const url = `https://palvaradoristorante.onrender.com/users/${userId}`;

		axios
			.put(url, newData, { headers })
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<Menu />
			<section className="users-main">
				<section className="users-body">
					<section className="users-container">
            <div className="title">
            <h1>CARA</h1>
            </div>
            <p>Create a product</p>
            <form className="body" onSubmit={(event)=> handleUpdate(event)}>
              <input defaultValue={user.email} onChange={handleUpdateChange} type='text' placeholder='email' name='email'/>
			        <input type='password' name='password' autoComplete='current-password'/>
              <select defaultValue={user.roles?.admin ? 'Admin' : 'User'} onChange={handleUpdateChange} name='roles'>
                <option value='User'>User</option>
                <option value='Admin'>Admin</option>
              </select>
              <input type='submit' value='Update' className='create-product-button'/>
            </form>
          </section>
				</section>
			</section>
		</>
	);
};

export default Profile;
