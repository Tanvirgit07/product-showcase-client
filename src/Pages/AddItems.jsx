import React from "react";
import { toast, Toaster } from "sonner";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";

const AddItems = () => {
  const axiosSecure = useAxiosSecure();

  // const navigate = useNavigate();
  const { mutateAsync } = useMutation({
    mutationFn: async (addItem) => {
      const { data } = await axiosSecure.post(`/item`, addItem);
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully added class !");
    },
  });
  const handleAdd = async (e) => {
    // e.preventDefault();
    // const form = e.target;
    // const brand = form.brand.value;
    // const category = form.category.value;
    // const description = form.description.value;
    // const price = form.price.value;
    // const name = form.name.value;
    // const ratings = form.ratings.value;
    // const image = form.image.value;
    // const currentDate = new Date().toISOString(); // Initialize the current date correctly

    e.preventDefault();
    const form = e.target;
    const brand = form.brand.value;
    const category = form.category.value;
    const description = form.description.value;
    const price = parseFloat(form.price.value); // Make sure price is a float
    const name = form.name.value;
    const ratings = parseFloat(form.ratings.value); // Make sure ratings are a float
    const image = form.image.value;
    const createdAt = new Date().toISOString();

    try {
      const addItem = {
        brand,
        category,
        description,
        price,
        name,
        ratings,
        image,
        createdAt,
      };

      console.log(addItem);
      await mutateAsync(addItem);
    } catch (error) {
      console.log(error.message);
    }

    const addItem = {
      brand,
      category,
      description,
      price,
      name,
      ratings,
      image,
      createdAt// Rename to createdAt for clarity
    };

    console.log(addItem);
    // Add your API call here to submit the data
  };

  return (
    <div
      className="max-w-4xl shadow-2xl mx-auto border-solid border-2 border-gray-300 p-10 
    mt-8 rounded-xl mb-7"
    >
      <form onSubmit={handleAdd}>
        <div>
          <div className="grid grid-cols-2 gap-7">
            <div>
              <p className="mb-1 ml-1">Brand</p>
              <input
                type="text"
                name="brand"
                placeholder="Brand Name"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <p className="mb-1 ml-1">Category</p>
              <input
                type="text"
                name="category"
                placeholder="Category Name"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <p className="mb-1 ml-1">Description</p>
              <input
                type="text"
                name="description"
                placeholder="Description"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <p className="mb-1 ml-1">Name</p>
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <p className="mb-1 ml-1">Price</p>
              <input
                type="text"
                name="price"
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <p className="mb-1 ml-1">Ratings</p>
              <input
                type="text"
                name="ratings"
                placeholder="Ratings"
                className="input input-bordered w-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-7">
          <div>
            <p className="mb-1 ml-1">Image URL</p>
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="mt-10">
          <button className="btn btn-outline w-full btn-primary">
            Add Item
          </button>
        </div>
      </form>
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default AddItems;
