import routes from "@/src/routes";
import type { RouteParam } from "@/src/routes";

export interface MenuItem {
  id: number;
  label: string,
  menus?: MenuItem[]
}

export interface NavigationItem {
  id: string,
  label: string,
  route: string | ((id?: RouteParam) => string),
  menus?: MenuItem[]
}

export type NavigationList = NavigationItem[]

export const NAVIGATION_LIST: NavigationList = [
  {
    id: 'share',
    label: '分享',
    route: routes.share,
    menus: [
      {
        id: 1,
        label: '前端',
        menus: [
          { id: 1, label: 'React' },
        ]
      },
      {
        id: 2,
        label: '后端',
        menus: [
          { id: 1, label: 'Go' },
        ]
      }
    ]
  },
  {
    id: 'files',
    label: '归档',
    route: routes.category,
    menus: [
      {
        id: 1,
        label: '前端',
        menus: [
          { id: 1, label: 'React' },
        ]
      },
    ]
  },
  {
    id: 'notes',
    label: '笔记',
    route: routes.notes
  },
  {
    id: 'tags',
    label: '标签',
    route: routes.tags,
    menus: [
      {
        id: 1,
        label: '前端',
        menus: [
          { id: 1, label: 'React' },
          { id: 2, label: 'Vue' },
          { id: 4, label: 'JS' }
        ]
      },
      {
        id: 2,
        label: '后端',
        menus: [
          { id: 1, label: 'Go' },
          { id: 2, label: 'Java' }
        ]
      }
    ]
  },
  {
    id: 'links',
    label: '友链',
    route: routes.links
  },
]
