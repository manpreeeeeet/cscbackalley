import { useRef, useState } from "react";
import { API_BASE_URL } from "../api.ts";

const UploadImage = ({ setImageUrl }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return "Only JPG, PNG, and GIF files are allowed.";
    }
    if (file.size > 5 * 1024 * 1024) {
      return "File must be under 5MB.";
    }
    return null;
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    const error = validateFile(selectedFile);
    if (error) {
      setMessage(error);
      return;
    }

    setFile(selectedFile);
    setMessage("");
  };

  const uploadImage = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${API_BASE_URL}image/upload?filename=${encodeURIComponent(file.name)}&contentType=${file.type}&fileSize=${file.size}`,
        { credentials: "include" },
      );
      if (!response.ok) throw new Error("Failed to get presigned URL");
      const { url, objectUrl } = await response.json();

      const uploadResponse = await fetch(url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type, "Content-Length": file.size },
      });

      if (!uploadResponse.ok) throw new Error("Upload failed");

      setMessage("upload successful!");
      setImageUrl(objectUrl);
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setMessage("upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex">
      <input
        type="file"
        accept="image/jpeg,image/png,image/gif"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
        id="fileInput"
      />
      <div className="flex">
        <label
          htmlFor="fileInput"
          className="cursor-pointer border border-white p-1"
        >
          {file && file.name}
          {!file && "choose file"}
        </label>
        <button
          onClick={uploadImage}
          disabled={!file || uploading}
          className="cursor-pointer border border-white p-1"
        >
          {uploading ? "uploading..." : "upload"}
        </button>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default UploadImage;
