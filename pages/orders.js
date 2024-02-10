/** @format */

import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("api/orders").then((response) => {
      setOrders(response.data);
    });
  }, []);
  return (
    <Layout>
      <h1 className="text-3xl text-blue-900 font-bold text-center">Orders</h1>
      <table className="basic mt-4">
        <thead>
          <tr>
            <th>Date</th>
            <th>Paid</th>
            <th>Reciepents</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order) => (
              <tr key={order._id}>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td className={order.paid ? "text-green-600" : "text-red-600"}>
                  {order.paid ? "YES" : "NO"}
                </td>
                <td className="text-sm ">
                  {order.name} <br /> {order.phoneNo} <br />
                  {order.email}
                  <br />
                  {order.street} <br /> {order.pCode}
                  {order.city} <br /> {order.conuntry}
                  <br />
                </td>
                <td>
                  {order.line_items.map((l) => (
                    <>
                      {l.price_data?.product_data.name} x{l.quantity}
                      <br />
                    </>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
