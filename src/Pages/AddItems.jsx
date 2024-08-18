import React from "react";
import { toast, Toaster } from "sonner";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";



const AddItems = () => {
  const axiosSecure = useAxiosSecure();
  const { mutateAsync } = useMutation({
    mutationFn: async (addItem) => {
      const { data } = await axiosSecure.post(`/item`, addItem);
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully added class!");
    },
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    const form = e.target;
    const brand = form.brand.value;
    const category = form.category.value;
    const description = form.description.value;
    const price = parseFloat(form.price.value); // Ensure price is a float
    const name = form.name.value;
    const ratings = parseFloat(form.ratings.value); // Ensure ratings are a float
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
  };

  return (
    <div className="max-w-4xl shadow-2xl mx-auto border-solid border-2 border-gray-300 p-5 md:p-10 mt-8 rounded-xl mb-7">
      <form onSubmit={handleAdd}>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
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

        <div className="mt-5 md:mt-7">
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

        <div className="mt-7 md:mt-10">
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

