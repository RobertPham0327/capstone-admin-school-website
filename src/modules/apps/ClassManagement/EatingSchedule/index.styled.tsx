import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Calendar } from 'react-big-calendar';
import styled from "styled-components";

export const StyledPlusOutlined = styled(PlusOutlined)`
  color: ${({ theme }) => theme.palette.primary.primary};
  font-size: 16px;
`;

export const StyledMinusOutlined = styled(MinusOutlined)`
  color: ${({ theme }) => theme.palette.primary.primary};
  font-size: 16px;
`;

export const StyledTitle = styled.h2`
  color: ${({ theme }) => theme.palette.text.primary};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  margin-bottom: 0;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xs}px) {
    margin-bottom: 8px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
    margin-bottom: 16px;
  }
`;



