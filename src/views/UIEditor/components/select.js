import { Select } from 'antd';
import { genBasicCompData } from '@/views/UIEditor/utils';

const porperty = [
  { type: 'options', key: 'options', defaultValue: [
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'Yiminghe', label: 'yiminghe' },
  ]},
];

const data = genBasicCompData({
  type: 'select',
  label: 'Select',
  render: Select,
}, porperty);

const select = {
  data,
  porperty,
};

export default select;
