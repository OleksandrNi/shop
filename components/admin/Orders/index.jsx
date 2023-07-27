"use client";

import Link from "next/link";
import React, { useContext, useEffect } from "react";
import CustomPagination from "../../layouts/CustomPagination";
import OrderContext from "@/context/OrderContext";
import styles from "./orders.module.scss"; // Import the module CSS file

const Orders = ({ orders }) => {
  const { deleteOrder, error, clearErrors } = useContext(OrderContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error]);

  const deleteHandler = (id) => {
    deleteOrder(id);
  };

  return (
    <div className={styles.ordersContainer}>
      <h1 className={styles.ordersTitle}>
        {orders?.ordersCount} Orders
      </h1>
      <table className={styles.ordersTable}>
        <thead className={styles.ordersHeader}>
          <tr>
            <th scope="col" className={styles.ordersColumn}>
              ID
            </th>
            <th scope="col" className={styles.ordersColumn}>
              Amount Paid
            </th>
            <th scope="col" className={styles.ordersColumn}>
              Status
            </th>
            <th scope="col" className={styles.ordersColumn}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?.orders?.map((order) => (
            <tr className={styles.ordersRow} key={order?._id}>
              <td className={styles.ordersCell}>{order?._id}</td>
              <td className={styles.ordersCell}>${order?.paymentInfo?.amountPaid}</td>
              <td className={styles.ordersCell}>{order?.orderStatus}</td>
              <td className={styles.ordersCell}>
                <div className={styles.ordersActions}>
                  <Link
                    href={`/admin/orders/${order?._id}`}
                    className={styles.ordersActionBtn}
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </Link>
                  <a
                    className={styles.ordersActionBtn}
                    onClick={() => deleteHandler(order?._id)}
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.ordersPagination}>
        <CustomPagination
          resPerPage={orders?.resPerPage}
          productsCount={orders?.ordersCount}
        />
      </div>
    </div>
  );
};

export default Orders;
