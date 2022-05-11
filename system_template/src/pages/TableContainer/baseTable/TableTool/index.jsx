import React, { useState } from 'react'
import { Space, Input, Select, Button } from 'antd';
import {  options } from '../../../../mock/table'

const { Option } = Select;
export default function Tool(props) {
  console.log(props);
  const {search, handleSelect, reset, handleRowChange} = props
  const [searchValue, setSearchValue] = useState('')
  const handleReset = () => {
    setSearchValue('')
    reset()
  }
  return (
    <div className='table-toolbar'>
      <Space className='toolbar-input'>
        <span >书籍:  </span>
        <Input style={{width: 220}} 
          placeholder="请输入要搜索的书"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value) }
          onKeyUp={(e)=>search(e, searchValue)} />
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
        <Button style={{marginRight:40}} onClick={handleReset}>重置</Button>
        <Button type='primary' onClick={()=> handleRowChange(null,'add')}>新建</Button>
      </Space>
    </div>
  )
}
