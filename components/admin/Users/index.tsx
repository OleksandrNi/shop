// Users.tsx
"use client";

import Link from "next/link";
import React, { useContext, useEffect } from "react";
import CustomPagination from "../../layouts/CustomPagination";
import AuthContext from "@/context/AuthContext";
import { toast } from "react-toastify";
import styles from "./users.module.scss";
import { User } from "@/types/types";

interface UsersProps {
  data: {
    users: User[];
    resPerPage: number;
    ordersCount: number;
  };
}

const Users: React.FC<UsersProps> = ({ data }) => {
  const { error, deleteUser, clearErrors } = useContext(AuthContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error]);

  const deleteHandler = (id: string) => {
    deleteUser(id);
  };

  return (
    <div className={styles.usersTable}>
      <h1 className={styles.heading}>
        {data?.users?.length} Users
      </h1>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th scope="col" className={styles.tableHeader}>
              Name
            </th>
            <th scope="col" className={styles.tableHeader}>
              Email
            </th>
            <th scope="col" className={styles.tableHeader}>
              Role
            </th>
            <th scope="col" className={styles.tableHeader}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.users?.map((user: User) => (
            <tr key={user._id} className={styles.tableRow}>
              <td className={styles.tableData}>{user.name}</td>
              <td className={styles.tableData}>{user.email}</td>
              <td className={styles.tableData}>{user.role}</td>
              <td className={styles.tableData}>
                <div>
                  <Link
                    href={`/admin/users/${user._id}`}
                    className={styles.editLink}
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </Link>
                  <a
                    className={styles.deleteLink}
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data?.users?.length > data?.resPerPage && (
        <div className={styles.paginationWrapper}>
          <CustomPagination
            resPerPage={data.resPerPage}
            productsCount={data.ordersCount}
          />
        </div>
      )}
    </div>
  );
};

export default Users;
