import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Table, Tag, Space, Popconfirm, Input, Select, Button, message, Modal, Form } from 'antd';
import {  tableData1, options } from '../../mock/table'
import './index.css'

const { Option } = Select;
export default function Home() {
  const columns =  [
    {
      key: 'id1',
      title: '书籍ID',
      dataIndex: 'id',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
      key: 'name',
      title: '名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      key: 'borrower',
      title: '借阅者',
      dataIndex: 'borrower',
      align: 'center',
    },
    {
      key: 'tel',
      title: '联系方式',
      dataIndex: 'tel',
      align: 'center',
    },
    {
      key: 'date',
      title: '借阅时间',
      dataIndex: 'date',
      align: 'center',
      sorter: (a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      },
    },
    {
      key: 'tags',
      title: '标签',
      dataIndex: 'tags',
      align: 'center', 
      render: tags => (
        <>
          {tags.map(tag => {
            let color = ''
            switch (tag) {
              case '历史':
                color = '#ffa940'
                break;
              case '科幻':
                color = '#91d5ff'
                break;
              case '经济学':
                color = '#f5222d'
                break;
              case '哲学':
                color = '#b37feb'
                break;
              case '玄幻':
                color = '#36cfc9'
                break;
              case '工学':
                color = '#ff7a45'
                break;
              default: 
                color = '#b7eb8f'
                break;
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      key: 'action',
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={()=> handleEdit(record)}>编辑</a>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]
  const [searchValue, setSearchValue] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [tableData, setTableData] = useState(tableData1)

  const search = (e) => {
    if(e.which === 13)
    setTableData(tableData.filter(item => item.name.indexOf(searchValue)!==-1))
    if(!searchValue) {
      setTableData(tableData1)
    }
  }
  const handleSelect = (selectedValue) => {
    if (!selectedValue) {
      setTableData(tableData1)
    } else {
      setSelectedType(selectedType)
      setTableData(tableData.filter(item => item.tags.includes(selectedValue)))
    }
  }
  const reset = () => {
    setSearchValue('')
    setSelectedType('')
    setTableData(tableData1)
    message.success({
      content: '重置成功',
      style: {
        fontSize: '16px'
      }
    })
  }
  const handleDelete = (id) => {
    setTableData(tableData.filter(v => v.id!==id))
  }
  const handleEdit = (record) => {
    console.log(record)
    setIsModalVisible(true)
  }
  const handleOk = () => {

  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <div className='table-container'>
      <div className='table-toolbar'>
        <Space className='toolbar-input'>
          <span >书籍:  </span>
          <Input style={{width: 220}} 
            placeholder="请输入要搜索的书"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value) }
            onKeyUp={(e)=>search(e)} />
        </Space>
        <Space>
          <span>类型：</span>
          <Select style={{width: 120}} allowClear placeholder="请选择" onChange={(value) => handleSelect(value)}>
            {options.map(type => {
              return (
                <Option value={type.value} key={type.id} >
                  {type.value}
                </Option>
              )
            })}
          </Select>
        </Space>
        <Space className='toolbar-operate'>
          <Button style={{marginRight:40}} onClick={reset}>重置</Button>
          <Button type='primary'>新建</Button>
        </Space>
      </div>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="basic"
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            id: 'Token' + parseInt(Math.random() * 1000 + 10)
          }}
          autoComplete="off"
        >
          <Form.Item
            label="书籍ID:"
            name="id"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="名称："
            name="name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="借阅者："
            name="borrower"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="联系方式"
            name="tel"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="借阅时间"
            name="date"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="标签"
            name="tags"
          >
            <Input />
          </Form.Item>

        </Form>
      </Modal>
      <Table columns={columns} dataSource={tableData} rowKey={rowKey=>rowKey.id} bordered />
    </div>
  )
}
