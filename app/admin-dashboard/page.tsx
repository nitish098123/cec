"use client";

import { Button, Tabs } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CourseAdditionPanel from "./course-addition-panel";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    fetch("/api/admin/auth/check", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.replace("/admin-login");
          return;
        }
        setAuthChecked(true);
      })
      .catch(() => router.replace("/admin-login"));
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin-login");
  };

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#102a43] text-white">
        Loading admin dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#102a43] via-[#0b1d2f] to-black px-3 py-10 sm:px-4 lg:px-6">
      <div className="mx-auto w-full max-w-[1400px] rounded-2xl border border-white/15 bg-white/95 p-6 shadow-2xl sm:p-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Welcome to the CEC admin panel.
            </p>
          </div>
          <Button onClick={handleLogout}>Log out</Button>
        </div>

        <Tabs
          defaultActiveKey="certificate-upload"
          items={[
            {
              key: "certificate-upload",
              label: "Certificate Upload",
              children: (
                <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-gray-700">
                  Certificate upload module will be managed here.
                </div>
              ),
            },
            {
              key: "course-addition",
              label: "Course Addition",
              children: <CourseAdditionPanel />,
            },
          ]}
        />
      </div>
    </div>
  );
}

