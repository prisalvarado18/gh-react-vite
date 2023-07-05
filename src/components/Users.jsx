import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import axios from 'axios';
import IconUpdate from '../assets/icon-button-update.png';
import IconDelete from '../assets/icon-button-delete.png';
import ModalCreateUser from './modals/ModalCreateUser';
import ModalUpdateUser from './modals/ModalUpdateUser';
import ModalDeleteUser from './modals/ModalDeleteUser';
import '../styles/Users.css';

const Users = () => {
	const [users, setUsers] = useState([]);
  const [usersObtained, setUsersObtained] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    let headers = { Authorization: `Bearer ${token}` };

    if (!usersObtained) {
      axios.get('https://palvaradoristorante.onrender.com/users?limit=10&page=1', { headers })
        .then((response) => {
          setUsers(response.data);
          setUsersObtained(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const handleSubmit = (event) => {
		event.preventDefault();
		
		const token = localStorage.getItem('token');
		let headers = { Authorization: `Bearer ${token}` };
		const url = `https://palvaradoristorante.onrender.com/users`;

		axios
			.post(url, addedUser, { headers })
			.then((response) => {
				console.log(response);
				closeTheModal();
			})
			.catch((error) => {
				console.log(error);
			});
	};

  /*Create User */

  const [ modalOpenStatus, setModalOpenStatus ] = useState(false);

	const openTheModal = () => {
		setModalOpenStatus(true);
	}
	
	const closeTheModal = () => {
		setModalOpenStatus(false);
	}

  const [addedUser, setAddedUser] = useState({
		email: '',
		password: '',
		roles: {
      name: '',
      admin: false
    },
	});

	const handleChange = ({ target }) => {
    const { name, value } = target;
  
    if (name === 'roles') {
      setAddedUser((prevState) => ({
        ...prevState,
        roles: {
          ...prevState.roles,
          admin: value === 'Admin',
        },
      }));
    } else if (name === 'name') {
      setAddedUser((prevState) => ({
        ...prevState,
        roles: {
          ...prevState.roles,
          name: value,
        },
      }));
    } else {
      setAddedUser((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  /* Update User*/
  const [modalUpdate, setModalUpdate] = useState(false);

	const openModalToUpdate = () => {
		setModalUpdate(true);
	}

	const closeModalToUpdate = () => {
		setModalUpdate(false);
	}

  const [userId, setUserId] = useState('');


	const chooseUser = (user) => {
    setUserId(user._id);
		setAddedUser({
			email: user.email,
			password: user.password,
		});
	}

	const handleUpdateChange = ({ target }) => {
		const { name, value } = target;
  
    if (name === 'roles') {
      setAddedUser((prevState) => ({
        ...prevState,
        roles: {
          ...prevState.roles,
          admin: value === 'Admin',
        },
      }));
    } else if (name === 'name') {
      setAddedUser((prevState) => ({
        ...prevState,
        roles: {
          ...prevState.roles,
          name: value,
        },
      }));
    } else {
      setAddedUser((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
	};

	const handleUpdate = (event) => {
		event.preventDefault();

		const token = localStorage.getItem('token');
		let headers = { Authorization: `Bearer ${token}` };
		const url = `https://palvaradoristorante.onrender.com/users/${userId}`;

		axios
			.put(url, addedUser, { headers })
			.then((response) => {
				console.log(response);
				closeModalToUpdate();
			})
			.catch((error) => {
				console.log(error);
			});
	};

  /**Delete */
  const [modalDelete, setModalDelete] = useState(false);

	const openModalToDelete = () => {
		setModalDelete(true);
	}

	const closeModaleToDelete = () => {
		setModalDelete(false);
	}

	const handleDelete = () => {

		const token = localStorage.getItem('token');
		let headers = { Authorization: `Bearer ${token}` };
		const url = `https://palvaradoristorante.onrender.com/users/${userId}`;
		
		axios
			.delete(url, { headers })
			.then((response) => {
				console.log(response);
				closeModaleToDelete();
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
						<button className="create-user-btn" onClick={openTheModal}>create</button>
						<table className="users-table">
							<thead>
								<tr>
									<th>Role</th>
									<th>Email</th>
									<th>Upd</th>
									<th>Del</th>
								</tr>
							</thead>
							<tbody>
								{users.map((user) => (
									<tr key={user._id}>
										<td>{user.roles.admin? 'admin' : 'user'}</td>
										<td>{user.email}</td>
										<td>
											<button className="update-user-btn" onClick={()=> {openModalToUpdate(); chooseUser(user)}}>
												<img src={IconUpdate} alt="" />
											</button>
										</td>
										<td>
											<button className="delete-user-btn" onClick={()=> {openModalToDelete(); chooseUser(user)}}>
												<img src={IconDelete} alt="" />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</section>
					{modalOpenStatus && <ModalCreateUser setOpenModal={closeTheModal} handleChange={handleChange} handleCreate={handleSubmit} addedUser={addedUser}/>}
					{modalUpdate && <ModalUpdateUser setOpenModal={closeModalToUpdate} handleChange={handleUpdateChange} handleUpdate={handleUpdate} email={addedUser.email} password={addedUser.password} addedUser={addedUser} />}
					{modalDelete && <ModalDeleteUser setOpenModal={closeModaleToDelete} handleDelete={handleDelete}/>}

				</section>
			</section>
		</>
	);
};

export default Users;
