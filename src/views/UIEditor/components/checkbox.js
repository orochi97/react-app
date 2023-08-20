import { Checkbox } from 'antd';
import { genBasicCompData } from '@/views/UIEditor/utils';

const porperty = [
  { type: 'options', key: 'options', defaultValue: [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ]},
];

// 用以存于系统数据的内容
const data = genBasicCompData({
  type: 'checkbox',
  label: 'Checkbox',
  render: Checkbox.Group,
}, porperty);

const checkbox = {
  data,
  porperty,
};

export default checkbox;
