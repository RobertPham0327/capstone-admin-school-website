import React from 'react';
import { Checkbox } from 'antd';
import { useRouter } from 'next/router';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useAuthMethod } from '@crema/hooks/AuthHooks';
import {
  SignInButton,
  StyledRememberMe,
  StyledSign,
  StyledSignContent,
  StyledSignForm,
  StyledSignLink,
} from './index.styled';
import AppInputFormItem from '@crema/components/AppForm/AppInputFormItem'; // Update the import statement
import { CheckboxChangeEvent } from 'antd/es/checkbox';

const SignInJwtAuth = () => {
    const router = useRouter();
    // const navigate = useNavigate();
    const { signInUser } = useAuthMethod();

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

  const onGoToForgetPassword = () => {
    router.push('forget-password');
    // navigate('/forget-password', { tab: 'jwtAuth' });
  };

  function onRememberMe(e: CheckboxChangeEvent) {
    console.log(`checked = ${e.target.checked}`);
  }

  const inputFieldArray = [
    {
      name: 'email',
      placeholder: 'Email',
      className: 'form-field',
      rules: [
        {
          required: true,
          message: 'Trường email không được bỏ trống',
        },
      ],
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Mật khẩu',
      className: 'form-field',
      rules: [
        {
          required: true,
          message: 'Trường mật khẩu không được bỏ trống',
        },
      ],
    },
  ];
  return (
    <StyledSign>
      <StyledSignContent>
        <StyledSignForm
          name="basic"
          initialValues={{
            remember: true,
            email: 'huy@example.com',
            password: 'password',
          }}
          onFinish={signInUser as ((values: unknown) => void) | undefined}
          onFinishFailed={onFinishFailed}
        >
          {inputFieldArray.map(field => (
            <AppInputFormItem key={field.name} {...field} />
          ))}

          <StyledRememberMe>
            <Checkbox onChange={onRememberMe}>
              <IntlMessages id="common.rememberMe" />
            </Checkbox>

            <StyledSignLink onClick={onGoToForgetPassword}>
              <IntlMessages id="common.forgetPassword" />
            </StyledSignLink>
          </StyledRememberMe>

          <div className="form-btn-field">
            <SignInButton type="primary" htmlType="submit">
              <IntlMessages id="common.login" />
            </SignInButton>
          </div>
        </StyledSignForm>
      </StyledSignContent>
    </StyledSign>
  );
};

export default SignInJwtAuth;
