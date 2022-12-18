import React from "react";
import styledComponents from "styled-components";


const UploadImage = ({ imgsSelected }) => {

  const handleSelectedNewImages = (e) => {
    const TMP_selectedFiles = e.target.files;

    const selectedFileArray = Array.from(TMP_selectedFiles);

    const imagesArray = selectedFileArray.map((image) => {
      return URL.createObjectURL(image);
    });

    imgsSelected(imagesArray)
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
      content: "Browse photos";
      white-space: nowrap;
      text-align: center;
      font-weight: 700;
      font-size: 10pt;
    }

    .custom-file-input:hover {
      color: white;
    }

    .product-added h3{
      margin: 5px;
      text-align: center;
    }

    .wrapper-btn {
      display: flex;
      justify-content :center;
      align-items: center;
      width: 70%;
      height: 35px;
    } 
`;
