import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  console.log(formData);
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];
      setUploading(true);
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image Upload failed (max 2mb per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only Upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress} done `);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURl) => {
            resolve(downloadURl);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">
        {" "}
        Create Listing{" "}
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="String"
            placeholder="Name"
            className="border rounded-lg p-3 "
            id="name"
            maxLength="70"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border rounded-lg p-3 "
            id="description"
            required
          />
          <input
            type="String"
            placeholder="Address"
            className="border rounded-lg p-3 "
            id="address"
            required
          />
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span className=""> Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span className="">Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span className=""> Parking Spot </span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span className=""> Furnished </span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span className=""> Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="50"
                required
                className="border-gray-300 rounded-lg border p-3"
              />
              <p>Beds</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="50"
                required
                className="border-gray-300 rounded-lg border p-3"
              />
              <p>Baths</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="50"
                required
                className="border-gray-300 rounded-lg border p-3"
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs"> ( &#8377; / month )</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="discountPrice"
                min="1"
                max="50"
                required
                className="border-gray-300 rounded-lg border p-3"
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price </p>
                <span className="text-xs"> ( &#8377; / month )</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <p className="font-semibold">
            {" "}
            Images:
            <span className="font-normal text-gray-600 ml-2">
              {" "}
              The first image will be cover ( max 6 ){" "}
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              onChange={(e) => setFiles(e.target.files)}
              className="rounded w-full border border-gray-300 p-3"
              multiple
              accept="image/*"
              id="images"
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3  border text-green-700 rounded hover:shadow-lg disabled:opacity-80 border-green-700 "
            >
              {uploading ? "Uploading...." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {" "}
            {imageUploadError && imageUploadError}{" "}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex border p-3 justify-between items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="rounded-lg w-20 h-20 object-contain"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 uppercase hover:opacity-75 rounded-lg"
                >
                  {" "}
                  Delete{" "}
                </button>
              </div>
            ))}
          <button className="p-3 rounded-lg text-white bg-slate-700 hover:opacity-95 disabled:opacity-80">
            {" "}
            Create Listing{" "}
          </button>
        </div>
      </form>
    </main>
  );
}
