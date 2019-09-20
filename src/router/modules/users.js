/**
 * 用户管理
 */
import Layout from '@/views/layout/Layout'

const usersRouter = {
  path: '/users',
  component: Layout,
  redirect: '/users/list',
  alwaysShow: true,
  name: 'Users',
  meta: {
    title: '用户管理',
    icon: 'fa fa-user',
    roles: ['admin', 'users']
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/users/List'),
      name: 'UserList',
      meta: {
        title: '用户列表',
        icon: 'fa fa-list',
        roles: ['admin', 'user_list']
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/users/Edit'),
      name: 'UserEdit',
      hidden: true,
      meta: { title: '编辑用户信息' }
    },
    {
      path: 'details/:id(\\d+)',
      component: () => import('@/views/users/Details'),
      name: 'UserDetails',
      hidden: true,
      meta: { title: '用户详情' }
    },
    {
      path: 'valid/list',
      component: () => import('@/views/users/valid/List'),
      name: 'UserValidList',
      meta: {
        title: '实名认证列表',
        icon: 'fa fa-camera-retro',
        roles: ['admin', 'user_valid']
      }
    },
    {
      path: 'valid/approve/:id(\\d+)',
      component: () => import('@/views/users/valid/Approve'),
      name: 'UserValidApprove',
      hidden: true,
      meta: { title: '用户实名认证' }
    }
  ]
}
export default usersRouter
