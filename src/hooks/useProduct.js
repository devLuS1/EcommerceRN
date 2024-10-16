import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../services/shopServices";
import { useDispatch } from "react-redux";
import { setProducts } from "../features/shop/shopSlice";

const useProduct = () => {
  const { data, isLoading } = useGetProductsQuery();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProducts(data));
    setLoading(false);
  }, [isLoading]);

  return { loading };
};

export default useProduct;
