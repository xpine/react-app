import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { Input, Comment, List, Avatar } from 'antd';
import service from '../../service';
import { useGlobalState } from '../../store';
export default function Chat() {
  let socket = useRef();
  const [messages, setMessages] = useState([]);
  const [{ user }] = useGlobalState();
  useEffect(() => {
    socket.current = io(service.request.defaults.baseURL);
    socket.current.on('connect', function () {
      console.log('链接成功');
    });
    socket.current.on('event', (data) => {
      console.log('收到消息', data, messages, socket.current.id);
      setMessages([...messages, data]);
    });
    return () => {
      socket.current.close();
    };
  }, [messages]);
  const sendMessage = (message) => {
    socket.current &&
      socket.current.emit('event', {
        message,
        id: user.id,
        username: user.username,
      });
  };
  return (
    <div>
      <List
        style={{ height: 500, border: '1px solid #333' }}
        header={'replies'}
        className='comment-list'
        itemLayout='horizontal'
        dataSource={messages}
        renderItem={(item) => (
          <li>
            <Comment
              author={item.username}
              avatar={<Avatar size={40}>{item.username}</Avatar>}
              content={item.message}
            />
          </li>
        )}></List>
      <Input.Search enterButton='发送' onSearch={(value) => sendMessage(value)} />
    </div>
  );
}
