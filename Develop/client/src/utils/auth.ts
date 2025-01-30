import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    //  return the decoded token
    return jwtDecode<JwtPayload>(this.getToken());
  }

  loggedIn() {
    //  return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
    
  }
  
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if(decoded?.exp && decoded?.exp < Date.now() / 1000 )  {
        return true;
      }
    } catch (err) {
      return false;
    }
  }

  getToken(): string {
    //  return the token
    const loggedIn = localStorage.getItem('id_token') || '';
    return loggedIn;
  }

  login(idToken: string) {
    //  set the token to localStorage
    //  redirect to the home page
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    //  remove the token from localStorage
    //  redirect to the login page
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
