export type RouteParam = string | number

export type RouteValue = (id?: RouteParam) => string

export type Routes = {
  home: string;
  share: RouteValue;
  files: RouteValue;
  tags: RouteValue;
  works: RouteValue;
  links: RouteValue;
  about: string;
  editor: string
}

const routes: Routes = {
  home: '/',
  share: (id?: RouteParam) => id ? `/share/${id}` : '/share',
  files: (id?: RouteParam) => id ? `/files/${id}` : '/files',
  tags: (id?: RouteParam) => id ? `/tags/${id}` : '/tags',
  works: (id?: RouteParam) => id ? `/works/${id}` : '/works',
  links: (id?: RouteParam) => id ? `/links/${id}` : '/links',
  editor: '/editor',
  about: '/about'
}

export default routes
