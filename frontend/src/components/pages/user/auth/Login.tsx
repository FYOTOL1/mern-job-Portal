import { Label } from "@radix-ui/react-label";
import NavBar from "../../../shared/Navbar";
import { Input } from "../../../ui/input";
import { RadioGroup } from "../../../ui/radio-group";
import { Button } from "../../../ui/button";
import { Link, Navigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { LoginUser } from "../../../../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/toolkitHooks";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const Login = () => {
  const
    { user, loading } = useAppSelector(state => state.auth),
    { t } = useTranslation(),
    [input, setInput] = useState({
      email: "",
      password: "",
      role: ""
    }),
    [validation, setValidation] = useState({
      email: { valid: true, message: "" },
      password: { valid: true, message: "" },
      role: { valid: true, message: "" },
    })

  const dispatch = useAppDispatch();

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setValidation({ ...validation, [e.target.name]: { valid: true, message: "" } })
  };

  const isValidated = () => {
    let allValid = true

    if (!input.email || input.email.length <= 0) {
      setValidation(prev => ({
        ...prev,
        email: { valid: false, message: t("auth.login.required.email") }
      }));
      allValid = false
    }
    if (!input.password || input.password.length <= 0) {
      setValidation(prev => ({
        ...prev,
        password: { valid: false, message: t("auth.login.required.password") }
      })); allValid = false
    }
    if (!input.role || input.role.length <= 0) {
      setValidation(prev => ({
        ...prev,
        role: { valid: false, message: t("auth.login.required.role") }
      })); allValid = false
    }

    return allValid
  }

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (isValidated()) {
      dispatch(LoginUser(input))
    }
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
          className="w-11/12 sm:w-4/5 md:w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">{t("auth.login.title")}</h1>
          <div className="my-2">
            <Label>{t("auth.login.label.email")}</Label>
            <Input
              type="email"
              placeholder="patel@gmail.com"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
            />
          </div>
          <p className="text-sm ps-1 text-red-600">
            {!validation.email.valid && validation.email.message}
          </p>
          <div className="my-2">
            <Label>{t("auth.login.label.password")}</Label>
            <Input
              type="password"
              placeholder="Secret Password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
            />
            <p className="text-sm ps-1 text-red-600">
              {!validation.password.valid && validation.password.message}
            </p>
          </div>
          <div>
            <RadioGroup className="flex items-center justify-start gap-4 my-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value={"student"}
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">{t("auth.login.label.role.student")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value={"recruiter"}
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">{t("auth.login.label.role.recruiter")}</Label>
              </div>
            </RadioGroup>
            <p className="text-sm ps-1 text-red-600">
              {!validation.role.valid && validation.role.message}
            </p>
          </div>
          {loading ? (
            <Button>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait...{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              {t("auth.login.button")}
            </Button>
          )}
          <span className="text-sm text-gray-800">
            {t("auth.login.askAccount")}
            {" "}
            <Link className="underline text-blue-600" to="/signup">
              {t("auth.signup.title")}
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
