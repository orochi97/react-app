// keyCode -> action
const KEY_CODE_MAP = {
  CTRL: 100,
  SHIFT: 200,
};
const commandMap = {};

export default function commandRegister(data) {
  const commands = Array.isArray(data) ? data : [data];

  commands.forEach(({ command, action }) => {
    const arr = command.split('+'); // 'ctrl+z' => ['ctrl', 'z']
    let keyCode = 0;
    if (arr.includes('ctrl')) keyCode += KEY_CODE_MAP.CTRL;
    if (arr.includes('shift')) keyCode += KEY_CODE_MAP.SHIFT;
    keyCode += arr[arr.length - 1].charCodeAt();
    commandMap[keyCode] = action;
  });

  document.addEventListener('keydown', (ev) => {
    const { ctrlKey, shiftKey, key } = ev;
    let keyCode = 0;
    if (ctrlKey) keyCode += KEY_CODE_MAP.CTRL;
    if (shiftKey) keyCode += KEY_CODE_MAP.SHIFT;
    keyCode += key.toLocaleLowerCase().charCodeAt();
    commandMap[keyCode] && commandMap[keyCode]();
  });
}
