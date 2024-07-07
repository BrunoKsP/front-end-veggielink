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
import LoadingSpinner from "../Loader";
import { CircularProgress } from "@mui/material";

interface ImageUploaderProps {
  onChange: (base64Image: string) => void;
  defaultValue?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onChange,
  defaultValue,
}) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [imageBase64, setImageBase64] = useState<string | undefined>(
    defaultValue
  );
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "warning";
    content: string;
  } | null>(null);

  useEffect(() => {
    setImageBase64(defaultValue);
  }, [defaultValue]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        setUploading(true);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            setNotification({
              type: "error",
              content: "Erro ao fazer upload da imagem!",
            });
            setUploading(false);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setImageBase64(downloadURL);
            onChange(downloadURL);
            setUploading(false);
          }
        );
      } catch (error) {
        setNotification({
          type: "error",
          content: "Erro ao processar o upload da imagem!",
        });
        setUploading(false);
      }
    }
  };

  return (
    <>
      {notification && (
        <Notification type={notification.type} content={notification.content} />
      )}
      <ImageView>
        {uploading && (
          <CircularProgress
            style={{
              position: "absolute",
              top: "40%",
              left: "40%",
              transform: "translate(-50%, -50%)",
              color : "#08F9B0"
            }}
          />
        )}
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
