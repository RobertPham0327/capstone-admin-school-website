import React from "react";
import OrderActions from "./OrderAction";
import { Typography } from "antd";
import { StyledListingStatus, StyledOrderTable } from "../index.styled";
import { ellipsisLines } from "@crema/helpers/StringHelper";
import { NextRouter, useRouter } from "next/router";
import { ProductDataType } from "@crema/types/models/ecommerce/EcommerceApp";
import type { ColumnsType } from "antd/es/table";

const getPaymentStatusColor = (inStock: boolean) => {
  switch (inStock) {
    case true: {
      return "#43C888";
    }
    case false: {
      return "#F84E4E";
    }
  }
};

const getColumns = (router: NextRouter): ColumnsType<ProductDataType> => [
  {
    title: "No.",
    dataIndex: "id",
    width: 50,
    align: "center",
    key: "id",
    render: (id, record) => (
      <Typography.Link
        onClick={() => router.push(`/ecommerce/product_detail/${id}`)}
        style={{ display: "flex", alignItems: "center" }}
      >
        {ellipsisLines(record.title)}
      </Typography.Link>
    ),
  },
  {
    title: "Class Name",
    dataIndex: "name",
    align: "center",
    key: "name",
  },
  {
    title: "Teacher",
    dataIndex: "teacher_id",
    align: "center",
    key: "teacherId",
  },
  {
    title: "Student",
    dataIndex: "student_id",
    align: "center",
    key: "studentId",
  },
  {
    title: "School",
    dataIndex: "school_id",
    align: "center",
    key: "schoolId"
  },
  {
    title: "Status",
    dataIndex: "date",
    key: "date",
    align: "center",
    render: (data, record) => (
      <StyledListingStatus
        style={{
          color: getPaymentStatusColor(record?.inStock),
          backgroundColor: getPaymentStatusColor(record?.inStock) + "44",
        }}
      >
        {record?.inStock ? "In Stock" : "Out of Stock"}
      </StyledListingStatus>
    ),
  },
  {
    title: "Created Date",
    dataIndex: "created_at",
    align: "center",
    key: "createdAt",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    className: "order-table-action",
    fixed: "right",
    render: (text, record) => <OrderActions id={record.id} />,
  },
];

type Props = {
  productData: ProductDataType[];
  loading: boolean;
};

const ProductTable = ({ productData, loading }: Props) => {
  const router = useRouter();

  return (
    <StyledOrderTable
      hoverColor
      data={productData}
      loading={loading}
      columns={getColumns(router)}
      scroll={{ x: "auto" }}
    />
  );
};

export default ProductTable;
