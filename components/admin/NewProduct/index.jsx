"use client";

import React, { useContext, useState } from "react";
import ProductContext from "@/context/ProductContext";
import { ProductCategory } from "@/types/types";
import styles from "./NewProduct.module.scss"; // Import styles from the CSS module

const NewProduct = () => {
  const { newProduct } = useContext(ProductContext);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    seller: "",
    price: "",
    stock: "",
    category: ProductCategory.CategoryOne,
  });

  const { name, description, seller, price, stock, category } = product;

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    newProduct(product);
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>Create New Product</h1>

      <form onSubmit={submitHandler}>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Product name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label}>Description</label>
          <textarea
            rows="4"
            className={styles.input}
            placeholder="Product description"
            name="description"
            value={description}
            onChange={onChange}
            required
          ></textarea>
        </div>

        <div className={styles.grid}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Price</label>
            <input
              type="text"
              className={styles.input}
              placeholder="0.00"
              name="price"
              value={price}
              onChange={onChange}
              required
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label}>Category</label>
            <div className={styles.relative}>
              <select
                className={styles.select}
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
                  className={styles.selectIconSvg}
                  viewBox="0 0 20 20"
                >
                  <path d="M7 10l5 5 5-5H7z"></path>
                </svg>
              </i>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Seller / Brand</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Seller or brand"
              name="seller"
              value={seller}
              onChange={onChange}
              required
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label}>Stock</label>
            <div className={styles.relative}>
              <div className={styles.colSpan2}>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="0"
                  name="stock"
                  value={stock}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={styles.button}
        >
          Create Product
        </button>
      </form>
    </section>
  );
};

export default NewProduct;
