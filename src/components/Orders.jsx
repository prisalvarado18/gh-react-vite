import React from "react";
import Menu from "./Menu";
import OtroHeader from "./OtroHeader";
import LoggedinHeader from "./LoggedinHeader";
import '../styles/Orders.css';

const Orders = () => {
  return (
    <>
      <Menu />
      <section className="orders-body">
        <section className="client-name"></section>
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
                    <button className="type-btn">
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
                  <img src="src/assets/product-empanada-morocho-2.png" alt="Product 1" />
                </button>
              </div>
              <div className="product-item">
                <button>
                  <img src="src/assets/product-summer-rolls-2.png" alt="Product 2" />
                </button>
              </div>
            </div>
            <div className="product-row-second">
              <div className="product-item">
                <button>
                  <img src="src/assets/product-cebiche-2.png" alt="Product 3" />
                </button>
              </div>
              <div className="product-item">
                <button>
                  <img src="src/assets/product-pollo-agridulce-2.png" alt="Product 4" />
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