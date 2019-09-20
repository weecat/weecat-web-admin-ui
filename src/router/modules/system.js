import Layout from '@/views/layout/Layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: '/admin/list',
  name: 'System',
  meta: {
    title: '系统管理',
    icon: 'fa fa-gears',
    roles: ['admin', 'system']
  },
  children: [
    {
      path: 'admin/list',
      component: () => import('@/views/system/admin/List'),
      name: 'Admin',
      meta: { title: '系统管理员', icon: 'fa fa-gavel' }
    },
    {
      path: 'admin/add',
      component: () => import('@/views/system/admin/Add'),
      name: 'AdminAdd',
      hidden: true,
      meta: { title: '创建管理员', icon: 'fa fa-suitcase' }
    },
    {
      path: 'admin/edit/:id(\\d+)',
      component: () => import('@/views/system/admin/Edit'),
      name: 'AdminEdit',
      hidden: true,
      meta: { title: '修改管理员', icon: 'fa fa-suitcase' }
    },
    {
      path: 'admin/details/:id(\\d+)',
      component: () => import('@/views/system/admin/Details'),
      name: 'AdminDetails',
      hidden: true,
      meta: { title: '管理员详细信息', icon: 'fa fa-suitcase' }
    },
    {
      path: 'role/list',
      component: () => import('@/views/system/role/List'),
      name: 'Role',
      meta: { title: '系统角色', icon: 'fa fa-puzzle-piece' }
    },
    {
      path: 'role/add',
      component: () => import('@/views/system/role/Add'),
      name: 'RoleAdd',
      hidden: true,
      meta: { title: '创建角色', icon: 'fa fa-suitcase' }
    },
    {
      path: 'role/edit/:id(\\d+)',
      component: () => import('@/views/system/role/Edit'),
      name: 'RoleEdit',
      hidden: true,
      meta: { title: '角色详细信息', icon: 'fa fa-suitcase' }
    },
    {
      path: 'role/authority',
      component: () => import('@/views/system/role/Authority'),
      name: 'Authority',
      meta: { title: '权限管理', icon: 'fa fa-lock' }
    },
    {
      path: 'smsHistory',
      component: () => import('@/views/system/sms/SmsHistory'),
      name: 'SmsHistory',
      meta: { title: '短信历史记录', icon: 'fa fa-list-alt' }
    },
    {
      path: 'search',
      component: () => import('@/views/system/search/Index'),
      name: 'searchIndex',
      meta: { title: '搜索服务', icon: 'fa fa-search' }
    }
  ]
}
export default systemRouter
