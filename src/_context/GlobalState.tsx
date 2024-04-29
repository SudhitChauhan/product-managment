import { ReactElement, createContext, useState } from "react";
import toast from "react-hot-toast";

export interface Errors {
    title: string;
    description: string;
    price: string;
    isError: boolean;
}

export interface productType {
    id: number,
    img: string
    title: string,
    description: string,
    price: number
}

export interface basicproductType {
    id?: number,
    title: string,
    description: string,
    price: number
}

export const GlobalContext = createContext<{ showPopup: boolean, handlePopUp: (value: boolean) => void, productList: productType[], addProduct: (value: basicproductType) => void, removeProduct: (value: number) => void, setDataProduct: (value: number) => void, product: basicproductType, setProduct: (value: basicproductType) => void, activityAction: string, updateProduct: (value: basicproductType) => void, errors: Errors } | null>(null);

const GlobalState = ({ children }: { children: ReactElement }) => {

    // State for PopUp
    const [showPopup, setShowPopup] = useState<boolean>(false);

    // State for ProductForm fields
    const [product, setProduct] = useState<basicproductType>({
        title: '',
        description: '',
        price: 0,
    });

    // State for ProductForm Errors
    const [errors, setErrors] = useState<Errors>({
        isError: false,
        title: '',
        description: '',
        price: ''
    });

    // Action for Update or add product 
    const [activityAction, setActivityAction] = useState<string>('add_product');

    // State for ProductList 
    const [productList, setProductList] = useState<productType[]>([]);


    // Product Popup Handler
    const handlePopUp = (value: boolean) => {
        setErrors({
            isError: false,
            title: '',
            description: '',
            price: ''
        });
        setShowPopup(value)
    };

    // Add Product Handler
    const addProduct = (product: basicproductType) => {

        if (!isFormCorrect(product)) {
            let newProduct = { id: productList.length + 1, img: './_assets/img/product_placeholder.png', ...product }
            setProductList([...productList, newProduct])
            setProduct({
                title: '',
                description: '',
                price: 0,
            });

            handlePopUp(false);
            toast.success('Product added!')
        }
    }

    // Update Product Handler
    const updateProduct = (product: basicproductType) => {

        if (product.id && !isFormCorrect(product)) {
            let newData: productType = {
                id: product.id,
                img: './_assets/img/product_placeholder.png',
                title: product.title,
                description: product.description,
                price: product.price,
            };
            let updatedProdactList = productList.map((item) => {
                if (item.id === product.id) return newData;
                else return item;
            });

            setProductList(updatedProdactList);

            setProduct({
                title: '',
                description: '',
                price: 0,
            });
            setActivityAction('add_product');
            handlePopUp(false);

        }

    }

    // Delete Product Handler
    const removeProduct = (id: number) => {
        let UpdatedList = productList.filter((item) => { return item.id !== id })

        let userInput = prompt("Are You Sure? (Y/N)")
        if (userInput?.toLowerCase() == 'y' || userInput?.toLowerCase() == 'yes') {
            setProductList(UpdatedList);
            toast.success('Successfully Remove!')
        } else if (userInput == 'N') {
            return
        } else {    
            toast.error('Give Valid Response!')
        }
    }

    // This Handler set Data in ProductForm when it's on update mode 
    const setDataProduct = (id: number) => {
        let productItem = productList.find((item) => { return item.id === id })
        setShowPopup(true);

        if (productItem) {
            setProduct({
                id: productItem?.id,
                title: productItem?.title,
                description: productItem?.description,
                price: productItem?.price,
            });

            setActivityAction('update_product');
        }
    }

    // ProductForm error Handler
    const isFormCorrect = (data: basicproductType) => {
        let errormsg: Errors = {
            isError: false,
            title: '',
            description: '',
            price: ''
        };
        if (data.title == '' || data.price == 0 || data.description == '') {

            if (data.price == 0) errormsg.price = 'Price is required';
            if (data.title == '') errormsg.title = 'Title is required';
            if (data.description == '') errormsg.description = 'Description is required';

            errormsg.isError = true;

            setErrors(errormsg);
            return true;
        } else {
            return false;
        }
    }


    const values = { showPopup, handlePopUp, productList, addProduct, removeProduct, setDataProduct, product, setProduct, activityAction, updateProduct, errors };
    return (<GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>);
}

export default GlobalState;