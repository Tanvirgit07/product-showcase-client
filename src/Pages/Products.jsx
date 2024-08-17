import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import ProductCard from "../Components/ProductCard";

const Products = () => {
  const [page, setPage] = useState(1);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('price_asc'); // New state for sorting
  const limit = 8;

  const axiosSecure = useAxiosSecure();
  const {
    data: { products = [], totalPages } = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-product", page, brand, category, minPrice, maxPrice, search, sort], // Include sort in queryKey
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/all-product?page=${page}&limit=${limit}&brand=${brand}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&search=${search}&sort=${sort}` // Include sort in the request
      );
      return data;
    },
  });

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) handlePageChange(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) handlePageChange(page - 1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <div>
      <div className="mb-10 p-4 bg-gray-100 rounded-lg shadow-md">
        <form className="" onSubmit={handleSearchSubmit}>
          <div className="w-2/5 mx-auto">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search products by name"
              className="p-2 border rounded-md w-4/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">
              Search
            </button>
          </div>
        </form>

        <div className="w-2/5 mx-auto mt-4">
          <label className="block text-sm font-medium text-gray-700">Sort By</label>
          <select
            value={sort}
            onChange={handleSortChange}
            className="p-2 mt-1 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="date_added_desc">Date Added: Newest First</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {/* Brand filter */}
          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">Brand</span>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter brand name"
            />
          </label>

          {/* Category filter */}
          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">Category</span>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category"
            />
          </label>

          {/* Min Price filter */}
          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">Min Price</span>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter minimum price"
            />
          </label>

          {/* Max Price filter */}
          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">Max Price</span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter maximum price"
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard product={product} key={product._id}></ProductCard>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button 
          onClick={handlePrevPage} 
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 mx-2 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>

        <div className="flex items-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`px-4 py-2 mx-1 rounded-md ${page === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button 
          onClick={handleNextPage} 
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 mx-2 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;



