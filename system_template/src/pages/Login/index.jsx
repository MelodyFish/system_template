import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd';
import './index.css'
export default function Login() {
  const navgate = useNavigate('')
  const onFinish = (userInfo) => {
    const { account, password } = userInfo
    console.log('Success:', userInfo);
    if (account === 'admin' && password === '123') {
      if (!sessionStorage.getItem('token')) {
        sessionStorage.setItem('token', 'Token' + Math.floor(Math.random()*10000000000000000))
      }
      navgate('/')
      message.info('登录成功')
    } else {
      message.error('账号或密码错误，请检查！')
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className='login-container'>
      <Form
        style={{
          width: '400px',
          height: '400px',
          border: '1px solid #409eff',
          borderRadius: '6px',
        }}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 12, offset: 1 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <h2 style={{height:'110px', lineHeight: '110px', textAlign: 'center', fontSize: '32px'}}>Welcome</h2>
        <Form.Item
          label="账号："
          name="account"
          rules={[{ required: true, message: '请输入账号！' }]}
        >
          <Input  />
        </Form.Item>

        <Form.Item
          label="密码："
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 9, span: 14 }} style={{marginTop:'30px'}}>
          <Button type="primary" htmlType='submit' style={{width: '90px', height: '40px', borderRadius: '6px'}}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
