import React from "react";
import OrderActions from "./RequestActions";
import { StyledOrderId, StyledOrderTable } from "../index.styled";
import type { ColumnsType } from "antd/es/table";
import type { RecentOrdersType } from "@crema/types/models/ecommerce/EcommerceApp";

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case "Pending": {
      return "#E2A72E";
    }
    case "Approved": {
      return "#43C888";
    }
    default: {
      return "#F84E4E";
    }
  }
};
const columns: ColumnsType<Request> = [
  {
    title: "Request ID",
    dataIndex: "id",
    key: "id",
    render: (id) => <StyledOrderId>{id}</StyledOrderId>,
  },
  {
    title: "Parent ID",
    dataIndex: "parent_id",
    key: "parent_id",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <span
        className="badge"
        style={{
          color: getPaymentStatusColor(status),
          backgroundColor: getPaymentStatusColor(status) + "44",
        }}
      >
        {status}
      </span>
    ),
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    className: "order-table-action",
    fixed: "right",
    render: () => <OrderActions />,
  },
];

type Props = {
  orderData: Request[];
  loading: boolean;
};
const RequestTable = ({ orderData, loading }: Props) => {
  return (
    <StyledOrderTable
      hoverColor
      data={orderData}
      loading={loading}
      columns={columns}
      scroll={{ x: "auto" }}
    />
  );
};

export default RequestTable;

RequestTable.defaultProps = {
  orderData: [],
};
