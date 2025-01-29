import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  //create login method
  try{
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();
    console.log(data);

    if(!response.ok){
      throw new Error('Login failed');
    }

    return data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      error.message = 'Login failed';
    }
  }
}




export { login };
