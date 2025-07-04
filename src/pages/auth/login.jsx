import { zodResolver } from '@hookform/resolvers/zod'
import Lottie from 'lottie-react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import lottieLogin from '../../../public/login.json'
import { loginSchema } from '../../schema/auth.js'
import { api } from '../../utils/api.js'
import { objectToArray } from '../../utils/index.js'
import { useToken } from '../../context/tokenContext.jsx'

export default function Login() {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    })

    const { setToken } = useToken()

    const handleLogin = async (data) => {
        try {
            const res = await api.post('/auth/login', data)
            toast.success(res?.data?.message)
            if (res?.data?.user) {
                setToken(res?.data?.user)
            }
            reset()
            navigate('/')
        } catch (error) {
            if (error.response.data) {
                const formattedData = objectToArray(error.response.data)
                formattedData.forEach((el) => {
                    setError(el.name, {
                        type: 'custom',
                        message: el.message,
                    })
                })
            }
        }
    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen mb-5">
                <div className="hero-content flex-col lg:flex-row gap-10">
                    <div className="text-center lg:text-left">
                        <Lottie animationData={lottieLogin}></Lottie>
                    </div>
                    <div className="card w-full max-w-sm ">
                        <h1 className="text-5xl font-bold mb-4">Login now!</h1>
                        <div className="bg-base-100 shrink-0 shadow-2xl">
                            <form
                                onSubmit={handleSubmit(handleLogin)}
                                className="card-body"
                            >
                                <label className="label">
                                    Username or Email
                                </label>
                                <input
                                    type="text"
                                    {...register('username_or_email')}
                                    className="input input-bordered"
                                    placeholder="Email"
                                />
                                {errors.username_or_email && (
                                    <p className="text-red-500 text-sm">
                                        {errors.username_or_email.message}
                                    </p>
                                )}

                                <label className="label">Password</label>
                                <input
                                    type="password"
                                    {...register('password')}
                                    className="input input-bordered"
                                    placeholder="Password"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm">
                                        {errors.password.message}
                                    </p>
                                )}

                                <button
                                    className="btn btn-success text-white mt-4"
                                    type="submit"
                                >
                                    Login
                                </button>
                            </form>
                        </div>
                        <p className="mt-2">
                            Have no account? Please{' '}
                            <Link
                                to={'/register'}
                                className="font-bold underline text-blue-600"
                            >
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
