"use client";

import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import OrderContext from "@/context/OrderContext";
import Image from "next/image";
import styles from "./UpdateOrder.module.scss"; 

const UpdateOrder = ({ order }) => {
  const { updateOrder, error, clearErrors, updated, setUpdated } =
    useContext(OrderContext);

  const [orderStatus, setOrderStatus] = useState(order?.orderStatus);

  useEffect(() => {
    if (updated) {
      setUpdated(false);
      toast.success("Order Updated");
    }

    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error, updated]);

  const submitHandler = () => {
    const orderData = { orderStatus };
    updateOrder(order?._id, orderData);
  };

  return (
    <article className={styles.articleContainer}>
      <header className={styles.headerContainer}>
        <div className="mb-4 lg:mb-0">
          <p className={styles.headerText}>
            <span>Order ID: {order?._id} </span>
            {order?.orderStatus === "Processing" ? (
              <span className={`${styles.orderStatus} ${styles.orderStatusRed}`}>
                • {order?.orderStatus.toUpperCase()}
              </span>
            ) : (
              <span className={`${styles.orderStatus} ${styles.orderStatusGreen}`}>
                • {order?.orderStatus.toUpperCase()}
              </span>
            )}
          </p>
          <p className={styles.dateText}>{order?.createAt?.substring(0, 10)}</p>
        </div>
      </header>
      <div className={styles.gridContainer}>
        <div>
          <p className={styles.listItem}>Person</p>
          <ul className={styles.listItem}>
            <li>{order?.user?.name}</li>
            <li>Phone: {order?.shippingInfo?.phoneNo}</li>
            <li>Email: {order?.user?.email}</li>
          </ul>
        </div>
        <div>
          <p className={styles.listItem}>Delivery address</p>
          <ul className={styles.listItem}>
            <li>{order?.shippingInfo?.street}</li>
            <li>
              {order?.shippingInfo?.city}, {order?.shippingInfo?.state},{" "}
              {order?.shippingInfo?.zipCode}
            </li>
            <li>{order?.shippingInfo?.country}</li>
          </ul>
        </div>
        <div>
          <p className={styles.listItem}>Payment</p>
          <ul className={styles.listItem}>
            <li className={styles.listItemGreen}>
              {order?.paymentInfo?.status?.toUpperCase()}
            </li>
            <li>Tax paid: ${order?.paymentInfo?.taxPaid}</li>
            <li>Total paid: ${order?.paymentInfo?.amountPaid}</li>
          </ul>
        </div>
      </div>
      <hr className={styles.my-4} />
      <div className={styles.gridContainer}>
        {order?.orderItems?.map((item) => (
          <figure className="flex flex-row mb-4" key={item._id}>
            <div className={styles.imageContainer}>
              <Image src={item?.image} height="60" width="60" alt={item.name} />
            </div>
            <figcaption className="ml-3">
              <p>{item.name.substring(0, 35)}</p>
              <p className={styles.listItem}>
                {item.quantity}x = ${item.price * item.quantity}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
      <hr />
      <div className={styles.selectContainer}>
        <label className={styles.selectLabel}>Update Order Status</label>
        <div className={styles.selectField}>
          <select
            className={styles.selectBox}
            name="category"
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            required
          >
            {["Processing", "Shipped", "Delivered"].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <i className={styles.selectIcon}>
            <svg width="22" height="22" className={styles.fillCurrent} viewBox="0 0 20 20">
              <path d="M7 10l5 5 5-5H7z"></path>
            </svg>
          </i>
        </div>
      </div>
      <button
        type="submit"
        className={styles.updateButton}
        onClick={() => submitHandler()}
      >
        Update
      </button>
    </article>
  );
};

export default UpdateOrder;

