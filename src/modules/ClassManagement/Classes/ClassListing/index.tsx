import AppsHeader from '@crema/components/AppsContainer/AppsHeader';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { FilterItem, ListingTable } from '@crema/modules/class';
import AppRowContainer from '@crema/components/AppRowContainer';
import AppCard from '@crema/components/AppCard';
import { Col } from 'antd';
import {
  StyledInputSearch,
  StyledOrderFooterPagination,
  StyledOrderHeader,
  StyledOrderHeaderInputView,
  StyledOrderHeaderPagination,
} from '../index.styled';
import { StyledTitle5 } from '../index.styled';
import { useAppSelector, useAppDispatch } from '../../../../toolkit/hooks';
import { onGetEcommerceData } from '../../../../toolkit/actions';

const ProductListing = () => {
  const { messages } = useIntl();
  const dispatch = useAppDispatch();
  const [filterData, setFilterData] = useState({
    title: '',
    inStock: [true, false],
    mrp: { start: 0, end: 30000 },
  });

  const [page, setPage] = useState(0);
  const ecommerceList = useAppSelector(({ ecommerce }) => ecommerce.ecommerceList);
  const { list = [], total = 0 } = ecommerceList;

  const onChange = (page: number) => {
    setPage(page);
  };
  const loading = useAppSelector(({ common }) => common.loading);

  useEffect(() => {
    dispatch(onGetEcommerceData({ filterData, page }));
  }, [dispatch, filterData, page]);

  const searchClass = (title: string) => {
    setFilterData({ ...filterData, title });
  };

  return (
    <>
      <StyledTitle5>{messages['sidebar.classManagementAdmin.classListing'] as string}</StyledTitle5>
      <AppRowContainer>
        <Col xs={24} lg={24}>
          <FilterItem filterData={filterData} setFilterData={setFilterData} />
        </Col>
        <Col xs={24} lg={24}>
          <AppCard
            title={
              <AppsHeader>
                <StyledOrderHeader>
                  <StyledOrderHeaderInputView>
                    <StyledInputSearch
                      id="user-name"
                      placeholder="Search..."
                      type="search"
                      enterButton
                      onChange={event => searchClass(event.target.value)}
                    />
                  </StyledOrderHeaderInputView>
                  <StyledOrderHeaderPagination pageSize={10} count={total} page={page} onChange={onChange} />
                </StyledOrderHeader>
              </AppsHeader>
            }
          >
            <ListingTable productData={list || []} loading={loading} />
            <StyledOrderFooterPagination pageSize={10} count={total} page={page} onChange={onChange} />
          </AppCard>
        </Col>
      </AppRowContainer>
    </>
  );
};

export default ProductListing;
