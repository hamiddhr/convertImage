import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import ProgressBar from "@ramonak/react-progress-bar";
import axios from "axios";
import ReactLoading from "react-loading";
import "./bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [images, setImages] = useState([]);
  const [loaded, setloaded] = useState(0);
  const [url, seturl] = useState("");
  const [inputLink, setInputLink] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showInvalid, setShowInvalid] = useState(false);
  const [imageNames, setImageNames] = useState([]);
  const [showProgress, setShowProgress] = useState(false);
  const [res, setRes] = useState([]);

  const timeoutDuration = window._DATADOG_SYNTHETICS_BROWSER ? 90000 : 2000;
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const checkFileSize = () => {
    let size = 5000000;
    console.log();
    images.map((item, index) => {
      if (images != undefined) {
        if (item.file.size > size) {
          images.splice(index, 1);
          setShowInvalid(true);
          setImageNames((oldName) => [...oldName, item.file.name]);
        }
      }
    });
  };

  const handleUpload = () => {
    setShowProgress(true);
    images.map((item) => {
      axios
        .post(
          "https://medical-project-82612-default-rtdb.europe-west1.firebasedatabase.app/data.json",
          { item },
          {
            onUploadProgress: (ProgressEvent) => {
              console.log(ProgressEvent);
              setloaded(
                ((ProgressEvent.loaded / ProgressEvent.total) * 100).toFixed(0)
              );
            },
          }
        )
        .then((res) => {
          setRes((oldRes) => [...oldRes, res]);
        });
    });
  };
  console.log(res);
  const inputUrlHandler = (event) => {
    seturl(event.target.value);
    const displayUserInput = () => {
      setIsLoading(false);
    };
    setIsLoading(true);
    setTimeout(displayUserInput, timeoutDuration);
  };

  const addimageUrl = () => {
    setImages([...images, { data_url: url, file: { name: "publicImage" } }]);
  };

  console.log(images);

  const loader = () => {
    return (
      <ReactLoading
        type={"spinningBubbles"}
        color={"#5433ff"}
        height={"5%"}
        width={"5%"}
        className="m-auto"
      />
    );
  };

  return (
    <div dir="rtl" className="col-12 p-0 m-0">
      <header dir="rtl" className="mb-5 w-100">
        <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            لوگو
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  خانه <span className="sr-only">(current)</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <main className="col-8 mt-5 m-auto">
        <section
          style={{
            border: "1px dashed #17a2b8",
            borderRadius: "10px",
            backgroundColor: "#dbfbe2",
          }}
          className="text-justify p-3 mb-5"
        >
          *شما میتوانید تصاویر خود را برای ویرایش با استفاده از گزینه انتخاب عکس
          و یا کشیدن تصویر و رها کردن در باکس پایین آپلود کنید.
          <br />
          *همچنین می توانید با استفاده از گزینه آدرس عکس،لینک تصویر مورد نظر خود
          را جهت ویرایش داخل کادرمتنی قرار دهید.
          <br /> *در انتها عکس های انتخاب شده خود را با استفاده از گزینه تبدیل
          بارگذاری کنید تا در انتها با استفاده از لینک دانلود، تصاویر تبدیل شده
          خود را دریافت کنید.
          <br />
        </section>
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={5}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div>
              <div
                {...dragProps}
                style={{ backgroundColor: "#63bb67" }}
                className="p-2 text-center rounded"
              >
                <div
                  style={{
                    backgroundColor: "#4caf50",
                    border: "1px dashed #fff",
                  }}
                  className="p-2 rounded"
                >
                  {inputLink ? (
                    <div>
                      <div className="text-left m-0">
                        <button
                          onClick={() => setInputLink(false)}
                          className="btn text-light"
                        >
                          برگشت{" "}
                          <i
                            style={{ verticalAlign: "-webkit-baseline-middle" }}
                            className="bi bi-arrow-left-short h1"
                          ></i>
                        </button>
                      </div>
                      <div className="text-center m-0">
                        <h4 className="text-light">
                          آدرس تصویر
                          <i
                            className="bi bi-link-45deg h1"
                            style={{ verticalAlign: "-webkit-baseline-middle" }}
                          ></i>
                        </h4>
                      </div>
                      <div dir="ltr" className="text-center m-0">
                        <input
                          type="url"
                          className="form-control"
                          placeholder="https://www.example/exampleFile.jpg"
                          onChange={inputUrlHandler}
                        />
                      </div>
                      <div className="col-12 mx-auto my-2">
                        {isLoading ? (
                          loader()
                        ) : (
                          <img className="w-25 rounded" src={url} />
                        )}
                      </div>

                      <div className="text-center m-3">
                        <button
                          onClick={addimageUrl}
                          className="btn btn-success"
                          disabled={url === ""}
                        >
                          افزودن
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div>
                        <i
                          className="bi bi-cloud-arrow-up-fill text-white m-0"
                          style={{ fontSize: "8rem" }}
                        ></i>
                        <h6
                          className="text-center text-light"
                          style={{ marginTop: "-4rem" }}
                        >
                          {isDragging
                            ? "رها کنید."
                            : "تصاویر را اینجا رها کنید، یا کلیک کنید."}
                        </h6>
                      </div>
                      <div className="row col-md-6 col-sm-12 mx-auto my-5">
                        <button
                          className="btn btn-light my-1 mx-auto col-md-5 col-sm-12 rounded"
                          onClick={() => {
                            setShowInvalid(false);
                            onImageUpload();
                          }}
                        >
                          انتخاب عکس
                        </button>
                        <button
                          className="btn btn-light col-md-5 my-1 mx-auto col-sm-12 rounded"
                          onClick={() => setInputLink(true)}
                        >
                          آدرس عکس
                        </button>
                        {checkFileSize()}

                        {showInvalid ? (
                          <div className="mt-3 col-12 mx-auto p-3 bg-danger rounded text-white">
                            {imageNames.map((item) => {
                              return <p>{item} غیر مجاز است.</p>;
                            })}
                            <h5>حجم تصاویر باید کمتر از 5 مگابایت باشد.</h5>
                          </div>
                        ) : null}
                      </div>
                      <div
                        className={
                          images.length == 5
                            ? "alert alert-danger mx-auto col-md-4 col-sm-12"
                            : "alert alert-success mx-auto col-md-4 col-sm-12"
                        }
                      >
                        تعداد عکس مجاز برای بارگذاری: {5 - images.length}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {images.map((image, index) => {
                return (
                  <div
                    className={
                      res[index]?.statusText == "OK"
                        ? "mt-3 mx-auto row text-dark rounded"
                        : "mt-3 mx-auto row text-dark rounded"
                    }
                    key={index}
                    style={
                      res[index]?.statusText == "OK"
                        ? { backgroundColor: "#82ca86" }
                        : { backgroundColor: "#cecece" }
                    }
                  >
                    {console.log(res)}
                    <img
                      style={{ height: "3rem" }}
                      className="col-md-1 col-sm-12 mx-auto my-2 rounded"
                      src={image.data_url}
                      alt=""
                    />
                    <p className="col-md-7 text-center col-sm-12 m-auto">
                      {image.file.name}
                    </p>

                    <button
                      className="btn col-md-1 col-sm-12 btn-danger m-auto"
                      onClick={() => onImageRemove(index)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                );
              })}
              {showProgress ? (
                <div
                  dir="ltr"
                  style={{
                    border: "2px solid #aaa",
                    borderRadius: "50px",
                    height: "25px",
                  }}
                  className="col-6 my-3 mx-auto p-0 overflow-hidden text-dark"
                >
                  <div
                    style={{
                      width: `${loaded}%`,
                      fontSize: "1rem",
                    }}
                    className="text-center bg-warning bg-gradient"
                  >
                    <p className="px-1">{loaded}%</p>
                  </div>
                </div>
              ) : null}
              <div className="col-12 text-center my-3">
                <button
                  className="btn btn-success col-6"
                  onClick={handleUpload}
                  disabled={images == ""}
                >
                  بارگذاری
                </button>
              </div>
            </div>
          )}
        </ImageUploading>
      </main>
    </div>
  );
}

export default App;
