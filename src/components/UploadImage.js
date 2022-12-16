import React, { useState } from "react";
import styledComponents from "styled-components";


const UploadImage = ({ imgsSelected }) => {
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState();
  const [selectedFiles, setSelectedFiles] = useState();

  const [contentTextArea, setContentTextArea] = useState("");
  const [descriptionProduct, setDescriptionProduct] =
    useState("Add description");
  const [tmp_IdProductToSelected, setTmp_IdProductToSelected] = useState();
  const [sizeImage, setSizeImage] = useState(null);
  const [dynamicMsg, setDynamicMsg] = useState("Maximum 1.25 Mb");
  const [txtBtn_Remove, setTxtBtn_Remove] = useState("Remove");
  const [txtBtn_Save, setTxtBtn_Save] = useState("Save");

  const handleSelectedNewImages = (e) => {
    setLoading(true);

    const TMP_selectedFiles = e.target.files;
    setImages(TMP_selectedFiles);

    const selectedFileArray = Array.from(TMP_selectedFiles);

    const imagesArray = selectedFileArray.map((image) => {
      return URL.createObjectURL(image);
    });

    console.log(imagesArray);
    setSelectedFiles(imagesArray);
    imgsSelected = imagesArray
    setLoading(false);
  };

  const handleAddDescription = (e) => {
    console.log("test", e.target);
    setTmp_IdProductToSelected(e.target.id);
    setToggle(true);
  };

  const handleSetDescription = () => {
    console.log(selectedFiles[tmp_IdProductToSelected]);
    setDescriptionProduct(contentTextArea);
    setToggle(false);
  };

  return (
    <Wrapper>
      <div className="wrapper-btn">
        <input
          className="custom-file-input"
          name="newImage"
          type="file"
          multiple={true}
          onChange={handleSelectedNewImages}
        />
      </div>

      <div className="container-products-added">
        {!loading ? (
          selectedFiles &&
          selectedFiles.map((image, index) => {
            return (
              <div className="product-added" key={index}>
                <h3>{images && images[index].name.toString().split(".")[0]}</h3>
                <img style={{ width: "200px", height: "auto" }} src={image} />

              </div>
            );
          })
        ) : (
          <div>Loading...</div>
        )}
        {toggle ? (
          <div className="wrapper-popUp">
            <div className="popUp">
              <h3
                style={{
                  position: "absolute",
                  textAlign: "center",
                  top: "130px",
                  // bottom: "0px",
                  left: "0px",
                  right: "0px",
                  margin: "auto",
                  width: "100%",
                  height: "20px",
                }}
              >{` ${images[tmp_IdProductToSelected].name.toString().split(".")[0]
                }`}</h3>
              <textarea
                value={contentTextArea}
                onChange={(e) => {
                  setContentTextArea(e.target.value);
                  console.log(e.target.value);
                }}
              />

            </div>
          </div>
        ) : null}
      </div>
    </Wrapper>
  );
};

export default UploadImage;

const Wrapper = styledComponents.div`
    display: flex;
    flex-direction: column;
    justify-content : flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    // background: salmon;
    
     .container-products-added{
      display: flex;
      justify-content :center;
      align-items: center;
      width: 100%;
      height: auto;
      flex-wrap: wrap;
    }

    
    .custom-file-input {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 25px auto;
      color: transparent;
      height: 25px;
    }

    .custom-file-input::-webkit-file-upload-button {
      visibility: hidden;
    }

    .custom-file-input::before {
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--baseColor);
      background-color: var(--buttonColor);
      width: 100%;
      height: 25px;
      margin:  auto;
      border-radius: 5px;
      border: none;
      cursor: pointer;
      outline: none;
      content: "Browse photo";
      white-space: nowrap;
      text-align: center;
      font-weight: 700;
      font-size: 10pt;
    }

    .custom-file-input:hover {
      color: white;
    }

    
    .product-added {
      display: flex;
      flex-direction: column;
      justify-content :center;
      align-items: center;
      padding: 5px;
      border: 1px solid  #8080801f;
      border-radius: 10px;
    }

    .product-added h3{
      margin: 5px;
      text-align: center;
    }


    .wrapper-popUp {
      position: fixed;
      top: 0px;
      bottom: 0px;
      left: 0px;
      right: 0px;
      margin: auto;
      width: 100%;
      height: 100%;
      background: #808080c7;
    }
    
    .popUp {
      display: flex;
      background: aquamarine;
      width: 75%;
      height: 87%;
      align-items: center;
      justify-content: center;


      // position: absolute;
      // top: 0px;
      // bottom: 0px;
      // left: 0px;
      // right: 0px;
      // margin: auto;
      // width: auto;
      // height: auto;
      // background: green;
    }

    .wrapper-textarea {
      // display:flex;
      // justify-content: center;
      // align-items: center;
      // background: green;
    }
    
    .wrapper-popUp textarea {
      position: absolute;
      top: 0px;
      bottom: 0px;
      left: 0px;
      right: 0px;
      margin: auto;
      text-align: left;
      width: 300px;
      height: 300px;
      background: white;
      border: none;
      border-radius: 5px;
      outline: none;
    }



    .wrapper-btn {
      display: flex;
      justify-content :center;
      align-items: center;
      width: 70%;
      height: 35px;
    } 
    
    
`;
