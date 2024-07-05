import React, { useState, useEffect } from "react";
import {
  HiddenInput,
  Icon,
  ImageView,
  ProductImage,
  UploadIcon,
} from "./styles";
import Notification from "../../components/Notification";
import { storage } from "../../utils/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

interface ImageUploaderProps {
  onChange: (base64Image: string) => void;
  defaultValue?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onChange,
  defaultValue,
}) => {
  const [imageBase64, setImageBase64] = useState<string>("");
  const [, setImageFile] = useState<File | null>(null);
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "warning";
    content: string;
  } | null>(null);

  useEffect(() => {
    if (defaultValue) {
      setImageBase64(defaultValue);
      onChange(defaultValue);
    }
  }, [defaultValue, onChange]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
  
      // Cria uma referência ao caminho do arquivo no Firebase Storage
      const storageRef = ref(storage, `images/${file.name}`);
  
      // Faz o upload do arquivo
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  
        },
        (error) => {
          setNotification({ type: "error", content: "Erro ao fazer upload da imagem!" });
        },
        
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageBase64(downloadURL);
            onChange(downloadURL);
          });
        }
       
      );
    }
  };

  return (
    <>
      <>
        {notification && (
          <Notification
            type={notification.type}
            content={notification.content}
          />
        )}
      </>
      <ImageView>
        <ProductImage src={imageBase64} alt="Preview" />
        <UploadIcon htmlFor="upload-input">
          <Icon />
        </UploadIcon>
        <HiddenInput
          id="upload-input"
          type="file"
          onChange={handleImageChange}
        />
      </ImageView>
    </>
  );
};

export default ImageUploader;
