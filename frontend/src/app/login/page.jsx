"use client"
import ButtonLoader from '@/components/ButtonLoader';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Login = () => {
    const router = useRouter();
    const [loading,setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if(!formData.email || !formData.password) {
        return
    }
    setLoading(true);

    try {
      const response = await fetch('https://assignmentbackend-19zx.onrender.com/api/auth/login', {

        method: 'POST',
        credentials : 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('login failed');
      }

      const data = await response.json();

      toast.success('Login Successfull')
      Cookies.set('tokenCookie', data.token, {
        expires: 1/24,
        path: '/',
        secure: true,
        sameSite: 'none',
        httpOnly: true
        
      });
      router.push('/');

      setFormData({ email: '', password: '' });
    } catch (err) {
      console.error('Signup error:', err);
      toast.error('email / password is incorrect')
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Log In
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-300">
          <form className="space-y-6" onSubmit={handleSubmit}>


            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder='uydl.utkarsh@gmail.com'
                  required
                  className=" text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm  sm:text-sm"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder='*******'
                  className=" text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm  sm:text-sm"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
              onClick={handleSubmit}
                type="submit"
                disabled = {loading}
                className="w-full font-bold flex  justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm  text-white bg-black disabled:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                log in
                {
                    loading  && <ButtonLoader/>

                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;