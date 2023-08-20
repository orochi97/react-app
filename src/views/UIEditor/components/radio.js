import { Radio } from 'antd';
import { genBasicCompData } from '@/views/UIEditor/utils';

const porperty = [
  { type: 'options', key: 'options', defaultValue: [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ]},
];

const data = genBasicCompData({
  type: 'radio',
  label: 'Radio',
  render: Radio.Group,
}, porperty);

const radio = {
  data,
  porperty,
};

export default radio;
