export type RouteParam = string | number

const routes = {
  home: '/',
  share: (id?: RouteParam) => id ? `/share/${id}` : '/share',
  files: (id?: RouteParam) => id ? `/files/${id}` : '/files',
  tags: (id?: RouteParam) => id ? `/tags/${id}` : '/tags',
  works: (id?: RouteParam) => id ? `/works/${id}` : '/works',
  links: (id?: RouteParam) => id ? `/links/${id}` : '/links',
  about: '/about'
}

export default routes
