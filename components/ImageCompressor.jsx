import React from "react";

import imageCompression from "browser-image-compression";
import S3 from "react-aws-s3";

import Card from "react-bootstrap/Card";
import { s3Config } from "../common/s3Config";

const uuidv4 = () => {
  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export default class imageCompressor extends React.Component {
  constructor() {
    super();
    this.state = {
      compressedLink:
        "http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png",
      originalImage: "",
      originalLink: "",
      clicked: false,
      uploadImage: false,
    };
  }

  handle = async (e) => {
    if (e.target.files.length === 0) {
      return;
    }

    const imageFile = e.target.files[0];
    this.setState({
      originalLink: URL.createObjectURL(imageFile),
      originalImage: imageFile,
      outputFileName: imageFile.name,
      uploadImage: true,
    });
  };

  changeValue = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  click = (e) => {
    e.preventDefault();

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };

    if (options.maxSizeMB >= this.state.originalImage.size / 1024) {
      alert("Image is too small, can't be Compressed!");
      return 0;
    }

    let output;
    imageCompression(this.state.originalImage, options).then(async (x) => {
      output = x;

      const downloadLink = URL.createObjectURL(output);
      this.setState({
        compressedLink: downloadLink,
      });

      const ReactS3Client = new S3(s3Config);
      await ReactS3Client.uploadFile(output, uuidv4()).then((data) => {
        if (data.status === 204) {
          console.log("success");
        } else {
          console.log("fail");
        }
      });
    });

    this.setState({ clicked: true });
    return 1;
  };

  render() {
    return (
      <div className="m-5">
        <div className="text-light text-center">
          <h1>Three Simple Steps</h1>
          <h3>1. Upload Image</h3>
          <h3>2. Click on Compress</h3>
          <h3>3. Download Compressed Image</h3>
        </div>

        <div className="row mt-5">
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
            {this.state.uploadImage ? (
              <Card.Img
                className="ht"
                variant="top"
                src={this.state.originalLink}
              ></Card.Img>
            ) : (
              <Card.Img
                className="ht"
                variant="top"
                src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"
              ></Card.Img>
            )}
            <div className="d-flex justify-content-center">
              <input
                type="file"
                accept="image/*"
                className="mt-2 btn btn-dark w-75"
                onChange={(e) => this.handle(e)}
              />
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 mb-5 mt-5 col-sm-12 d-flex justify-content-center align-items-baseline">
            <br />
            {this.state.outputFileName ? (
              <button
                type="button"
                className=" btn btn-dark"
                onClick={(e) => this.click(e)}
              >
                Compress
              </button>
            ) : (
              <></>
            )}
          </div>

          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-3">
            <Card.Img variant="top" src={this.state.compressedLink}></Card.Img>
            {this.state.clicked ? (
              <div className="d-flex justify-content-center">
                <a
                  href={this.state.compressedLink}
                  download={this.state.outputFileName}
                  className="mt-2 btn btn-dark w-75"
                >
                  Download
                </a>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
}
