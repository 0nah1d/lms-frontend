import { zodResolver } from '@hookform/resolvers/zod'
import Lottie from 'lottie-react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import lottieRegister from '../../../public/registration.json'
import { registrationSchema } from '../../schema/auth.js'
import { api } from '../../utils/api.js'
import { objectToArray } from '../../utils/index.js'
import { toast } from 'react-toastify'

const Registration = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registrationSchema),
    })

    const onSubmit = async (data) => {
        try {
            const res = await api.post('/auth/register', data)

            toast.success(res?.data?.message)
            reset()
            navigate('/login')
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
        <div className="hero bg-base-200 min-h-screen mb-5">
            <div className="hero-content flex-col lg:flex-row gap-10">
                <div className="text-center lg:text-left w-[300px] md:w-[600px]">
                    <Lottie animationData={lottieRegister} />
                </div>

                <div className="card w-full max-w-sm">
                    <h1 className="text-5xl font-bold mb-4">Register now!</h1>
                    <div className="bg-base-100 shadow-2xl">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="card-body"
                        >
                            <label className="label">Name</label>
                            <input
                                type="text"
                                {...register('username')}
                                className="input input-bordered"
                                placeholder="Username"
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm">
                                    {errors.username.message}
                                </p>
                            )}

                            <label className="label">Email</label>
                            <input
                                type="email"
                                {...register('email')}
                                className="input input-bordered"
                                placeholder="Email"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">
                                    {errors.email.message}
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

                            <label className="label">Password</label>
                            <input
                                type="password"
                                {...register('confirm_password')}
                                className="input input-bordered"
                                placeholder="Confirm Password"
                            />
                            {errors.confirm_password && (
                                <p className="text-red-500 text-sm">
                                    {errors.confirm_password.message}
                                </p>
                            )}

                            <button
                                className="btn btn-success text-white mt-4"
                                type="submit"
                            >
                                Register
                            </button>
                        </form>
                    </div>

                    <p className="mt-2">
                        Already have an account?{' '}
                        <Link
                            to={'/login'}
                            className="font-bold underline text-blue-600"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Registration
