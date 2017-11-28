const components = ['/picker']

export default [
  ...components.map(path => ({
    path,
    component: () => import(`@/pages${path}`)
  })),
  {
    path: '*',
    redirect: `${components[0]}`
  }
]
