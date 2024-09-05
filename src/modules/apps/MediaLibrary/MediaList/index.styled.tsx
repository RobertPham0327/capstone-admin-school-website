import styled from "styled-components";

export const StyledUploadWrapper = styled.div`
  cursor: pointer;
  border: 2px dashed ${({ theme }) => theme.palette.dividerColor};
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.palette.text.secondary};
  background-color: ${({ theme }) => theme.palette.background.default};
`;


export const StyledFormWrapper = styled.div`
  .ant-select,
  .ant-input-number,
  .ant-input-number-group-wrapper {
    width: 100%;
  }

  .notification {
    margin-left: 10px;
  }

  .ant-card,
  .mb-20,
  .ant-select {
    margin-bottom: 20px;
  }

  .mr-10 {
    margin-right: 10px;
  }
`;
