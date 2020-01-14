import ThemeLayout from '@/components/Layout/ThemeLayout.vue'
import home from '@/components/Pages/home.vue'
// import shop from '@/components/Pages/shop.vue'

const routes = [
  {
    path: '/',
    redirect: '/pages/home'
  },
  {
    path: '/pages',
    component: ThemeLayout,
    redirect: '/pages/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: home
      } /* ,
      {
        path: 'shop',
        name: 'Shop',
        component: shop
      } */
    ]
  }
]

export default routes
