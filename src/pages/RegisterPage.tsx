import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),

  age: yup
    .number()
    .typeError("Age must be a number")
    .min(1, "Age must be at least 1")
    .max(100, "Age must be below 100")
    .required("Age is required"),

  phone: yup
    .string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number")
    .required("Phone number is required"),

  address: yup
    .string()
    .required("Address is required"),

  // profile: yup
  // .mixed<File>()
  // .required("Profile image is required")
  // .test(
  //   "fileType",
  //   "Only image files are allowed",
  //   (value) => {
  //     if (!value) return false;
  //     return (
  //       value instanceof File &&
  //       ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
  //     );
  //   }
  // )
  profile: yup
  .mixed()
  .required("Profile image is required")
  .test("fileType", "Only image files are allowed", (value) => {
    const file =
      value instanceof File
        ? value
        : value instanceof FileList
        ? value[0]
        : null;

    return !!file && file.type.startsWith("image/");
  })

})


type Form = { email: string; password: string; confirmPassword: string, age: number, phone: string, address: string,
  profile: File 
}


export default function RegisterPage() {
  const { register: registerUser } = useAuth() as any
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: yupResolver(schema) })


  const onSubmit = async (vals: Form) => {
    
    console.log("errors.profile")
    const ok = await registerUser(vals.email, vals.confirmPassword, vals.age, vals.phone, vals.address,vals.profile)
    
    if (ok) navigate('/login')
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-amber-100 px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">Create Account</h2>
            <p className="text-sm text-gray-600 mt-2">Join our HR management system</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                {...register('password')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                placeholder="Create a password"
              />
              {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                {...register('confirmPassword')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword.message}</p>}
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Age</label>
              <input
                type="number"
                {...register('age')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                placeholder='Entet Your Age'
              />
              {errors.age && <p className="text-sm text-red-600 mt-1">{errors.age.message}</p>}
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Phone</label>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                {...register("phone")}
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                  const input = e.currentTarget;
                  input.value = input.value.replace(/\D/g, "").slice(0, 10);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                placeholder="Enter Your Phone Number"
              />
              {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Address</label>
              <textarea
                {...register('address')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-fuchsia-500 
               focus:border-transparent resize-none"
              />
              {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address.message}</p>}
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Upload Profile Picture</label>
              <input
                type="file"
                accept='image/*'
                {...register("profile", {
                  setValueAs: (files) => files?.[0]
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
              />
              
              {errors.profile && <p className="text-sm text-red-600 mt-1">{errors.profile.message}</p> || <p></p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 disabled:opacity-50 transition-colors font-medium"
            >
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-fuchsia-600 hover:text-fuchsia-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
// import React, { useState } from "react";

// const RegisterTest: React.FC = () => {
//   const [result, setResult] = useState<string>("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const form = e.target as HTMLFormElement;
//     const formData = new FormData(form);
//     for (let [key, value] of formData.entries()) {
//   console.log(key, value);
// }

//     try {
//       const response = await fetch(
//         "http://localhost:5064/api/Auth/register",
//         {
//           method: "POST",
//           body: formData
//         }
//       );

//       const text = await response.text();
//       setResult(text);
//     } catch (error) {
//       console.error(error);
//       setResult("Request failed");
//     }
//   };

//   return (
//     <div>
//       <h2>Register API Test</h2>

//       <form onSubmit={handleSubmit}>
//         <input name="Username" placeholder="Username" /><br /><br />

//         <input name="Email" type="email" placeholder="Email" /><br /><br />

//         <input name="Password" type="password" placeholder="Password" /><br /><br />

//         <input name="PasswordText" placeholder="PasswordText" /><br /><br />

//         <input name="Age" type="number" placeholder="Age" /><br /><br />

//         <input name="Phone" placeholder="Phone" /><br /><br />

//         <input name="Address" placeholder="Address" /><br /><br />

//         <input name="ProfileImage" type="file" /><br /><br />

//         <button type="submit">Register</button>
//       </form>

//       <pre>{result}</pre>
//     </div>
//   );
// };

// export default RegisterTest;


