import { UIEDITOR_COMP_KEY, setLocalStorage, getLocalStorage } from '@/views/UIEditor/utils';

export function apiGetImageList() {
  return Promise.resolve([
    { src: 'https://file.cchealthier.com/file/blog/202210/2022_10_01.jpg', name: '' },
    { src: 'https://file.cchealthier.com/file/blog/202210/2022_10_02.jpg', name: '' },
    { src: 'https://file.cchealthier.com/file/blog/202210/2022_10_03.jpg', name: '' },
    { src: 'https://file.cchealthier.com/file/blog/202210/2022_10_04.jpg', name: '' },
    { src: 'https://file.cchealthier.com/file/blog/202210/2022_10_05.jpg', name: '' },
    { src: 'https://file.cchealthier.com/file/blog/autumn/beijing1.jpg', name: '' },
    { src: 'https://file.cchealthier.com/file/blog/autumn/beijing2.jpg', name: '' },
    { src: 'https://file.cchealthier.com/file/blog/autumn/beijing3.jpg', name: '' },
  ]);
}

export function apiGetSystemData() {
  const components = getLocalStorage(UIEDITOR_COMP_KEY) ?? [];
  return Promise.resolve(components);
}

export function apiSaveSystemData(components) {
  setLocalStorage(UIEDITOR_COMP_KEY, components);
  return Promise.resolve({ code: 0, msg: '' });
}

export function apiDeleteImage() {
  return Promise.resolve({ code: 0, msg: '' });
}
