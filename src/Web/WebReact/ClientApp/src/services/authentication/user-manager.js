import { createUserManager } from 'redux-oidc'

const userManagerConfig = {
  authority: 'http://localhost:5105/Account/login',
  client_id: 'js',
  redirect_uri: 'http://localhost:5010/#/app/main/dashboard',
  post_logout_redirect_uri: 'http://localhost:5010/#/login',
  response_type: 'token id_token',
  scope: 'openid profile orders basket webshoppingagg orders.signalrhub',
  loadUserInfo: true, 
  monitorSession: false,
}

const userManager = createUserManager(userManagerConfig)

export default userManager