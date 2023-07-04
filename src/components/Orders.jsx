import React from "react";
import Menu from "./Menu";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import OtroHeader from "./OtroHeader";
import LoggedinHeader from "./LoggedinHeader";
import '../styles/Orders.css';
import ModalDelivered from "./modals/ModalDelivered";
import ModalCancelled from "./modals/ModalCancelled";

const Orders = () => {
  const [products, setProducts] = useState([]);
  const [productsType, setProductsType] = useState([]);
  const [productsObtained, setProductsObtained] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    let headers = { Authorization: `Bearer ${token}` };

    if (!productsObtained) {
      axios.get('https://palvaradoristorante.onrender.com/products?limit=20&page=1', { headers })
        .then((response) => {
          /*console.log(response);*/
          setProducts(response.data);
          setProductsObtained(true);
          /*document.querySelector(".b-btn")[0].click();*/
        })
        .catch((error) => {
          console.error(error);
        });
    }
    breakfastList();
  }, [productsObtained]);

  const breakfastList = () => {
    /*console.log(products)*/
    if (products && products.length) {
      const breakfast = products.filter((product) => product.type === 'Breakfast');
      console.log(breakfast);
      setProductsType(breakfast);
    }
  }

  const lunchList = () => {
    /*console.log(products)*/
    if (products && products.length) {
      const lunch = products.filter((product) => product.type === 'Lunch');
      /*console.log(lunch);*/
      setProductsType(lunch);
    }
  }

  const dinnerList = () => {
    /*console.log(products)*/
    if (products && products.length) {
      const dinner = products.filter((product) => product.type === 'Dinner');
      /*console.log(dinner);*/
      setProductsType(dinner);
    }
  }

  const drinksList = () => {
    /*console.log(products)*/
    if (products && products.length) {
      const drinks = products.filter((product) => product.type === 'Drinks');
      /*console.log(drinks);*/
      setProductsType(drinks);
    }
  }

  const [selectedItems, setSelectedItems] = useState([]);

  const addToCart = ({ _id: productId, name, price }) => {
    /*console.log(selectedItems);*/
    const existingProduct = selectedItems.find(
      (item) => item.productId === productId
    );

    if (existingProduct) {
      const updatedSelectedItems = selectedItems.map((item) => {
        if (item.productId === productId) {
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      });
      setSelectedItems(updatedSelectedItems);
    } else {
      setSelectedItems([...selectedItems, { qty: 1, productId, name, price }]);
      console.log(selectedItems);
    }
  };

  const [itemsCart, setItemsCart] = useState([]);

  const showItemsCart = (product) => {
    /*console.log(itemsCart);*/
    const existingProduct = itemsCart.find(
      (item) => item.name === product.name
    );

    if (!existingProduct) {
      setItemsCart(prevState => [...prevState, product]);
    }
  }

  /*const total = itemsCart.reduce((acc, item) => acc + (item.price * item.qty), 0);*/
  const [totalFee, setTotalFee] = useState(0);

  const calculateTotalFee = useCallback((price) => {
    setTotalFee(prevTotal => prevTotal + price);
  }, []);

  const [formData, setFormData] = useState({ client: '' });

  const setClientData = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const saveOrderToDatabase = () => {
    const token = localStorage.getItem('token')
    const url = 'https://palvaradoristorante.onrender.com/orders';
    let headers = { Authorization: `Bearer ${token}` };

    const order = {
      userId: localStorage.getItem('userId'),
      client: formData.client,
      status: 'pending',
      products: selectedItems
    };
    /*console.log(order);*/
    axios.post(url, order, { headers })
      .then(() => {
        document.querySelector('.input-name').value = '';
        setItemsCart([]);
        setSelectedItems([]);
        setTotalFee(0)
      })
      .catch((error) => {
        console.info(error);
      })
  }

  // Get Orders
  const [infoOrders, setInfoOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    let headers = { Authorization: `Bearer ${token}` };
    /*const cacheData = localStorage.getItem('infoOrders');*/

    /*if (cacheData) {
      setInfoOrders(JSON.parse(cacheData));
    } else {*/
    axios.get('https://palvaradoristorante.onrender.com/orders', { headers })
      .then((response) => {
        const filteredOrders = response.data.filter((order) => order.status === 'pending' || order.status === 'delivering');
        setInfoOrders(filteredOrders);
        /*localStorage.setItem('infoOrders', JSON.stringify(filteredOrders));*/
      })
      .catch((error) => console.error(error));
    //}
  }, []);

  // *** * *** * *** * *** * *** * *** * *** * *** * *** * *** * *** * *** * *** * *** * *** * *** * ***
  const [show, setShow] = useState(true);
  const [ modalOpenStatus, setModalOpenStatus ] = useState(false);
  
  const openTheModal = () => {
    setModalOpenStatus(true);
  }

  const closeTheModal = () => {
    setModalOpenStatus(false);
  }

  const [orderId, setOrderId] = useState('');

  const chooseOrder = (order) => {
    setOrderId(order._id);
  }

  const updateAsDelivered = () => {
    const token = localStorage.getItem('token');
    let headers = { Authorization: `Bearer ${token}` };
    const url = `https://palvaradoristorante.onrender.com/orders/${orderId}`;

    const statusUpdate = {
      status: 'delivered'
    }

    axios.put(url, statusUpdate, {headers}).then((response) => {
      console.log(response);
      closeTheModal();
    }).catch((error) => {
      console.log(error);
    })
  }
  
  //* * * * * * * * *  ** * * * * * * * * * * * 
  const [modalCancelledStatus, setModalCancelledStatus] = useState(false);
  const openTheCanceledModal = () => {
    setModalCancelledStatus(true);
}

