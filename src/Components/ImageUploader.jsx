import { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  //  useEffect(() => {
  //    // Simulating a loading delay
  //    setTimeout(() => {
  //      setLoading(false);
  //    }, 2000);
  //  }, []);
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
          {image && !loading ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#219653"
                className="bi bi-check-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
              <div className=" h-[26.99px]  text-neutral-600 text-lg font-medium text-center ">
                Upload Succesfully
              </div>
            </>
          ) : (
            <>
              <div className=" h-[26.99px]  text-neutral-600 text-lg font-medium text-center ">
                Upload your image
              </div>
              <div className=" h-[14.99px] mt-4 text-center text-zinc-500 text-[10px] font-medium">
                File should be Jpeg, Png,...
              </div>
            </>
          )}

          {loading ? (
            <div className="w-[100%] h-[218.90px]  bg-slate-50 rounded-xl border-2 border-blue-300 border-dashed mt-7 flex flex-col items-center">
              <Spinner />
            </div>
          ) : (
            <>
              {image ? (
                <>
                  <div className="w-[100%] h-[218.90px]  bg-slate-50 rounded-xl border-2 border-blue-300 border-dashed mt-7 flex flex-col items-center">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Uploaded"
                      className="w-full h-full"
                    />
                  </div>
                  <div className=" flex flex-row justify-around w-[338px] h-[34px] bg-slate-50 rounded-lg border border-neutral-200 mt-5">
                    <div className="text-center text-neutral-600 text-[8px] font-medium mt-3">
                      {URL.createObjectURL(image)}
                    </div>
                    <button
                      onClick={handleCopyToClipboard}
                      className="w-[74px] h-8  bg-blue-500 rounded-lg text-center text-white text-xs font-medium "
                    >
                      Copy Link
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-[100%] h-[218.90px]  bg-slate-50 rounded-xl border-2 border-blue-300 border-dashed mt-7 flex flex-col items-center">
                    <div
                      className=" w-[114.13px] h-[88.24px]  border my-8"
                      onDrop={handleImageDrop}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      <label htmlFor="fileInput" className=" ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="114.13"
                          height="88.24"
                          fill="currentColor"
                          className="bi bi-image"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                          <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                        </svg>
                      </label>
                      <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                    </div>

                    <div className="w-[166.01px] h-[17.99px]  text-stone-300 text-xs font-medium">
                      Drag & Drop your image here
                    </div>
                  </div>
                  <div
                    className="w-3.5 h-[17.99px] 
           text-center text-stone-300 text-xs font-medium mt-4"
                  >
                    Or
                  </div>
                  <label htmlFor="fileInput" className=" ">
                    <div className="w-[101px] h-8  bg-blue-500 rounded-lg text-center text-white text-xs font-medium mt-5">
                      Choose a file
                    </div>
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>{" "}
    </div>
  );
};

export default ImageUploader;
