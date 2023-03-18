import React from "react";
import Menu from "./Menu";
import { useState, useEffect } from "react";
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
      axios.get('https://palvaradoristorante.onrender.com/products?limit=10&page=1', { headers })
        .then((response) => {
          console.log(response);
          setProducts(response.data);
          setProductsObtained(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [productsObtained]);

  const lunchList = () => {
    console.log(products)
    if (products && products.length) {
      const lunch = products.filter((product) => product.type === 'Lunch');
      console.log(lunch);
      setProductsType(lunch);
    }
  }

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
              {productsType.slice(0, 2).map((product, index) => (
                <div className="product-item" key={index}>
                  <button>
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
                  <button>
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