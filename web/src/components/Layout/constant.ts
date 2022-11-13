import routes from "@/src/routes";
import type { RouteParam } from "@/src/routes";

export interface NavigationItem {
  id: string,
  label: string,
  route: string | ((id?: RouteParam) => string),
  menus?: any[]
}

export type NavigationList = NavigationItem[]

export const NAVIGATION_LIST: NavigationList = [
  {
    id: 'home',
    label: '首页',
    route: routes.home
  },
  {
    id: 'share',
    label: '分享',
    route: routes.share,
    menus: [1, 2, 3]
  },
  {
    id: 'files',
    label: '归档',
    route: routes.files,
    menus: [1, 2, 3, 4, 5, 6]
  },
  {
    id: 'tags',
    label: '标签',
    route: routes.tags,
    menus: [1, 2, 3, 4, 5, 6, 7, 8]
  },
  {
    id: 'works',
    label: '作品',
    route: routes.works,
    menus: [1]
  },
  {
    id: 'links',
    label: '友链',
    route: routes.links
  },
  {
    id: 'about',
    label: '关于',
    route: routes.about
  }
]
