import { Label } from "@radix-ui/react-label";
import NavBar from "../../../shared/Navbar";
import { Input } from "../../../ui/input";
import { RadioGroup } from "../../../ui/radio-group";
import { Button } from "../../../ui/button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/toolkitHooks";
import { SignupUser } from "../../../../store/slices/authSlice";
import { Loader2 } from "lucide-react";
import { IUser } from "../../../../types/userTypes";
import { useTranslation } from "react-i18next";

const Signup = () => {
  const
    { user, loading } = useAppSelector(state => state.auth),
    { t } = useTranslation(),
    dispatch = useAppDispatch(),
    [input, setInput] = useState<IUser>({
      fullName: "",
      email: "",
      password: "",
      phoneNumber: null as unknown as number,
      role: null,
      file: null,
    }),
    [validation, setValidation] = useState({
      fullName: { valid: true, message: "" },
      email: { valid: true, message: "" },
      password: { valid: true, message: "" },
      phoneNumber: { valid: true, message: "" },
      role: { valid: true, message: "" },
      file: { valid: true, message: "" },
    }),
    navigate = useNavigate(),
    emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phoneNumberRegex = /^\d{9,10}$/

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setValidation({ ...validation, [e.target.name]: { valid: true, message: "" } })
  };

  const changeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, file: e.target.files?.[0] as File });
    setValidation({ ...validation, file: { valid: true, message: null as unknown as string } })
  };

  const isValidated = () => {
    let canSendRequest = true;

    if (!input.fullName || input.fullName.length <= 0) {
      setValidation((prev) => ({ ...prev, fullName: { valid: false, message: t("auth.signup.required.fullName") } }));
      canSendRequest = false;
    }

    if (!input.email || input.email.length <= 0 || !emailRegex.test(input.email)) {
      const emailMessage = !input.email ? t("auth.signup.required.email") : t("auth.signup.required.emailFormat");
      setValidation((prev) => ({ ...prev, email: { valid: false, message: emailMessage } }));
      canSendRequest = false;
    }

    if (!input.phoneNumber || !phoneNumberRegex.test(input.phoneNumber.toString())) {
      setValidation((prev) => ({ ...prev, phoneNumber: { valid: false, message: t("auth.signup.required.phoneNumber") } }));
      canSendRequest = false;
    }

    if (!input.password || input.password.length < 6) {
      setValidation((prev) => ({ ...prev, password: { valid: false, message: t("auth.signup.required.password") } }));
      canSendRequest = false;
    }

    if (!input.role || (input.role !== "recruiter" && input.role !== "student")) {
      setValidation((prev) => ({ ...prev, role: { valid: false, message: t("auth.signup.required.role") } }));
      canSendRequest = false;
    }

    if (!input.file) {
      setValidation((prev) => ({ ...prev, file: { valid: false, message: t("auth.signup.required.profile") } }));
      canSendRequest = false;
    }

    return canSendRequest;
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

    if (isValidated()) {
      dispatch(SignupUser(formData)).then(res => {
        if (res.payload.status) navigate("/")
      })
    }
  };

  if (user) {
    return <Navigate to={"/"} />
  }

  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center max-w-7xl mx-auto h-auto">
        <form
          onSubmit={submitHandler}
          className="w-11/12 sm:w-4/5 md:w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">{t("auth.signup.title")}</h1>

          {/* حقل الاسم الكامل */}
          <div className="my-2">
            <Label>{t("auth.signup.label.fullName")}</Label>
            <Input
              autoComplete="off"
              type="text"
              placeholder="john tony"
              value={input.fullName}
              name="fullName"
              onChange={changeEventHandler}
              className={`${!validation.fullName.valid ? "outline outline-1 outline-red-500" : "outline-none"}`}
            />
            <p className="text-sm ps-1 text-red-600">
              {!validation.fullName.valid && validation.fullName.message}
            </p>
          </div>

          {/* حقل البريد الإلكتروني */}
          <div className="my-2">
            <Label>{t("auth.signup.label.email")}</Label>
            <Input
              autoComplete="off"
              type="text"
              placeholder="bla@gmail.com"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              className={`${!validation.email.valid ? "outline outline-1 outline-red-500" : "outline-none"}`}
            />
            <p className="text-sm ps-1 text-red-600">
              {!validation.email.valid && validation.email.message}
            </p>
          </div>

          {/* حقل رقم الهاتف */}
          <div className="my-2">
            <Label>{t("auth.signup.label.phoneNumber")}</Label>
            <Input
              autoComplete="off"
              type="number"
              placeholder="0000000000"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              className={`${!validation.phoneNumber.valid ? "outline outline-1 outline-red-500" : "outline-none"}`}
            />
            <p className="text-sm ps-1 text-red-600">
              {!validation.phoneNumber.valid && validation.phoneNumber.message}
            </p>
          </div>

          {/* حقل كلمة المرور */}
          <div className="my-2">
            <Label>{t("auth.signup.label.password")}</Label>
            <Input
              autoComplete="off"
              type="password"
              placeholder="Secret Password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              className={`${!validation.password.valid ? "outline outline-1 outline-red-500" : "outline-none"}`}
            />
            <p className="text-sm ps-1 text-red-600">
              {!validation.password.valid && validation.password.message}
            </p>
          </div>

          {/* حقل الملف الشخصي */}
          <div className="my-2">
            <Label htmlFor="prof" className="cursor-pointer">
              {t("auth.signup.label.profile")}
            </Label>
            <Input
              autoComplete="off"
              id="prof"
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className={`cursor-pointer ${!validation.file.valid ? "outline outline-1 outline-red-500" : "outline-none"}`}
            />
            <p className="text-sm ps-1 text-red-600">
              {!validation.file.valid && validation.file.message}
            </p>
          </div>

          {/* حقل الاختيار بين الطالب والمجند */}
          <div className="my-2">
            <span className={`text-sm `}>{t("auth.signup.label.roleMessage")}:</span>
            <RadioGroup required className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  autoComplete="off"
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">{t("auth.signup.label.role.student")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  autoComplete="off"
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">{t("auth.signup.label.role.recruiter")}</Label>
              </div>
            </RadioGroup>
            <p className="text-sm ps-1 text-red-600">
              {!validation.role.valid && validation.role.message}
            </p>
          </div>

          {/* عرض الزر مع حالة التحميل */}
          {loading ? (
            <Button>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait...
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              {t("auth.signup.button")}
            </Button>
          )}

          {/* رابط تسجيل الدخول */}
          <span className="text-sm text-gray-800">
            {t("auth.signup.askAccount")}? {" "}
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
