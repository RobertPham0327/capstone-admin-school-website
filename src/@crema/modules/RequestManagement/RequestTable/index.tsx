import React from "react";
import RequestActions from "./RequestActions";
import { StyledOrderId, StyledOrderTable } from "../index.styled";
import type { ColumnsType } from "antd/es/table";
import type { RecentOrdersType } from "@crema/types/models/ecommerce/EcommerceApp";
import type { Request } from "@crema/types/models/apps/Request";

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case "pending": {
      return "#E2A72E";
    }
    case "approved": {
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
    title: "Type",
    dataIndex: "request_type",
    key: "request_type"
  },
  {
    title: "Student ID",
    dataIndex: "student_id",
    key: "student_id",
  },
  {
    title: "Date",
    dataIndex: "created_at",
    key: "created_at",
    render: (created_at: Date) => (
      <span>
        {new Date(created_at).toLocaleString()}
      </span>
    )
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
        {status.toUpperCase()}
      </span>
    ),
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    className: "order-table-action",
    fixed: "right",
    render: (_, request) => <RequestActions request={request} />,
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
