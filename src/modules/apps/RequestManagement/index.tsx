import React, { useEffect, useState } from "react";
import AppsContainer from "@crema/components/AppsContainer";
import { useIntl } from "react-intl";
import AppsHeader from "@crema/components/AppsContainer/AppsHeader";
import AppsContent from "@crema/components/AppsContainer/AppsContent";
import AppInfoView from "@crema/components/AppInfoView";
import { Input } from "antd";
import Link from "next/link";
import AppPageMeta from "@crema/components/AppPageMeta";
import {
  StyledOrderFooterPagination,
  StyledOrderHeader,
  StyledOrderHeaderInputView,
  StyledOrderHeaderPagination,
  StyledOrderHeaderRight,
  StyledLinkBtn
} from "./index.styled";
import { useAppSelector, useAppDispatch } from "../../../toolkit/hooks";
import { getRecentOrders } from "../../../toolkit/actions";
import { RequestTable } from "@crema/modules/RequestManagement/index";

const RequestManagement = () => {
  const { messages } = useIntl();
  const [page, setPage] = useState<number>(1);
  const [search, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();
  const recentOrders = useAppSelector(
    ({ ecommerce }) => ecommerce.recentOrders
  );
  const orderCount = useAppSelector(({ ecommerce }) => ecommerce.orderCount);
  const loading = useAppSelector(({ common }) => common.loading);

  const onChange = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    dispatch(getRecentOrders(search, page));
  }, [dispatch, search, page]);

  const onSearchOrder = (e: any) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  return (
    <>
      <AppPageMeta title="Request Management" />
      <AppsContainer
        title={messages["requestManagement.loaRequest"] as string}
        type="bottom"
        fullView
      >
        <AppsHeader>
          <StyledOrderHeader>
            <StyledOrderHeaderInputView>
              <Input
                id="user-name"
                placeholder="Search"
                type="search"
                onChange={onSearchOrder}
              />
            </StyledOrderHeaderInputView>
            <StyledOrderHeaderRight>
              <StyledLinkBtn type="primary">
                <Link href="/ecommerce/products">Request Modal</Link>
              </StyledLinkBtn>

              <StyledOrderHeaderPagination
                pageSize={10}
                count={orderCount}
                page={page}
                onChange={onChange}
              />
            </StyledOrderHeaderRight>
          </StyledOrderHeader>
        </AppsHeader>

        <AppsContent
          style={{
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <RequestTable loading={loading} orderData={recentOrders || []} />
        </AppsContent>

        <StyledOrderFooterPagination
          pageSize={10}
          count={orderCount}
          page={page}
          onChange={onChange}
        />
      </AppsContainer>
      <AppInfoView />
    </>
  );
};

export default RequestManagement;
