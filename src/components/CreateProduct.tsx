import { Progress } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { handleUpload } from "../hooks and utils/uploadFiles";
import { useGetCategoriesQuery, usePostProductMutation } from "../services/products/products"
import { Category, Status } from "../services/products/types";
import Input from "./base/Input";
import LoadingOverLay from "./base/LoadingOverlay";
import Spinner from "./base/Spinner";


export default function CreateProduct() {
    const { data, error, isLoading, isError } = useGetCategoriesQuery();
    const [category, setCategory] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [brand, setBrand] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [stock, setStock] = useState<number>(0);
    const [rating, setRating] = useState<number>(0);
    const [numReviews, setNumReviews] = useState<number>(0);
    const [status, setStatus] = useState<Status>(Status.NEW);
    const [uploadPost, uploadStatus] = usePostProductMutation();
    const [percent, setPercent] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const loggedInUser = useSelector((state: RootState) => state.auth.user);
    const [formError, setFormError] = useState({
        title: '',
        description: '',
        stock: '',
    })
    function handleChange(event) {
        setImage(event.target.files[0]);
    }
    const handleSubmision = async (e) => {
        console.log("submit button clicked")
        e.preventDefault();
        //disable button
        //send data to server
        // const downLoadLink = await handleUpload(image, setPercent);
        // const upload = uploadPost({
        //     title,
        //     brand,
        //     price,
        //     description,
        //     image: downLoadLink,
        //     stock,
        //     rating,
        //     numReviews,
        //     category,
        //     status: status,
        // });
        let flag = false;
        let errors = {
            title: '',
            price: '',
            description: '',
        }
        if (title == '') {
            errors.title = 'title is required';
            flag = true;
        }
        if (price <= 0) {
            errors.price = 'invalid price range';
            flag = true;
        }
        if (description.length <= 100) {
            errors.description = 'description is to short';
        }
        if (flag) setFormError({...formError, ...errors});
        if (!flag) {
            let downloadLink: string = '';
            try {
                setLoading(!loading);
                if (image !== null) {
                    downloadLink = await handleUpload(image, setPercent) as string;
                }
                await uploadPost({
                    title,
                    brand,
                    price,
                    category,
                    description: description,
                    image: downloadLink,
                    status: Status.NEW,
                    stock: stock,
                    rating: 0,
                    numReviews: 0,
                    isFeatured: true,
                    postedBy: loggedInUser.uid,
                })
                setLoading(false);
            } catch (e) {
                
            }
            
        }
    }
    return (
        <section className="relative bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="sm:col-span-2">
                        <Input
                            label="title"
                            placeholder="Type product name"
                            onChange={setTitle}
                            error={formError.title}
                        >
                        </Input>
                           
                        </div>
                    <div className="w-full">
                        <Input
                            label="brand"
                            placeholder="Product brand"
                            onChange={setBrand}
                            error=''
                           />
                        </div>
                    <div className="w-full">
                        <Input
                            label="price"
                            placeholder="2999 etb"
                            onChange={setPrice}
                            type="number"
                            error={formError.price}
                        />

                        </div>
                        <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                        <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value={category} onChange={(e)=> setCategory(e.target.value)}
                        >
                                <option selected={true}>Select category</option>
                                {
                                    isLoading ? "loading" : data?.map(
                                        (cat: Category) => <option value={cat.id} onChange={()=>setCategory(cat.id)}>{cat.category}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea id="description" rows={8} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here" onChange={(e)=> setDescription(e.currentTarget.value)}></textarea>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="default_size">Product Image</label>
                            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="default_size" type="file" onChange={(e)=>handleChange(e)} />
                        </div> 

                    </div>
                    <button type="submit" onClick={e => handleSubmision(e) } className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Add Product
                </button>
               
                {uploadStatus.isError && <p>{uploadStatus.error}</p>}
                {uploadStatus.isSuccess && <p>success</p>}
            </div>
            {loading && <LoadingOverLay>
                <Spinner/>
            </LoadingOverLay>}
            
        </section>
    )
}

