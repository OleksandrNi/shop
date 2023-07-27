"use client";

import React, { useContext, useEffect } from "react";
import Link from "next/link";
import CustomPagination from "../../layouts/CustomPagination";
import ProductContext from "@/context/ProductContext";
import { toast } from "react-toastify";
import styles from "./products.module.scss"; // Import the module CSS file

const Products = ({ data }) => {
  const { deleteProduct, error, clearErrors } = useContext(ProductContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error]);

  const deleteHandler = (id) => {
    deleteProduct(id);
  };

  return (
    <div className={styles.productsContainer}>
      <h1 className={styles.productsTitle}>
        {data?.productsCount} Products
      </h1>
      <table className={styles.productsTable}>
        <thead className={styles.productsHeader}>
          <tr>
            <th scope="col" className={styles.productsColumn}>
              Name
            </th>
            <th scope="col" className={styles.productsColumn}>
              Stock
            </th>
            <th scope="col" className={styles.productsColumn}>
              Price
            </th>
            <th scope="col" className={styles.productsColumn}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.products?.map((product) => (
            <tr className={styles.productsRow} key={product?._id}>
              <td className={styles.productsCell}>{product?.name}</td>
              <td className={styles.productsCell}>{product?.stock}</td>
              <td className={styles.productsCell}>${product?.price}</td>
              <td className={styles.productsCell}>
                <div className={styles.productsActions}>
                  <Link
                    href={`/admin/products/${product?._id}/upload_images`}
                    className={styles.productsActionBtn}
                  >
                    <i className="fa fa-image" aria-hidden="true"></i>
                  </Link>

                  <Link
                    href={`/admin/products/${product?._id}`}
                    className={styles.productsActionBtn}
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </Link>
                  <a
                    className={styles.productsActionBtn}
                    onClick={() => deleteHandler(product?._id)}
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.productsPagination}>
        <CustomPagination
          resPerPage={data?.resPerPage}
          productsCount={data?.filteredProductsCount}
        />
      </div>
    </div>
  );
};

export default Products;
