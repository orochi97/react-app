import { Button } from 'antd';
import { genBasicCompData } from '@/views/UIEditor/utils';

// 用以真实渲染到界面上
function RealButton (props) {
  return <Button {...props}>{props.label}</Button>;
}

// 用以属性编辑框的数据
const porperty = [
  { type: 'select', key: 'size', defaultValue: 'small', options: [
    { value: 'small', label: 'small' },
    { value: 'middle', label: 'middle' },
    { value: 'large', label: 'large' },
  ]},
  { type: 'select', key: 'type', defaultValue: 'default', options: [
    { value: 'default', label: 'default' },
    { value: 'dashed', label: 'dashed' },
    { value: 'link', label: 'link' },
    { value: 'text', label: 'text' },
    { value: 'primary', label: 'primary' },
  ]},
  { type: 'text', key: 'label', defaultValue: 'Button' },
];

// 用以存于系统数据的内容
const data = genBasicCompData({
  type: 'button',
  label: 'Button',
  render: RealButton,
}, porperty);

const button = {
  data,
  porperty,
};

export default button;
