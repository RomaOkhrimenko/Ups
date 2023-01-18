import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS, GET_ORDERS } from "../graphql/queries";

const UseCustomerOrders = (userId: string) => {
  const { loading, error, data } = useQuery(GET_ORDERS);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!data) return;

    const orders: Order[] = data.getOrders.map(({ value }: OrderResponse) => ({
      carrier: value.carrier,
      createdAt: value.createdAt,
      shippingCost: value.shippingCost,
      trackingId: value.trackingId,
      trackingItem: value.trackingItem,
      Address: value.Address,
      City: value.City,
      Lat: value.Lat,
      Lng: value.Lng,
    }));

    const customerOrders = orders.filter(
      (order) => order.trackingItem.customer_id === userId
    );

    setOrders(customerOrders);
  }, [data, userId]);
  return { loading, error, orders };
};

export default UseCustomerOrders;
