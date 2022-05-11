import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from 'antd'
import {
  SearchOutlined,
  CommentOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import './index.css'

export default function Header() {
  const [userName, setUserName] = useState('代码摆烂仔')
  const [isOverFlow, setIsOverFlow] = useState(true)
  return (
    <ul className='header'>
      <div>
        <h3>
          后台通用管理系统模板
        </h3>
      </div>
      <li><SearchOutlined /></li>
      <li><CommentOutlined /></li>
      <li className={isOverFlow? 'hide': 'show'}
        onMouseEnter={()=>setIsOverFlow(false)}
        onMouseLeave={()=> setIsOverFlow(true)}
      >
        <Avatar size={30} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
        <span style={{marginLeft:3}}>{userName}</span>
        <ul>
          <li>
            <Link to='/table/base'>
              &nbsp;&nbsp;&nbsp;
              <UserOutlined/>
              &nbsp;&nbsp;&nbsp;
              信息中心
            </Link>
          </li>
          <li>
            <Link to='/table/news'>
              &nbsp;&nbsp;&nbsp;
              <SettingOutlined/>
              &nbsp;&nbsp;&nbsp;
              修改设置
            </Link>
          </li>
          <li>
            <Link to='/login' >
              &nbsp;&nbsp;&nbsp;
              <LogoutOutlined/>
              &nbsp;&nbsp;&nbsp;
              退出登录
            </Link>
          </li>
        </ul>
      </li>
      <li>Profile</li>
    </ul>
  )
}
