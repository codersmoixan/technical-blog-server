export interface NavigationListItem {
  id: number,
  label: string,
  url?: string
}

export type NavigationList = NavigationListItem[]

export const NAVIGATION_LIST: NavigationList = [
  {
    id: 1,
    label: '首页',
    url: '/'
  },
  {
    id: 2,
    label: '归档',
  },
  {
    id: 3,
    label: '标签'
  },
  {
    id: 4,
    label: '作品',
  },
  {
    id: 5,
    label: '友链'
  },
  {
    id: 6,
    label: '关于'
  }
]
