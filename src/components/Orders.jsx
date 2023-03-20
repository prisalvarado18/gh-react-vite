import React from "react";
import Menu from "./Menu";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import OtroHeader from "./OtroHeader";
import LoggedinHeader from "./LoggedinHeader";
import '../styles/Orders.css';

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
        document.querySelector('.inputName').value = '';
        setItemsCart([]);
        setSelectedItems([]);
        setTotalFee(0)
      })
      .catch((error) => {
        console.info(error);
      })
  }

  return (
    <>
      <Menu />
      <section className="orders-main">
        <section className="orders-body">
          <section className="client-name">
            <input type="text" placeholder="client name" name="client" className="inputName" onChange={setClientData} required />
          </section>
          <section className="orders-container">
            <section className="product-table-btns-container">
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
                <button className="view-all-btn"> VIEW ALL</button>
              </section>
            </section>

            <div className="menu-buttons">
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

            <div className="product-selection">
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