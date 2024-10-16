import { useEffect } from "react";
import { useGetOrdersByUserQuery } from "../services/shopServices";
import { useDispatch } from "react-redux";
import { setOrders } from "../features/shop/shopSlice";

const useOrder = (email) => {
  const { data, isLoading } = useGetOrdersByUserQuery(email);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOrders(data));
  }, [isLoading]);

  return { isLoading };
};

export default useOrder;
