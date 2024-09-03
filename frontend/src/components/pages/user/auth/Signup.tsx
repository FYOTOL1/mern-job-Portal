import { Label } from "@radix-ui/react-label";
import NavBar from "../../../shared/Navbar";
import { Input } from "../../../ui/input";
import { RadioGroup } from "../../../ui/radio-group";
import { Button } from "../../../ui/button";
import { Link, Navigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/toolkitHooks";
import { SignupUser } from "../../../../store/slices/authSlice";
import { Loader2 } from "lucide-react";
import { IUser } from "../../../../types/userTypes";

const Signup = () => {
  const
    Store = useAppSelector((state) => state.auth),
    { user } = useAppSelector(state => state.auth),
    dispatch = useAppDispatch(),
    [input, setInput] = useState<IUser>({
      fullName: "",
      email: "",
      password: "",
      phoneNumber: null as unknown as number,
      role: null,
      file: null,
    });

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, file: e.target.files?.[0] as File });
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (input.fullName) formData.append("fullName", input.fullName);
    if (input.email) formData.append("email", input.email);
    if (input.phoneNumber) formData.append("phoneNumber", input.phoneNumber.toString());
    if (input.password) formData.append("password", input.password);
    if (input.role) formData.append("role", input.role);
    if (input.file) formData.append("file", input.file);

    dispatch(SignupUser(formData))
  };

  if (user) {
    return <Navigate to={"/"} />
  }

  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              autoComplete="off"
              type="text"
              placeholder="patel"
              value={input.fullName}
              name="fullName"
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              autoComplete="off"
              type="email"
              placeholder="patel@gmail.com"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              autoComplete="off"
              type="number"
              placeholder="patel"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              autoComplete="off"
              type="password"
              placeholder="****"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label htmlFor="prof" className="cursor-pointer">
              Profile
            </Label>
            <Input
              autoComplete="off"
              id="prof"
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className="cursor-pointer"
            />
          </div>
          <div className="my-2">
            <span className="text-sm">Continue As:</span>
            <RadioGroup className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  autoComplete="off"
                  type="radio"
                  name="role"
                  value={"student"}
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  autoComplete="off"
                  type="radio"
                  name="role"
                  value={"recruiter"}
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {Store.loading ? (
            <Button>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait...{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Sign up
            </Button>
          )}
          <span className="text-sm text-gray-800">
            Already have an account{"? "}
            <Link className="underline text-blue-600" to="/login">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
