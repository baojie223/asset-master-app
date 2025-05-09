"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const validateForm = () => {
    if (!email) {
      toast.error("请输入邮箱地址");
      return false;
    }
    if (!email.includes("@")) {
      toast.error("请输入有效的邮箱地址");
      return false;
    }
    if (!password) {
      toast.error("请输入密码");
      return false;
    }
    if (password.length < 6) {
      toast.error("密码长度至少为6位");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await signIn(email, password);
        toast.success("登录成功");
      } else {
        await signUp(email, password);
        toast.success("注册成功，请查收验证邮件");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        // 处理常见错误
        if (error.message.includes("Invalid login credentials")) {
          toast.error("邮箱或密码错误");
        } else if (error.message.includes("Email not confirmed")) {
          toast.error("邮箱未验证，请先验证邮箱");
        } else if (error.message.includes("User already registered")) {
          toast.error("该邮箱已注册，请直接登录");
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error("发生未知错误");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? "登录" : "注册"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin ? "登录您的账户" : "创建新账户"}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Input
                type="email"
                required
                placeholder="电子邮箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4"
                disabled={loading}
                autoComplete="email"
              />
            </div>
            <div>
              <Input
                type="password"
                required
                placeholder="密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                autoComplete={isLogin ? "current-password" : "new-password"}
                minLength={6}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "处理中..." : isLogin ? "登录" : "注册"}
            </Button>
          </div>

          <div className="text-center">
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-500"
              onClick={() => {
                setIsLogin(!isLogin);
                setEmail("");
                setPassword("");
              }}
              disabled={loading}
            >
              {isLogin ? "没有账号？点击注册" : "已有账号？点击登录"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 