"use client";

import AuthContext from "@/context/AuthContext";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { User } from "@/types/types";
import styles from "./UpdateUser.module.scss";

interface UpdateUserProps {
  user: User;
}

const UpdateUser: React.FC<UpdateUserProps> = ({ user }) => {
  const { error, updateUser, clearErrors, updated, setUpdated } =
    useContext(AuthContext);

  const [name, setName] = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);
  const [role, setRole] = useState<string>(user.role);

  useEffect(() => {
    if (updated) {
      setUpdated(false);
      toast.success("User Updated");
    }

    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error, updated]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = { name, email, role };

    updateUser(user._id, userData);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler}>
        <h2 className={styles.heading}>Update User</h2>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Full Name</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Type your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Type your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Role</label>
          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
              name="category"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              {["user", "admin"].map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <i className={styles.selectIcon}></i>
          </div>
        </div>

        <button type="submit" className={styles.btn}>
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
