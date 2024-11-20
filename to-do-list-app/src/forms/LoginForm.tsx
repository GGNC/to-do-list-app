import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserInterface } from "../api/types";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useQueryClient } from "@tanstack/react-query";

const schema = z.object({
  email: z.string().min(1, { message: "Please enter the email for your account." }).email(),
  password: z
    .string()
    .min(1, { message: "Please enter the password for your account." }),
});
type FormFields = z.infer<typeof schema>;

function LoginForm() {
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
      const user: UserInterface = response.data[0];
      if (!response.data.length || data.password !== user.password) {
        throw new Error();
      }
      queryClient.setQueryData(["user"], user);
      navigate("/taskpad");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      setError("root", {
        message: "Invalid email or password",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-w-96 m-8 p-6 px-8 pb-4 flex flex-col flex-nowrap justify-start items-center gap-1 bg-white border-2 rounded-3xl"
    >
      <div className="w-full m-0 p-0 flex flex-col gap-2 justify-center items-center">
        <div className="w-full m-0 p-0 flex justify-start items-baseline gap-2">
          <h2>Email</h2>
          {errors.email && (
            <span className="text-red-600 text-xs">{errors.email.message}</span>
          )}
        </div>
        <input
          {...register("email")}
          type="text"
          placeholder="example@example.com"
          className="w-full px-6 py-2 font-semibold border-b-2"
        />
      </div>
      <div className="w-full m-0 p-0 flex flex-col gap-2 justify-center items-center">
        <div className="w-full m-0 p-0 flex justify-start items-baseline gap-2">
          <h2>Password</h2>
          {errors.password && (
            <span className="text-red-600 text-xs">
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
        Login
      </Button>
      <p className="m-0 p-0">
        Need an account?
        <span className="text-blue-500 hover:underline mx-2">
          {isSubmitting ? (
            <span className="cursor-pointer">Sign up</span>
          ) : (
            <Link to="/signup">Sign up</Link>
          )}
        </span>
      </p>
    </form>
  );
}
export default LoginForm;
