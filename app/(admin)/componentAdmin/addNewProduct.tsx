import React from "react";
import { useState } from "react";
import logoIcon from '../../../public/logoIcon.svg'
import { URI } from '../../../utils/globalUri';
import UploadImage from "@/app/component/uploadImage";
import LoadingSpin from "react-loading-spin";
import Button from "@/app/component/button";
import { useProductsStore } from "@/zustandStore/productsStore";
import { IProduct } from "@/interfaces/interfaces";
import ProductImage from "@/app/component/productImage";
import Image from "next/image";
import { useExistEmptyFields } from "@/utils/useExistEmptyFields";
import HeaderCard from "./headerCard";

interface PropsAddNewProduct {
  close: () => void | null,
}

const AddNewProduct = ({ close }: PropsAddNewProduct) => {
  //Global Zustand State
  const { addListOfNewProduct, addNewProduct, sizesProductAvailable, categoriesProductAvailable, superCategoriesProductAvailable } = useProductsStore(state => state);

  //Local variable
  const [msg, setMsg] = useState('Create New Product')
  const [loading, setLoading] = useState(false)

  const [nameProduct, setNameProduct] = useState('');
  const [colorProduct, setColorProduct] = useState('');
  const [descriptionProduct, setDescriptionProduct] = useState('');
  const [priceProduct, setPriceProduct] = useState('');
  const [selectedPictures, setSelectedPictures]: any = useState(null);
  const [brandProduct, setBrandProduct] = useState('');
  const [productCode, setProductCode] = useState('');
  const [sizeProduct, setSizeProduct] = useState('');
  const [stockProduct, setStockProduct]: any = useState(1);
  const [categoryProduct, setCategoryProduct] = useState('');
  const [superCategoryProduct, setSuperCategoryProduct] = useState('');
  const [listOfProductAdded, setListOfProductAdded] = useState([]);

  const resetFields = () => {
    setNameProduct('');
    setColorProduct('');
    setDescriptionProduct('');
    setPriceProduct('');
    setBrandProduct('');
    setStockProduct(1);
    setSizeProduct('');
    setCategoryProduct('');
    setSuperCategoryProduct('');
    setProductCode('');
    setSelectedPictures(null)
  }



  const handleClickCloseButton = (e: any) => {
    e.preventDefault();
    resetFields();
    close();
    setMsg('Create New Product')
  }

  const handleClickSaveButton = (e: any) => {
    e.preventDefault();
    if (!useExistEmptyFields(nameProduct, colorProduct, descriptionProduct, priceProduct, brandProduct, categoryProduct, superCategoryProduct, stockProduct, selectedPictures, productCode)) {

      let linksToSelectedImages = selectedPictures.blobs;

      const addNewProductToList: any = {
        id: ++listOfProductAdded.length,
        nameProduct: nameProduct,
        colorProduct: colorProduct,
        descriptionProduct: descriptionProduct,
        priceProduct: priceProduct,
        brandProduct: brandProduct,
        sizeProduct: sizeProduct,
        stockProduct: stockProduct,
        categoryProduct: categoryProduct,
        superCategoryProduct: superCategoryProduct,
        productCode: productCode,
        selectedPictures: linksToSelectedImages,
      }


      addListOfNewProduct(addNewProductToList)

      resetFields();
      { setMsg('Create New Product') }
    }
    else { setMsg('Empty field(s)') }

  }


  const handleClickCreateButton = async () => {
    setLoading(true)
    let formData = new FormData();

    if (!useExistEmptyFields(nameProduct, colorProduct, descriptionProduct, priceProduct, brandProduct, categoryProduct, superCategoryProduct, stockProduct, selectedPictures, productCode)) {

      formData.append("name", nameProduct)
      formData.append("brand", brandProduct)
      formData.append("color", colorProduct)
      formData.append("description", descriptionProduct)
      formData.append("price", priceProduct)
      formData.append("productCode", productCode)
      formData.append("stock", stockProduct)
      formData.append("size", sizeProduct)
      formData.append("categoryName", categoryProduct)
      formData.append("superCategoryName", superCategoryProduct)

      // append all images to formData
      for (let index = 0; index < selectedPictures.files.length; index++) {
        let image = selectedPictures.files[index];
        formData.append(`files`, image);
      }

      await fetch(`${URI}Product/v1/create/newProduct`, {
        method: "POST",
        body: formData,
        headers: {
          'Authorization': `${localStorage.getItem('TOKEN_ACCESS') && localStorage.getItem('TOKEN_ACCESS')}`
        }
      })
        .then(response => response.json())
        .then(data => {
          const { success, newProductCreated } = data

          if (success) {
            const newProduct = {
              id: newProductCreated.id,
              name: newProductCreated.name,
              color: newProductCreated.color,
              description: newProductCreated.description,
              price: newProductCreated.price,
              brand: newProductCreated.brand,
              sizeStock: newProductCreated.sizeStock,
              stock: newProductCreated.stock,
              productCode: productCode,
              categoryProduct: newProductCreated.categoryProduct,
              superCategoryProduct: newProductCreated.superCategoryProduct,
              productImages: newProductCreated.productImages
            }

            addNewProduct(newProduct);
          }
        })
        .catch(error => setMsg(error.toString()))

      setLoading(false)
      setMsg('The product was successfully created')
      resetFields()

    } else { setMsg('Empty field(s)') }
  }

  setTimeout(() => {
    setMsg('Create New Product')
  }, 5000);



  return (
    <div className="containerAddNewProduct flex justify-center items-center min-w-[600px] w-max h-max mx-5 bg-[var(--baseColor)] rounded-lg">

      <div className="wrapperAddNewProduct flex flex-col w-full h-max">

        <div className="loading-spinner">
          {loading && <LoadingSpin />}
        </div>

        <div className="headerAddNewProduct flex justify-between w-full h-max">

          <div className="leftSideHeaderAddNewProduct flex ">
            <Button
              onClick={handleClickSaveButton}
              textButton={'Save Multiple Products'}
            />
            <Button
              onClick={handleClickCreateButton}
              textButton={'Create'}
            />
          </div>

          <div className="rightSideAddNewProduct flex ">
            <Button
              onClick={() => { close(); resetFields() }}
              textButton={'X'}
            />

          </div>

        </div>


        <div className="msg flex justify-center items-center text-[20px] font-bold m-5">{msg}</div>

        <div className="formAddNewProduct flex h-max">
          <div className="lefSideFormAddNewProduct flex flex-col">

            <label >Name Product</label>
            <input type={'text'} autoFocus={true} value={nameProduct} id={'nameProduct'} onChange={(e) => { setNameProduct(e.target.value) }} />
            <label >Color Product</label>
            <input type={'text'} value={colorProduct} id={'colorProduct'} onChange={(e) => { setColorProduct(e.target.value) }} />
            <label >Description Product</label>
            <input type={'text'} value={descriptionProduct} id={'descriptionProduct'} onChange={(e) => { setDescriptionProduct(e.target.value) }} />
            <label>Price Product</label>
            <input type={'number'} value={priceProduct} id={'priceProduct'} onChange={(e) => { setPriceProduct(e.target.value) }} />
            <label >Brand Product</label>
            <input type={'text'} value={brandProduct} id={'brandProduct'} onChange={(e) => { setBrandProduct(e.target.value) }} />
            <label >Stock Product</label>
            <input type={'number'} value={stockProduct} id={'stockProduct'} onChange={(e) => { parseInt(e.target.value) > 0 && setStockProduct(e.target.value) }} />
            <label >Code Product</label>
            <input type={'text'} value={productCode} id={'productCode'} onChange={(e) => { setProductCode(e.target.value) }} />
            <label >Size Product</label>
            <select value={sizeProduct} onChange={(e) => setSizeProduct(e.target.value)}>
              < option value={'None'} > None</option>
              {
                sizesProductAvailable?.map((size: any, index: number) => {
                  return (
                    < option key={index} value={size.name} > {size.name}</option>
                  )
                })
              }
            </select>

            <label>Category Product</label>
            <select value={categoryProduct} onChange={(e) => setCategoryProduct(e.target.value)}>
              < option value={'None'} > None</option>
              {
                categoriesProductAvailable && categoriesProductAvailable.map((category: any, index: number) => {
                  return (
                    < option key={index} value={category.name} > {category.name}</option>
                  )
                })
              }
            </select>

            <label>Super Category Product</label>
            <select value={superCategoryProduct} onChange={(e) => setSuperCategoryProduct(e.target.value)}>
              < option value={'None'} > None</option>
              {
                superCategoriesProductAvailable && superCategoriesProductAvailable.map((superCategory: any, index: number) => {
                  return (
                    < option key={index} value={superCategory.name} > {superCategory.name}</option>
                  )
                })
              }
            </select>

          </div>


          <div className="rightSide flex flex-col justify-center items-center h-full w-max">

            <label className="flex justify-center items-center text-[17px] font-bold m-2 p-2">Picture Product</label>
            <div className="uploadPhotoComponent flex justify-center items-center m-0 w-auto h-max">
              <UploadImage imagesSelected={(images: any) => setSelectedPictures(images)} />
            </div>

            <div className="wrapperImages flex flex-row justify-around items-center w-full h-[450px]">

              <div className="upSideImages flex flex-col justify-between items-center m-2 p-2 h-max">
                <div className="img_1 flex justify-center items-center m-2 p-1 w-max h-max"><Image width={100} height={100} src={selectedPictures !== null && selectedPictures.blobs[0] || logoIcon} alt="img 1" /></div>
                <div className="img_2 flex justify-center items-center m-2 p-1 w-max h-max"><Image width={100} height={100} src={selectedPictures !== null && selectedPictures.blobs[1] || logoIcon} alt="img 2" /></div>
              </div>

              <div className="downSideImages flex flex-col justify-between items-center  m-2 p-2 w-max h-max">
                <div className="img_3 flex justify-center items-center m-2 p-1 w-max h-max"><Image width={100} height={100} src={selectedPictures !== null && selectedPictures.blobs[2] || logoIcon} alt="img 3" /></div>
                <div className="img_4 flex justify-center items-center m-2 p-1 w-max h-max"><Image width={100} height={100} src={selectedPictures !== null && selectedPictures.blobs[3] || logoIcon} alt="img 4" /></div>
              </div>

            </div>

          </div>
        </div>

      </div >

    </div>
  )
};

export default AddNewProduct;
