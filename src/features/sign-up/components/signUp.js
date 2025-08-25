'use client'
import React, { useState } from 'react';
import login from '../../../../public/login.jpg';
import Image from 'next/image';
import logo from '../../../../public/logo.png';
import googleicn from "../../../../public/googleicn.png";
import { EyeClosed, Eye } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../schema/schema';

import { signUpUser } from '../api/auth.service';



import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function SignUp() {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            username: '',
            email: '',
            password: ''
        }
    })
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(prev => !prev);
    }


    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8000/auth/google'
    }


    const onSubmit = async (userData) => {
        try {
            const response = await signUpUser(userData)

            if (response?.status === 201 || response?.ok) {
                router.push('/')
            } else {
                console.error('Signup failed:', response)
            }
        } catch (error) {
            console.error('Error during signup:', error)
        }
    }


    return (
        <div className='w-full h-screen bg-white'>
            <section className='w-full flex justify-center items-center flex-col md:flex md:flex-row'>
                <div className='w-full h-screen'>
                    <Image src={login} alt='login page' className='w-full h-full object-cover' />
                </div>
                <div className='w-full flex items-center h-full bg-white justify-center'>
                    <div className='flex flex-col items-center'>
                        <div className='flex flex-col items-center justify-center gap-4'>
                            <Image src={logo} alt='logo.png' width={100} height={100} />
                            <h1 className='text-[#111] text-[28px] font-semibold'>Create an account</h1>
                            <Button onClick={handleGoogleLogin} className="text-[#111] bg-transparent border-[1px] border-[#52A2F5] hover:bg-[#52A2F5] hover:text-white cursor-pointer hover:border-[#52A2F5] py-6 text-[15px] px-24">Create account with google
                                <Image src={googleicn} alt='googneicn.png' width={20} height={20} />
                            </Button>
                            <div className="flex items-center justify-center space-x-4">
                                <div className="flex-1 w-[250px] h-[1px] bg-gray-400"></div>
                                <p className="text-gray-600 text-sm">OR</p>
                                <div className="flex-1 h-px bg-gray-400"></div>
                            </div>
                            <div className='w-full'>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div>
                                        <Label htmlFor="username" className="text-gray-400 pb-3">Username</Label>
                                        <Input
                                            id="username"
                                            {...register('username')}
                                            type="text"
                                            placeholder="Enter username"
                                            className="py-5 w-full focus-visible:border-[#52A2F5] !border-[52A2F5] !border-[2px] text-gray-600 placeholder:text-gray-600"

                                        />
                                        {errors.username && (
                                            <p className='text-red-500 font-semibold'>{errors.password.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="email" className="text-gray-400 pb-3">Email</Label>
                                        <Input
                                            id="email"
                                            {...register('email')}
                                            type="email"
                                            className="py-5 w-full focus-visible:border-[#52A2F5] !border-[52A2F5] !border-[2px] text-gray-600 placeholder:text-gray-600"
                                            placeholder="Enter email"
                                        />
                                        {errors.email && (
                                            <p className='text-red-500 font-semibold'>{errors.email.message}</p>
                                        )}
                                    </div>
                                    <div className='relative'>
                                        <Label htmlFor="password" className="text-gray-400 pb-3">Password</Label>
                                        <Input
                                            id="password"
                                            {...register('password')}
                                            type={showPassword === false ? "password" : "text"}
                                            className="py-5 w-full focus-visible:border-[#52A2F5] !border-[52A2F5] !border-[2px] relative text-gray-600 placeholder:text-gray-600"
                                            placeholder="Enter password"

                                        />

                                        {showPassword === false ? (
                                            <EyeClosed color='#4a5565' size={20} className='absolute top-[37px] right-[15px] cursor-pointer' onClick={() => handleShowPassword()} />
                                        ) : (
                                            <Eye color='#4a5565' size={20} className='absolute top-[37px] right-[15px] cursor-pointer' onClick={() => handleShowPassword()} />
                                        )}

                                        {errors.password && (
                                            <p className='text-red-500 font-semibold'>{errors.password.message}</p>
                                        )}

                                    </div>
                                    <p className='text-sm text-gray-500'>Already have account? <Link href={'/login'} className='text-blue-700'>Login</Link></p>
                                    <Button type="submit" disabled={isSubmitting} className="w-full mt-6 cursor-pointer py-6 bg-gradient-to-r from-[#489CEB] from-10% via-[#797FD4] via-30% to-[#CB7282] to-90% rounded-full text-white">
                                        {isSubmitting ? 'Signing up...' : 'Sign up'}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}

export default SignUp