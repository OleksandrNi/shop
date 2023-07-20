import React from "react";
import Link from "next/link";
import styles from "./BreadCrumbs.module.scss";

interface BreadCrumb {
  name: string;
  url: string;
}

interface BreadCrumbsProps {
  breadCrumbs?: BreadCrumb[];
}


const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ breadCrumbs }) => {
  return (
    <section className={styles.breadCrumbsSection}>
      <div className={styles.container}>
        <ol className={styles.breadCrumbsList}>
          {breadCrumbs?.map((breadCrumb, index) => (
            <li className={styles.breadCrumb} key={index}>
              <Link href={breadCrumb.url} className={styles.breadCrumbLink}>
                {breadCrumb.name}
              </Link>
              {breadCrumbs?.length - 1 !== index && (
                <i className={styles.breadCrumbIcon}></i>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default BreadCrumbs;
