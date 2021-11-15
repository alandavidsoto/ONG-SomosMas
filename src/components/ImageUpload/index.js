import { Input, InputLabel } from "@material-ui/core";
import { useRef } from "react";

import styles from "./styles.module.scss";

const ImageUpload = ({ imageAlt, imageName, idImage, onImageChange }) => {
  const image = useRef();

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);

      reader.onerror = (error) => reject(error);
    });

  const handleOnImageOnchange = async (ev) => {
    const [file] = ev.currentTarget.files;

    if (file) {
      image.current.src = URL.createObjectURL(file);
    }

    const image64 = await toBase64(file);

    onImageChange(imageName, image64);
  };
  return (
    <InputLabel>
      <img
        ref={image}
        alt={imageAlt}
        id={idImage}
        className={styles.imageUser}
      />
      <Input
        type="file"
        accept="image.jpg image.png"
        name={imageName}
        onChange={handleOnImageOnchange}
      />
    </InputLabel>
  );
};
export default ImageUpload;
