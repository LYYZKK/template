import _ from 'lodash'
import S from 'string'
import Layout from '../views/layout'

const getRouterForMenu = (menu, parentMenuId) => {
  const clonedMenu = _.cloneDeep(menu)

  clonedMenu.level = clonedMenu.idPath ? S(clonedMenu.idPath).count('/') - 1 : 1
  clonedMenu.path = clonedMenu.value ? (clonedMenu.level > 1 ? `${clonedMenu.value}` : `/${clonedMenu.value}`) : ''
  clonedMenu.component = parentMenuId ? (clonedMenu.value ? () => import('@/views/' + clonedMenu.value + '/index') : () => import('@/views/empty/index')) : Layout
  clonedMenu.hidden = clonedMenu.status === '0' ? true : (!clonedMenu.value && (!clonedMenu.children || !clonedMenu.children.length))
  clonedMenu.meta = {
    title: clonedMenu.name,
    icon: clonedMenu.icon
  }
  clonedMenu.alwaysShow = clonedMenu.value ? true : !!(clonedMenu.children && clonedMenu.children.length)
  if (clonedMenu.level === 1 && clonedMenu.value) {
    clonedMenu.redirect = `${clonedMenu.value}/index`
    clonedMenu.children = [{
      path: 'index',
      name: clonedMenu.name,
      level: 2,
      meta: { title: clonedMenu.name },
      component: clonedMenu.value ? () => import('@/views/' + clonedMenu.value + '/index') : null
    }]
  }

  return clonedMenu
}

const fillRecursiveRoutersFromMenus = (menus, parentMenuId) => {
  _.forEach(menus, (menu, idx) => {
    menus[idx] = getRouterForMenu(menu, parentMenuId)

    if (menu.children && menu.children.length) {
      fillRecursiveRoutersFromMenus(menu.children, menu.parentId)
    }
  })
}

export default (menuData) => {
  let menuRawData = []
  if (menuData && menuData.data && menuData.data.length) {
    menuRawData = menuData.data
  } else {
    const sessionMenuData = JSON.parse(sessionStorage.getItem('getMenu')) || {}
    menuRawData = sessionMenuData.data || []
  }

  fillRecursiveRoutersFromMenus(menuRawData, 0)

  return menuRawData
}
