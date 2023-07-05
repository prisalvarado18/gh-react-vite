import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import axios from 'axios';
import IconUpdate from '../assets/icon-button-update.png';
import IconDelete from '../assets/icon-button-delete.png';
import ModalCreateProduct from './modals/ModalCreateProduct.jsx';
import ModalUpdateProduct from './modals/ModalUpdateProduct';
import ModalDeleteProduct from './modals/ModalDeleteProduct';
import '../styles/Products.css';

const Products = () => {
	const [products, setProducts] = useState([]);
	const [productsObtained, setProductsObtained] = useState(false);
	const [ modalOpenStatus, setModalOpenStatus ] = useState(false);

	const openTheModal = () => {
		setModalOpenStatus(true);
	}
	
	const closeTheModal = () => {
		setModalOpenStatus(false);
	}

	useEffect(() => {
		const token = localStorage.getItem('token');
		let headers = { Authorization: `Bearer ${token}` };

		if (!productsObtained) {
			axios
				.get(
					'https://palvaradoristorante.onrender.com/products?limit=20&page=1',
					{ headers }
				)
				.then((response) => {
					setProducts(response.data);
					setProductsObtained(true);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, []);

	const [addedProduct, setAddedProduct] = useState({
		name: '',
		price: '',
		image: '',
		type: '',
	});

	const handleChange = ({ target }) => {
		console.log(target.value)
		setAddedProduct({
			...addedProduct,
			[target.name]: target.value,
		});
		console.log(addedProduct)
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		
		const token = localStorage.getItem('token');
		let headers = { Authorization: `Bearer ${token}` };
		const url = `https://palvaradoristorante.onrender.com/products`;

		const newProduct = {
			...addedProduct,
			price: parseFloat(addedProduct.price),
		}
		
		axios
			.post(url, newProduct, { headers })
			.then((response) => {
				console.log(response);
				closeTheModal();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	/*Update */
	const [modalUpdate, setModalUpdate] = useState(false);

	const openModalToUpdate = () => {
		setModalUpdate(true);
	}

	const closeModaleToUpdate = () => {
		setModalUpdate(false);
	}

	const chooseProduct = (product) => {
		setAddedProduct({
			name: product.name,
			price: product.price,
			image: product.image,
			type: product.type,
			id: product._id,
		})
	}

	const handleUpdateChange = ({ target }) => {
		console.log(target.value)
		setAddedProduct({
			...addedProduct,
			[target.name]: target.value,
		});
		console.log(addedProduct)
	};

	const handleUpdate = (event) => {
		event.preventDefault();

		const token = localStorage.getItem('token');
		let headers = { Authorization: `Bearer ${token}` };
		const url = `https://palvaradoristorante.onrender.com/products/${addedProduct.id}`;

		const newProduct = {
			...addedProduct,
			price: parseFloat(addedProduct.price),
		}
		
		axios
			.put(url, newProduct, { headers })
			.then((response) => {
				console.log(response);
				closeModaleToUpdate();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	/*Delete */
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
		const url = `https://palvaradoristorante.onrender.com/products/${addedProduct.id}`;

		/*const newProduct = {
			...addedProduct,
			price: parseFloat(addedProduct.price),
		}*/
		
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
			<section className="products-main">
				<section className="products-body">
					<section className="products-container">
						<button className="create-product-btn" onClick={openTheModal}>create</button>
						<table className="products-table">
							<thead>
								<tr>
									<th>Product</th>
									<th>Price</th>
									<th>Type</th>
									<th>Upd</th>
									<th>Del</th>
								</tr>
							</thead>
							<tbody>
								{products.map((product) => (
									<tr key={product._id}>
										<td>{product.name}</td>
										<td>{product.price}</td>
										<td>{product.type}</td>
										<td>
											<button className="update-product-btn" onClick={()=> {openModalToUpdate(); chooseProduct(product)}}>
												<img src={IconUpdate} alt="" />
											</button>
										</td>
										<td>
											<button className="delete-product-btn" onClick={()=> {openModalToDelete(); chooseProduct(product)}}>
												<img src={IconDelete} alt="" />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</section>
					{modalOpenStatus && <ModalCreateProduct setOpenModal={closeTheModal} handleChange={handleChange} handleCreate={handleSubmit} />}
					{modalUpdate && <ModalUpdateProduct setOpenModal={closeModaleToUpdate} handleChange={handleUpdateChange} handleUpdate={handleUpdate} name={addedProduct.name} price={addedProduct.price} image={addedProduct.image} type={addedProduct.type} />}
					{modalDelete && <ModalDeleteProduct setOpenModal={closeModaleToDelete} handleDelete={handleDelete}/>}

				</section>
			</section>
		</>
	);
};

export default Products;
