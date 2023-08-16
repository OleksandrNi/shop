"use client";

import ProductContext from "@/context/ProductContext";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./uploadImages.module.scss";

interface UploadImagesProps {
  id: string; // Change the type of 'id' prop accordingly
}

const UploadImages: React.FC<UploadImagesProps> = ({ id }) => {
  const { uploadProductImages, error, loading, clearErrors } =
    useContext(ProductContext);

  const [images, setImages] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          const resultString = reader.result as string;
          setImagesPreview((oldArray) => [...oldArray, resultString]);
        }
      };

      setImages((oldArray) => [...oldArray, file]);
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    images.forEach((image) => {
      formData.append("image", image);
    });

    uploadProductImages(formData, id);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler}>
        <h2 className={styles.heading}>Upload Product Images</h2>

        <div className={styles.fileInputWrapper}>
          <input
            className={styles.fileInput}
            type="file"
            id="formFile"
            multiple
            onChange={onChange}
          />
        </div>

        <div className={styles.imageGrid}>
          {imagesPreview?.map((img) => (
            <Image
              src={img}
              key={img}
              alt="Preview"
              className={styles.imageItem}
              width={50}
              height={50}
            />
          ))}
        </div>

        <button
          type="submit"
          className={styles.btn}
          disabled={loading ? true : false}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default UploadImages;
