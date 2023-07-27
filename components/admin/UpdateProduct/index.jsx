"use client";

// UpdateProduct.js
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductContext from "@/context/ProductContext";
import { ProductCategory } from "@/types/types";
import styles from "./UpdateProduct.module.scss";

const UpdateProduct = ({ data }) => {
  const { updateProduct, error, updated, setUpdated, clearErrors } =
    useContext(ProductContext);

  const [product, setProduct] = useState({
    name: data?.name,
    description: data?.description,
    seller: data?.seller,
    price: data?.price,
    stock: data?.stock,
    category: data?.category,
  });

  useEffect(() => {
    if (updated) {
      toast.success("Product Updated");
      setUpdated(false);
    }

    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error, updated]);

  const { name, description, seller, price, stock, category } = product;

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateProduct(product, data?._id);
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>Update Product</h1>

      <form onSubmit={submitHandler}>
        <div className={styles.formControl}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Product name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>

        <div className={`${styles.formControl} ${styles.textareaWrapper}`}>
          <label className={styles.label}>Description</label>
          <textarea
            rows="4"
            className={styles.textarea}
            placeholder="Product description"
            name="description"
            value={description}
            onChange={onChange}
            required
          ></textarea>
        </div>

        <div className={styles.gridWrapper}>
          <div className={styles.formControl}>
            <label className={styles.label}>Price</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                className={styles.inputField}
                placeholder="0.00"
                name="price"
                value={price}
                onChange={onChange}
                required
              />
            </div>
          </div>
          <div className={styles.formControl}>
            <label className={styles.label}>Category</label>
            <div className={styles.selectField}>
              <select
                className={styles.selectBox}
                name="category"
                value={category}
                onChange={onChange}
                required
              >
                {Object.values(ProductCategory).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <i className={styles.selectIcon}>
                <svg
                  width="22"
                  height="22"
                  className={styles.fillCurrent}
                  viewBox="0 0 20 20"
                >
                  <path d="M7 10l5 5 5-5H7z"></path>
                </svg>
              </i>
            </div>
          </div>
        </div>

        <div className={styles.gridWrapper}>
          <div className={styles.formControl}>
            <label className={styles.label}>Seller / Brand</label>
            <input
              type="text"
              className={styles.inputField}
              placeholder="Seller or brand"
              name="seller"
              value={seller}
              onChange={onChange}
              required
            />
          </div>

          <div className={styles.formControl}>
            <label className={styles.label}>Stock</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                className={styles.inputField}
                placeholder="0"
                name="stock"
                value={stock}
                onChange={onChange}
                required
              />
            </div>
          </div>
        </div>

        <button type="submit" className={styles.button}>
          Update Product
        </button>
      </form>
    </section>
  );
};

export default UpdateProduct;

