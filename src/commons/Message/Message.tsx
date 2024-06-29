import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Msg from './Msg';
import { MessageApi, List } from './config';
import './index.css';

let add: (L: List) => void;
export const MessageContainer = () => {
  const [lists, setList] = useState<List[]>([]);

  const remove = (L: List) => {
    const { key } = L;
    setList((pre: List[]) => pre.filter((each: List) => key !== each.key));
  };

  add = (option: List) => {
    setList((pre: List[]) => {
      const obj = [...pre, option];
      setTimeout(() => {
        remove(option);
      }, 3000);
      return obj;
    });
  };

  useEffect(() => {
    if (lists.length > 10) {
      lists.shift();
    }
  }, [lists]);

  return (
    <>
      {lists.map(({ text, key, type }) => (
        <Msg key={key} type={type} text={text} />
      ))}
    </>
  );
};

// 获取唯一id
const getId = () => {
  return (Math.random() * 1000).toFixed();
};

// 暴露的message-API
const $message: MessageApi = {
  info: (text) => {
    add({
      text,
      key: getId(),
      type: 'info',
    });
  },
  success: (text) => {
    add({
      text,
      key: getId(),
      type: 'success',
    });
  },
  warning: (text) => {
    add({
      text,
      key: getId(),
      type: 'warning',
    });
  },
  error: (text) => {
    add({
      text,
      key: getId(),
      type: 'error',
    });
  },
};

export default $message;

// 挂载容器到页面
const createMessage = () => {
  let el = document.getElementById('message-wrap');
  if (!el) {
    el = document.createElement('div');
    el.className = 'message-wrap';
    el.id = 'message-wrap';
    document.body.append(el);
  }

  // 创建 React 根容器
  const root = createRoot(el);
  root.render(<MessageContainer />);
};

createMessage();
