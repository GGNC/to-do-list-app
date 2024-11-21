import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { UserInterface } from "../api/types";

const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 characters" })
    .max(20, { message: "The password can contain up to 20 characters" })
    .refine((password) => !/\s/.test(password), {
      message: "Password must not contain spaces",
    })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must contain at least 1 uppercase character",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "Password must contain at least 1 lowercase character",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password must contain at least 1 number",
    })
    .refine((password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), {
      message: "Password must contain at least 1 special character",
    }),
});
type FormFields = z.infer<typeof schema>;

function SignUpForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/users?email=${data.email}`
      );
      if (response.data.length) throw new Error();
      const result = await axios.post("http://localhost:5000/users", {
        ...data,
      });
      const user: UserInterface = result.data;
      queryClient.setQueryData(["user"], {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      });
      navigate("/taskpad");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      setError("email", {
        message: "This email is already taken.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-w-96 m-8 p-6 px-8 pb-4 flex flex-col flex-nowrap justify-start items-center gap-1 bg-white border-2 rounded-3xl"
    >
      <div className="w-full flex flex-wrap justify-between items-center">
        <div className="w-5/12 m-0 p-0 flex flex-col justify-center items-center">
          <div className="w-full m-0 p-0 flex flex-col justify-start items-baseline">
            <h2>First Name</h2>
            {errors.firstName && (
              <span className="text-red-600 text-[8px]">
                {errors.firstName.message}
              </span>
            )}
          </div>
          <input
            {...register("firstName")}
            type="text"
            placeholder="John"
            className="w-full px-3 py-2 font-semibold border-b-2"
          />
        </div>
        <div className="w-5/12 m-0 p-0 flex flex-col justify-center items-center">
          <div className="w-full m-0 p-0 flex flex-col justify-start items-baseline">
            <h2>Last Name</h2>
            {errors.lastName && (
              <span className="text-red-600 text-[8px]">
                {errors.lastName.message}
              </span>
            )}
          </div>
          <input
            {...register("lastName")}
            type="text"
            placeholder="Gillman"
            className="w-full px-3 py-2 font-semibold border-b-2"
          />
        </div>
      </div>
      <div className="w-full m-0 p-0 flex flex-col justify-center items-center">
        <div className="w-full m-0 p-0 flex justify-start items-baseline gap-2">
          <h2>Email</h2>
          {errors.email && (
            <span className="text-red-600 text-[8px]">
              {errors.email.message}
            </span>
          )}
        </div>
        <input
          {...register("email")}
          type="text"
          placeholder="example@example.com"
          className="w-full px-6 py-2 font-semibold border-b-2"
        />
      </div>
      <div className="w-full m-0 p-0 flex flex-col justify-center items-center">
        <div className="w-full m-0 p-0 flex justify-start items-baseline gap-2">
          <h2>Password</h2>
          {errors.password && (
            <span className="text-red-600 text-[8px]">
              {errors.password.message}
            </span>
          )}
        </div>
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full px-6 py-2 font-semibold border-b-2"
        />
      </div>
      {errors.root && <div className="text-red-600">{errors.root.message}</div>}
      <Button
        type="submit"
        primary
        rounded
        loading={isSubmitting}
        className="m-2 font-extrabold text-lg"
      >
        Sign Up
      </Button>
      <p className="m-0 p-0">
        Already have an account?
        <span className="text-blue-500 hover:underline mx-2">
          {isSubmitting ? (
            <span className="cursor-pointer">Login</span>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </span>
      </p>
    </form>
  );
}
export default SignUpForm;
