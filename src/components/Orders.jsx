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
        <section className="orders-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>Chosen Product</th>
                <th>Price</th>
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
            <div className="product-item">
              <img src="img" alt="Product 1" />
              <button>Add product to table</button>
            </div>
            <div className="product-item">
              <img src="imgg" alt="Product 2" />
              <button>Add product to table</button>
            </div>
            <div className="product-item">
              <img src="img" alt="Product 3" />
              <button>Add product to table</button>
            </div>
            <div className="product-item">
              <img src="link" alt="Product 4" />
              <button>Add product to table</button>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Orders;