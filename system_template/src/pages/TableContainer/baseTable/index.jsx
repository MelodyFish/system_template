import React, { useState, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { Table, Tag, Space, Popconfirm, Input, Select, Button, message, Modal, Form } from 'antd';
import Tools from './TableTool'
import {  options } from '../../../mock/table'
import './index.css'

const { Option } = Select;
let selectedRow
let temporaryStore = {}
let temporaryId = ''
let tableData1 = [
  {
    id: 'Token001',
    name: '《三体》',
    borrower: '王一',
    tel: 15265817091,
    date: '2021-08-28',
    tags: ['科幻', '哲学', '社会学'],
  },
  {
    id: 'Token002',
    name: '《明朝那些事儿》',
    borrower: '张三',
    tel: 18463616871,
    date: '2021-11-11',
    tags: ['历史'],
  },
  {
    id: 'Token003',
    name: '《资本论》',
    borrower: '唐青',
    tel: 18412340513,
    date: '2021-12-30',
    tags: ['经济学', '经济体系'],
  },
  {
    id: 'Token004',
    name: '《龙族》',
    borrower: '江南',
    tel: 18412340513,
    date: '2021-02-28',
    tags: ['玄幻'],
  },
  {
    id: 'Token005',
    name: '《数据结构与算法》',
    borrower: '小码农',
    tel: 18412340513,
    date: '2021-04-16',
    tags: ['工学', '计算机'],
  },
  {
    id: 'Token006',
    name: '《我不是药神》',
    borrower: '欧一',
    tel: 18412340513,
    date: '2021-08-29',
    tags: ['社会学'],
  },
]
export default function Home() {
  const formRef = useRef()
  const columns =  [
    {
      
      title: '书籍ID',
      dataIndex: 'id',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {
     
      title: '名称',
      dataIndex: 'name',
      align: 'center',
      render: text => <span>{text}</span>,
    },
    {
    
      title: '借阅者',
      dataIndex: 'borrower',
      align: 'center',
      render: text => <a>{text}</a>,
    },
    {

      title: '联系方式',
      dataIndex: 'tel',
      align: 'center',
      render: text => <span>{text}</span>,
    },
    {
  
      title: '借阅时间',
      dataIndex: 'date',
      align: 'center',
      render: text => <span>{text}</span>,
      sorter: (a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      },
    },
    {
 
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
              case '计算机':
                color = '#409eff'
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
          <a onClick={()=> handleRowChange(record, 'edit')}>编辑</a>
          <Popconfirm title="确认删除？此操作不可逆！" onConfirm={() => handleDelete(record.id)}>
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]
  // const [searchValue, setSearchValue] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [tableData, setTableData] = useState(tableData1)
  const [curModalStatus, setcurModalStatus] = useState('')

  const search = (e,searchValue) => {
    // 输入完回车时
    if(e.which === 13)
    setTableData(tableData.filter(item => item.name.indexOf(searchValue)!==-1))
    // 若输入值为空则返回原数据
    if(!searchValue) {
      setTableData(tableData1)
    }
  }
  const handleSelect = (selectedValue) => {
    if (!selectedValue) {
      setTableData(tableData1)
    } else {
      setSelectedType(selectedValue)
      setTableData(tableData.filter(item => item.tags.includes(selectedValue)))
    }
  }
  const reset = () => {
    // setSearchValue('')
    setSelectedType('')
    setTableData(tableData1)
    message.success({
      content: '重置成功',
      style: {
        fontSize: '16px'
      }
    })
  }

  const handleRowChange = (record, status) => {
    // 根据不同按钮来设置弹出框为模式
    console.log(record);
    if(status === 'edit') {
      setcurModalStatus('edit')
      selectedRow = record
      temporaryStore.id = selectedRow.id
      temporaryStore.name = selectedRow.name
      temporaryStore.borrower = selectedRow.borrower
      temporaryStore.tel = selectedRow.tel
      temporaryStore.date = selectedRow.date
      temporaryStore.tags = selectedRow.tags
    } else if(status === 'add'){
      // 清除弹窗框中原先的数据
      selectedRow = null
      setcurModalStatus('add')
    } else {
      console.log('status状态为其他');
    }
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    // selectedRow = {}
    setIsModalVisible(false)
  }
  const handleOk = () => {
    formRef.current.validateFields()
    .then(() => {
      if(curModalStatus === 'edit') {
        tableData.map( row => {
          if(row.id === selectedRow.id) {
            row.name = temporaryStore.name
            row.borrower = temporaryStore.borrower
            row.tel = temporaryStore.tel
            row.date = temporaryStore.date
            row.tags = temporaryStore.tags
          }
        })
        setTableData(tableData)
      } else {
        tableData1 = [...tableData, {
          id: temporaryId,
          name : temporaryStore.name,
          borrower : temporaryStore.borrower,
          tel : temporaryStore.tel,
          date : temporaryStore.date,
          tags : temporaryStore.tags,
        }]
        setTableData(tableData1)
      }
      // temporaryStore = {}
      message.info('修改成功')
      setIsModalVisible(false)
    })
    .catch((error) => {message.error('校验未通过，请检查！'); console.log(error)})
  }
  
  const handleDelete = (id) => {
    // 删除时候不仅要让tableData删除这一行，同时也要让原数据删除这一行
    // 因为重置的时候是重置的输入框的内容和下拉框的选项。
    // 而输入框的内容和下拉框的选项有对应着tableData的数据
    tableData1 = tableData1.filter(v => v.id!==id)
    setTableData(tableData.filter(v => v.id!==id))
  }
  const getId = (b) => {
    temporaryId = b[0].value
  }
  return (
    <div className='table-container'>
      <Tools search={search} handleSelect={handleSelect} reset={reset} handleRowChange={handleRowChange} />
      <Table columns={columns} dataSource={tableData} rowKey={rowKey=>rowKey.id} bordered />
      <Modal title='操作' cancelText='取消' okText='确认' 
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form
          ref={formRef}
          name="basic"
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            id: selectedRow ? selectedRow.id : 'Token' + Math.floor(Math.random()* 1000000),
            name: selectedRow ? selectedRow.name : '',
            borrower: selectedRow ? selectedRow.borrower : '',
            tel: selectedRow ? selectedRow.tel : '',
            date: selectedRow ? selectedRow.date : '',
            tags: selectedRow ? selectedRow.tags : [],
          }}
          autoComplete="off"
          onFieldsChange={(a,b)=>getId(b)}
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
            rules={[
              {
                required: true,
                message: "请输入书籍名！"
              }
            ]}
          >
            <Input onChange={e => {temporaryStore.name = e.target.value;}} />
          </Form.Item>
          <Form.Item
            label="借阅者："
            name="borrower"
            rules={[
              {
                required: true,
                message: "请输入借阅人！"
              }
            ]}
          >
            <Input onChange={e => temporaryStore.borrower = e.target.value} />
          </Form.Item>
          <Form.Item
            label="联系方式"
            name="tel"
            rules={[
              {required: true, message: '请输入手机号！'},
              // {type: 'string', min: 11, max: 11, message: '请输入正确的手机号！'}
              {pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0-9])\d{8}$/, message: '手机号格式不正确！'}
            ]}
          >
            <Input onChange={e => temporaryStore.tel = e.target.value} />
          </Form.Item>
          <Form.Item
            label="借阅日期"
            name="date"
            rules={[
              {required: true, message: '请输入借阅日期！'},
              {pattern: /^20\d{2}-[0,1]\d-[0-3]\d/, message: '请输入正确的借阅日期！'}
            ]}
          >
            <Input onChange={e => temporaryStore.date = e.target.value} />
            {/* <DatePicker style={{width: '100%'}} onChange={(date, dateString) => console.log(dateString)} /> */}
          </Form.Item>
          <Form.Item
            label="标签"
            name="tags"
            rules={[
              {required: true, message: '请选择书籍标签'},
            ]}
          >
            <Select mode="multiple" style={{width: '100%'}} placeholder="请添加标签" onChange={(tag) => temporaryStore.tags = tag}>
              {options.map(type => {
                return (
                  <Option value={type.value} key={type.id} >
                    {type.value}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
