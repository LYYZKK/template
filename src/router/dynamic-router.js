import Layout from '../views/layout/Layout'

export default () => {
  const baseRouter = []
  if (sessionStorage.getItem('getMenu') && JSON.parse(sessionStorage.getItem('getMenu')).data) {
    const data = JSON.parse(sessionStorage.getItem('getMenu')).data
    for (let i = 0; i < data.length; i++) {
      const children = []
      baseRouter[i] = {}
      baseRouter[i].path = '/workbench' + i
      baseRouter[i].component = Layout
      baseRouter[i].name = 'workbench' + i
      baseRouter[i].redirect = baseRouter[i].path + '/' + data[i].sub_menus[0].template
      baseRouter[i].meta = {
        title: data[i].parent_menu_name, icon: 'example'
      }
      for (let j = 0; j < data[i].sub_menus.length; j++) {
        children[j] = {}
        children[j].path = data[i].sub_menus[j].template
        children[j].name = data[i].sub_menus[j].template
        children[j].meta = {
          title: data[i].sub_menus[j].title,
          icon: 'user'
        }
        children[j].component = () => import('@/views/' + data[i].sub_menus[j].template.substring(0, data[i].sub_menus[j].template.length - 5) + '/index')
      }
      baseRouter[i].children = children
      if (baseRouter[i].children.length === 1) {
        baseRouter[i].alwaysShow = true
      }
    }
  }
  return baseRouter
}