import { Avatar, Descriptions } from 'antd';
import styled from 'styled-components';


export const StyledTitle = styled.span`
  color: ${({ theme }) => theme.palette.text.primary};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: 20px;
`;


export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

export const StyledAvatar = styled(Avatar)`
  width: 100px;
  height: 100px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xxl}px) {
    width: 110px;
    height: 110px;
  }
`;

export const StyledStudentInfor = styled.div`
  margin-left: 14px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xxl}px) {
    margin-left: 16px;
  }

  [dir='rtl'] & {
    margin-left: 0;
    margin-right: 14px;

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.xxl}px) {
      margin-right: 16px;
    }
  }

  & h3 {
    font-size: ${({ theme }) => theme.font.size.xl};
    margin-bottom: 5px;
    font-weight: ${({ theme }) => theme.font.weight.medium};
    line-height: 1;
  }

  & p {
    margin-bottom: 0;
    color: ${({ theme }) => theme.palette.text.secondary};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    font-size: ${({ theme }) => theme.font.size.base};
  }
`;


