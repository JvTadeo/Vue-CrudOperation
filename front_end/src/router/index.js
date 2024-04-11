import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import Dashboard from '../views/DashboardView.vue'
import PageNotFound from '../views/PageNotFound.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dashboard/:userID',
    name: 'dashboard',
    component: Dashboard,     
    meta: { requiresAuth: true },
    props: true,     
  },  
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    component: PageNotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


router.beforeEach(async (to, from, next) => {
    
  //Checks if the current route requires authentication and if the user is authenticated.
  //If the route does not require authentication, it allows the navigation to proceed.
  if (!to.meta.requiresAuth) {
    next();
    return;
  }

  const isAuthenticated = localStorage.getItem("token");
  
  //If the route requires authentication and the user is not authenticated, it redirects the user to the login page.  
  if(isAuthenticated){
    try {
      const res = await fetch('http://localhost:8800/verifyToken', {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${isAuthenticated}`
        },
      });
      
      const data = await res.json();

      if (res.ok) {
        const userID = to.params.userID;

        const currentUserId = data.userID;          

        if(userID == currentUserId){
          next();
        }else{
          next({ name: 'login' });
        }

      } else {
        next({ name: 'login' });
      }
    } catch (err) {
      console.error(`Error verifying token: ${err}`);
      next({ name: 'login'});
    }
  }else{
    next({ name: 'login'});
  }    
});


export default router
