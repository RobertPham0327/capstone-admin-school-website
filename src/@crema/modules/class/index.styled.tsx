import styled from 'styled-components';
import AppTableContainer from '@crema/components/AppTableContainer';

export const StyledFormWrapper = styled.div`
  .ant-select,
  .ant-input-number {
    width: 100%;
  }

  .notification {
    margin-left: 10px;
  }
`;

export const StyledListingStatus = styled.div`
  padding: 3px 5px;
  border-radius: 4px;
  text-align: center;
`;

export const StyledOrderTable = styled(AppTableContainer)`
  & .ant-table table {
    table-layout: auto !important;
  }

  & .ant-table-thead > tr > th {
    font-size: 13px;
    padding: 8px;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    background-color: transparent;

    &:first-child {
      padding-left: 20px;

      [dir='rtl'] & {
        padding-left: 0;
        padding-right: 20px;
      }
    }

    &:last-child {
      padding-right: 20px;

      [dir='rtl'] & {
        padding-right: 0;
        padding-left: 20px;
      }
    }

    &.order-table-action {
      text-align: center;
      background-color: ${({ theme }) =>
        theme.palette.background.paper} !important;
    }
  }

  & .ant-table-tbody > tr > td {
    font-size: 13px;
    padding: 12px 8px;

    &:first-child {
      padding-left: 20px;

      [dir='rtl'] & {
        padding-left: 0;
        padding-right: 20px;
      }
    }

    &:last-child {
      padding-right: 20px;

      [dir='rtl'] & {
        padding-right: 0;
        padding-left: 20px;
      }
    }

    &.order-table-action {
      text-align: center;
      background-color: ${({ theme }) =>
        theme.palette.background.paper} !important;
    }
  }
  & .badge {
    padding: 3px 10px;
    border-radius: ${({ theme }) => theme.cardRadius};
    display: inline-block;
  }
`;

