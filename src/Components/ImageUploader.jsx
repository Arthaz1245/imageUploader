import { useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import axios from "axios";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const handleImageUpload = async (file) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        "http://localhost:5000/ImageUploader",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadedImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      handleImageUpload(file);
    }
  };

  const handleImageDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setImage(file);
      handleImageUpload(file);
    }
  };

  const handleCopyToClipboard = () => {
    if (uploadedImageUrl) {
      navigator.clipboard.writeText(uploadedImageUrl).then(
        () => {
          console.log("Image URL copied to clipboard");
        },
        (error) => {
          console.error("Error copying to clipboard:", error);
        }
      );
    }
  };

  return (
    <div className="flex items-center justify-center bg-slate-500 h-screen w-screen">
      <div className="w-[402px] h-[469px] bg-white rounded-xl shadow flex flex-col items-center">
        <div className="w-[80%] h-[397px] flex flex-col items-center  mt-9">
          <div className=" h-[26.99px]  text-neutral-600 text-lg font-medium text-center ">
            Upload your image
          </div>
          <div className=" h-[14.99px] mt-4 text-center text-zinc-500 text-[10px] font-medium">
            File should be Jpeg, Png,...
          </div>
          {loading ? (
            <div className="w-[100%] h-[218.90px]  bg-slate-50 rounded-xl border-2 border-blue-300 border-dashed mt-7 flex flex-col items-center">
              Loading...
            </div>
          ) : (
            <>
              {image ? (
                <div className="w-[100%] h-[218.90px]  bg-slate-50 rounded-xl border-2 border-blue-300 border-dashed mt-7 flex flex-col items-center">
                  <img src={URL.createObjectURL(image)} alt="Uploaded" />
                  <button onClick={handleCopyToClipboard}>
                    Copy to Clipboard
                  </button>
                </div>
              ) : (
                <div className="w-[100%] h-[218.90px]  bg-slate-50 rounded-xl border-2 border-blue-300 border-dashed mt-7 flex flex-col items-center">
                  <div
                    className=" w-[114.13px] h-[88.24px]  border my-8"
                    onDrop={handleImageDrop}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <BsFillImageFill className="w-full h-full" />
                  </div>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <div className="w-[166.01px] h-[17.99px]  text-stone-300 text-xs font-medium">
                    Drag & Drop your image here
                  </div>
                </div>
              )}
            </>
          )}

          <div
            className="w-3.5 h-[17.99px] 
           text-center text-stone-300 text-xs font-medium mt-4"
          >
            Or
          </div>

          <div className="w-[101px] h-8  bg-blue-500 rounded-lg text-center text-white text-xs font-medium mt-5">
            Choose a file
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default ImageUploader;
