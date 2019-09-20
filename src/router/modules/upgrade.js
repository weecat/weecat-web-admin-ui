/**
 * 升级管理
 */
import Layout from '@/views/layout/Layout'

const upgradeRouter = {
  path: '/upgrade',
  component: Layout,
  redirect: '/upgrade/list',
  alwaysShow: true,
  name: 'Upgrade',
  meta: {
    title: '升级管理',
    icon: 'icon icon-wrench',
    roles: ['admin', 'upgrade']
  },
  children: [
    {
      path: 'apps',
      component: () => import('@/views/upgrade/Apps'),
      name: 'Apps',
      meta: { title: 'APP升级管理', icon: 'icon icon-settings' }
    },
    {
      path: 'app/details/:id(\\d+)',
      component: () => import('@/views/upgrade/AppDetails'),
      name: 'AppDetails',
      hidden: true,
      meta: { title: 'APP版本信息', icon: 'icon icon-settings' }
    }
  ]
}
export default upgradeRouter
