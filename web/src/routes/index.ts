export type RouteParam = string | number

export type RouteValue = (id?: RouteParam) => string

export type Routes = {
  home: string;
  share: RouteValue;
  category: RouteValue;
  tags: RouteValue;
  works: RouteValue;
  links: RouteValue;
  notes: RouteValue;
  about: string;
  editor: string;
  login: string;
  signup: string;
}

const routes: Routes = {
  home: '/',
  share: (id?: RouteParam) => id ? `/share/${id}` : '/share',
  category: (id?: RouteParam) => id ? `/category/${id}` : '/category',
  tags: (id?: RouteParam) => id ? `/tags/${id}` : '/tags',
  works: (id?: RouteParam) => id ? `/works/${id}` : '/works',
  links: (id?: RouteParam) => id ? `/links/${id}` : '/links',
  notes: (id?: RouteParam) => id ? `/notes/${id}` : '/notes',
  editor: '/editor',
  about: '/about',
  login: '/login',
  signup: '/signup'
}

export default routes
