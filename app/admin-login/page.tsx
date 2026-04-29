"use client";

import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";

type AdminLoginFormValues = {
  adminId: string;
  password: string;
};

export default function AdminLoginPage() {
  const router = useRouter();

  const onFinish = (values: AdminLoginFormValues) => {
    if (!values.adminId?.trim() || !values.password?.trim()) {
      message.error("Please enter both Admin ID and Password.");
      return;
    }

    const adminId = values.adminId.trim();
    const password = values.password.trim();

    if (adminId === "admin-cec" && password === "admincec123") {
      message.success("Login successful.");
      router.push("/admin-dashboard");
      return;
    }

    message.error("Invalid Admin ID or Password.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#102a43] via-black to-black px-4 pb-10 pt-28 sm:px-8 sm:pt-32">
      <div className="mx-auto w-full max-w-md rounded-xl border border-white/20 bg-white/95 p-6 shadow-xl sm:p-8">
        <h1 className="mb-2 text-center text-2xl font-semibold text-gray-900">
          Admin Login
        </h1>
        <p className="mb-6 text-center text-sm text-gray-600">
          Enter your admin credentials to continue.
        </p>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Admin ID"
            name="adminId"
            rules={[{ required: true, message: "Please enter your Admin ID." }]}
          >
            <Input placeholder="Enter Admin ID" size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password." }]}
          >
            <Input.Password placeholder="Enter password" size="large" />
          </Form.Item>

          <Button type="primary" htmlType="submit" size="large" className="w-full">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}