const closeTheCanceledModal = () => {
  setModalCancelledStatus(false);
}

const updateStatusToCanceled = () => {
  const token = localStorage.getItem('token');
  let headers = { Authorization: `Bearer ${token}` };
  const url = `https://palvaradoristorante.onrender.com/orders/${orderId}`;
  const statusUpdate = {
    status: 'cancelled'
  }
  axios.put(url, statusUpdate, {headers}).then((response) => {
    console.log(response);
    closeTheCanceledModal();
  }).catch((error) => {
    console.info(error);
  })
}


  return (
    <>
      <Menu />
      <section className="orders-main">
        <section className="orders-body">
          <section className="client-name" style={{ display: show ? "block" : "none" }}>
            <input type="text" placeholder="client name" name="client" className="input-name" onChange={setClientData} required />
          </section>
          <section className="orders-container">
            <section className="product-table-btns-container" style={{ display: show ? "block" : "none" }}>
              <table className="product-table">
                <thead>
                  <tr>
                    <th>PRODUCT</th>
                    <th>PRICE</th>
                    <th>QTY</th>
                  </tr>
                </thead>
                <tbody>
                  {Array(16).fill().map((item, index) => (
                    <tr key={index}>
                      <td className="first-row">{itemsCart[index]?.name || ''}</td>
                      <td className="second-row">{itemsCart[index]?.price || ''}</td>
                      <td className="third-row">{selectedItems[index]?.qty}</td>
                    </tr>
                  ))}
                  <tr className="total-fee">
                    <td>Total fee</td>
                    <td colSpan="2">{totalFee}</td>
                  </tr>
                </tbody>
              </table>
              <section className="view-send-container" >
                <button className="send-btn" onClick={saveOrderToDatabase}>SEND</button>
                <button className="view-all-btn" onClick={() => setShow((shouldShow) => !shouldShow)}> VIEW ALL</button>
              </section>
            </section>

            <div className="menu-buttons" style={{ display: show ? "block" : "none" }}>
              <table>
                <tbody>
                  <tr>
                    <td className="border-bottom-btn">
                      <button className="type-btn" onClick={breakfastList} autoFocus>
                        <p>BREAKFAST</p>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-bottom-btn">
                      <button className="type-btn" onClick={lunchList}>
                        <p>LUNCH</p>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-bottom-btn">
                      <button className="type-btn" onClick={dinnerList}>
                        <p>DINNER</p>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button className="type-btn" onClick={drinksList}>
                        <p>DRINKS</p>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="product-selection" style={{ display: show ? "block" : "none" }}>
              <div className="product-row-first">
                {productsType.slice(0, 2).map((product, index) => (
                  <div className="product-item" key={index}>
                    <button className="product-btn" onClick={() => { addToCart(product); showItemsCart(product); calculateTotalFee(product.price); }}>
                      <figure className="image-container">
                        <img src={product.image} alt={product.name} />
                      </figure>
                      <p className="product-description">{product.name.toUpperCase()}</p>
                      <p className="product-price">{product.price.toFixed(2)}</p>
                    </button>
                  </div>
                ))}
              </div>
              <div className="product-row-second">
                {productsType.slice(2, 4).map((product, index) => (
                  <div className="product-item" key={index}>
                    <button className="product-btn" onClick={() => { addToCart(product); showItemsCart(product); calculateTotalFee(product.price); }}>
                      <figure className="image-container">
                        <img src={product.image} alt={product.name} />
                      </figure>
                      <p className="product-description">{product.name.toUpperCase()}</p>
                      <p className="product-price">{product.price.toFixed(2)}</p>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>


          <div className="orders-list-container" style={{ display: show ? "none" : "block" }}>
            <button className='back-btn' onClick={() => setShow((shouldShow) => !shouldShow)}> BACK </button>
            {
              infoOrders.map((order, index) => {
                return (
                  <div className="container-cards-orders" key={index}>
                    <div className="card-orders" style={order.status === "delivering" ? { border: "solid #800020" } : { border: "none" }}>
                      <p className="client-name"> <span>CLIENT:</span> {order.client.toUpperCase()} </p>
                      <div className="table-order-container">
                        <table className="order-table">
                          <tbody>
                            {order.products.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td className="order-info-name">{item.productId.name.toUpperCase()}</td>
                                  <td className="order-info-qty">{item.qty}</td>
                                  <td className="order-info-price">$ {item.productId.price}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      <div className="delete-check-btns">
                        <p className="order-status"> STATUS: <span className="status-description">{order.status.toUpperCase()}</span>  </p>
                        <div className="buttons">
                          <button className="delete-btn" onClick={()=> {chooseOrder(order); openTheCanceledModal()}}>Trash</button>
                          <button className="check-btn" onClick={()=> {chooseOrder(order); openTheModal()}}>check</button>
                          {modalOpenStatus && <ModalDelivered setOpenModal={closeTheModal} handleUpdate={updateAsDelivered} />}
                          {modalCancelledStatus && <ModalCancelled setOpenModal={closeTheCanceledModal} handleUpdate={updateStatusToCanceled} />}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      </section>
    </>
  );
};

export default Orders;

/*

  return (
    <>
      <Menu />
      <section className="orders-body">
        <section className="client-name">
          <input type="text" placeholder="client name" required />
        </section>
        <section className="orders-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>PRICE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Chosen Product 1</td>
                <td>$1</td>
              </tr>
              <tr>
                <td>Chosen Product 2</td>
                <td>$2</td>
              </tr>
              <tr>
                <td>Chosen Product 3</td>
                <td>$3</td>
              </tr>
            </tbody>
          </table>

          <div className="menu-buttons">
            <table>
              <tbody>
                <tr>
                  <td className="border-bottom-btn">
                    <button className="type-btn">
                      <p>BREAKFAST</p>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="border-bottom-btn">
                    <button className="type-btn" onClick={lunchList}>
                      <p>LUNCH</p>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="border-bottom-btn">
                    <button className="type-btn">
                      <p>DINNER</p>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button className="type-btn">
                      <p>DRINKS</p>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="product-selection">
            <div className="product-row-first">
              <div className="product-item">
                <button>
                  <figure className="image-container">
                    <img src="src/assets/product-empanada-morocho.png" alt="Product 1" />
                  </figure>
                  <p className="product-description">MOROCHO PATTY</p>
                  <p className="product-price">18.00</p>
                </button>
              </div>
              <div className="product-item">
                <button>
                  
                  <figure className="image-container">
                    <img src="src/assets/product-summer-rolls.png" alt="Product 2" />
                  </figure>
                  <p className="product-description">MOROCHO PATTY</p>
                  <p className="product-price">18.00</p>
                </button>
              </div>
            </div>
            <div className="product-row-second">
              <div className="product-item">
                <button>
                  <figure className="image-container">
                    <img src="src/assets/product-cebiche.png" alt="Product 3" />
                  </figure>
                  <p className="product-description">MOROCHO PATTY</p>
                  <p className="product-price">18.00</p>
                </button>
              </div>
              <div className="product-item">
                <button>
                  <figure className="image-container">
                    <img src="src/assets/product-pollo-agridulce.png" alt="Product 4" />
                  </figure>
                  <p className="product-description">MOROCHO PATTY</p>
                  <p className="product-price">18.00</p>
                </button>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Orders;
*/