import button from './button';
import checkbox from './checkbox';
import radio from './radio';
import select from './select';
import image from './image';

// 记录每个组件的每个可编辑属性，相应的编辑形式及编辑值
const porperties = {};
// 记录每个组件的基础数据，包括类型（type）、名字（label）、属性（porperty）、渲染组件（render）、位置（position）等
const components = {};

[
  button,
  checkbox,
  radio,
  select,
  image,
].forEach((item) => {
  porperties[item.data.type] = item.porperty;
  components[item.data.type] = item.data;
});

export {
  porperties,
  components,
};
