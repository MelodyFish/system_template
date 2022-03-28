import Home from '../pages/TableContainer'
import News from '../pages/TableContainer/News'
import Status from '../pages/ListContainer'
import Rank from '../pages/DetailContainer'
import Profile from '../pages/SettingContainer'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
export const routes =  [
  
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/table',
    key: '1',
    title: '表格组件',
    icon: <MailOutlined />,
    children:[
      {
        key: '/table/base',
        path: '/table/base',
        title: '基础表格',
        element: <Home />,
      },
      {
        key: '/table/news',
        path: '/table/news',
        title: '重大新闻',
        element: <News />,
      }
    ]
  },
  {
    path: '/form',
    key: '2',
    title: '表单组件',
    icon: <AppstoreOutlined />,   
    children:[
      {
        key: '/form/status',
        path: '/form/status',
        title: '标准表单',
        element: <Status />
      }
    ]
  },
  {
    path: '/detail',
    key: '3',
    title: '详情页',
    icon: <AppstoreOutlined />,
   
    children:[
      {
        key: '/detail/rank',
        path: '/detail/rank',
        title: '基础详情',
        element: <Rank />,
      }
    ]
  },
  {
    path: '/setting',
    key: '4',
    title: '个人设置',
    icon: <SettingOutlined />,
    children:[
    {
      key: '/setting/profile',
      path: '/setting/profile',
      title: '个人中心',
      element: <Profile />,
    }
  ]
  },
]