import { Form } from 'antd';
import React from 'react';
import InputComponent from './InputComponent';

type RulesType = {
  required: boolean;
  message?: any;
};

type AppInputFormItemProps = {
  type?: string;
  className?: string;
  label?: string;
  name?: string | string[];
  placeholder?: string;
  rules?: Array<RulesType>;
  disabled?: boolean;
  onChange?: (e: any) => void;
  onClick?: (e: any) => void;
  [x: string]: any;
};

const AppInputFormItem: React.FC<AppInputFormItemProps> = ({
  type,
  className,
  label,
  name,
  rules,
  placeholder,
  onChange,
  onClick,
  disabled,
  ...params
}) => {
  const { cols, rows, ...rest } = params;
  return (
    <Form.Item name={name} label={label} rules={rules} className={className} {...rest}>
      <InputComponent
        type={type as string}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        onClick={onClick}
        rows={rows ?? null}
        cols={cols ?? null}
      />
    </Form.Item>
  );
};

export default AppInputFormItem;
