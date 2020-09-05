import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Progress } from "antd";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";

const UploadVideo = () => {
  const [selectedVideos, setSelectedVideos] = useState(null);
  const [loaded, setLoaded] = useState(0);

  const maxSelectFile = (event) => {
    let files = event.target.files;
    if (files.length > 1) {
      toast.error("Maximum 1 file is allowed");
      event.target.value = null;
      return false;
    } else {
      let err = "";
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > 52428800) {
          // 50 MB
          err += files[i].name + ", ";
        }
      }
      if (err !== "") {
        // error caught
        event.target.value = null;
        toast.error(err + " is/are too large. Please select file size < 50Mb");
      }
    }
    return true;
  };

  const fileChangeHandler = (event) => {
    const files = event.target.files;
    if (maxSelectFile(event)) {
      setSelectedVideos(files);
      setLoaded(0);
    }
  };

  const fileUploadHandler = (event) => {
    const data = new FormData();
    for (let i = 0; i < selectedVideos.length; i++) {
      data.append("file", selectedVideos[i]);
    }
    Axios.post("http://localhost:5000/api/uploadVideo", data, {
      onUploadProgress: (ProgressEvent) => {
        setLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100);
      },
    })
      .then((res) => {
        toast.success("Upload Successful");
      })
      .catch((err) => {
        toast.error(`Upload Fail with status: ${err.statusText}`);
      });
  };

  return (
    <div className="container mt-5">
      <div className="form-group">
        <ToastContainer />
      </div>
      <h4>Upload Video</h4>
      <hr className="my-4" />

      <form
        method="post"
        name="videoUpload"
        action="/api/upload"
        id="#"
        encType="multipart/form-data"
      >
        <div className="form-group files">
          <label>Upload Your Videos Here</label>
          <input
            type="file"
            name="file"
            className="form-control"
            multiple="multiple"
            accept="video/*"
            onChange={fileChangeHandler}
          />
          <Progress status="active" value={loaded} className="mt-4 mb-1" />

          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={fileUploadHandler}
          >
            Upload Video
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadVideo;
