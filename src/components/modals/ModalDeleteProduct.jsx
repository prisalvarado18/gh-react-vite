import React from "react";
import "../../styles/ModalDelivered.css";

function ModalDeleteProduct({ setOpenModal, handleDelete }) {
    return (
        <div className="modal-background">
            <div className="modal-container">
                <div className="title-close-btn">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >X</button>
                </div>
                <div className="title">
                    <h1>CARA</h1>
                </div>
                <div className="body">
                    <p>Do you want to delete this order?</p>
                </div>
                <div className="footer">
                    <button onClick={handleDelete}>Yes</button>
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                        id="cancel-btn"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalDeleteProduct;