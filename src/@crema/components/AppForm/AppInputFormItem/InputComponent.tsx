import { Input, InputNumber } from 'antd';

type TypeProps = {
  type: string;
  [x: string]: any;
};

const InputComponent = ({ type, ...params }: TypeProps) => {
  switch (type) {
    case 'number':
      return <InputNumber style={{ width: '100%' }} {...params} />;
    case 'password':
      return <Input.Password {...params} />;
    case 'textarea':
      return <Input.TextArea {...params} />;
    default:
      return <Input {...params} />;
  }
};
export default InputComponent;
