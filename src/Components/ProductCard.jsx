const ProductCard = ({ product }) => {
  console.log(product);
  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure>
        <img src={product.image} alt="Shoes" />
      </figure>
      <div className="">
        <div className="py-3 px-3">
          <h2 className="card-title text-green-600">{product.name}</h2>
          <div className="">
            <p className="text-base mt-1">
              Category :
              <span className="text-lg font-semibold text-orange-600">
                {product.category}
              </span>
            </p>
            <p className="text-base mt-1">
              Brand :
              <span className="text-lg font-semibold text-orange-600">
                {product.brand}
              </span>
            </p>
          </div>
          <div className="">
            <p>
              Price :{" "}
              <span className="text-lg text-red-600 font-semibold">
                {product.price} $
              </span>
            </p>
            <p>
              Ratings :{" "}
              <span className="text-lg text-green-600 font-semibold">
                {product.ratings}
              </span>
            </p>
            <p>
              Description : <span>{product.description}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
