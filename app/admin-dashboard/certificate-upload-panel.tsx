"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Upload,
  message,
} from "antd";
import type { UploadFile } from "antd";
import { CopyOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import type { CertificateRecord } from "@/lib/certificate-types";

type CertificateRow = CertificateRecord & { certificateUrl: string };

type CertificateFormValues = {
  courseName: string;
  name: string;
  email: string;
  number?: string;
  folderName: string;
  s3Key: string;
  certPath: string;
  fileName: string;
  contentType: string;
};

const emptyForm: CertificateFormValues = {
  courseName: "",
  name: "",
  email: "",
  number: "",
  folderName: "",
  s3Key: "",
  certPath: "",
  fileName: "",
  contentType: "",
};

async function copyText(text: string) {
  if (!text) return;
  await navigator.clipboard.writeText(text);
  message.success("Copied to clipboard.");
}

export default function CertificateUploadPanel() {
  const [form] = Form.useForm<CertificateFormValues>();
  const [courses, setCourses] = useState<string[]>([]);
  const [certificates, setCertificates] = useState<CertificateRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [addCourseOpen, setAddCourseOpen] = useState(false);
  const [newCourseName, setNewCourseName] = useState("");
  const [addingCourse, setAddingCourse] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewUrl, setPreviewUrl] = useState("");
  const [legacyUrl, setLegacyUrl] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/certificates", { cache: "no-store" });
      if (res.status === 401) {
        message.error("Session expired. Please login again.");
        window.location.href = "/admin-login";
        return;
      }
      if (!res.ok) throw new Error("Failed to load certificates");
      const data = await res.json();
      setCourses(data.courses || []);
      setCertificates(data.certificates || []);
    } catch {
      message.error("Unable to load certificate data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const courseOptions = useMemo(
    () => courses.map((course) => ({ value: course, label: course })),
    [courses]
  );

  const resetUploadFields = () => {
    form.setFieldsValue({
      s3Key: "",
      certPath: "",
      fileName: "",
      contentType: "",
    });
    setFileList([]);
    setPreviewUrl("");
    setLegacyUrl("");
  };

  const handleCertificateUpload = async (file: File) => {
    const folderName = form.getFieldValue("folderName")?.trim();
    const candidateName = form.getFieldValue("name")?.trim();

    if (!folderName) {
      message.error("Enter a folder name before uploading.");
      return Upload.LIST_IGNORE;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folderName", folderName);
      formData.append("candidateName", candidateName || "");

      const res = await fetch("/api/admin/upload-certificate", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      form.setFieldsValue({
        s3Key: data.s3Key,
        certPath: data.certPath,
        fileName: data.fileName,
        contentType: data.contentType,
        folderName: data.folderName,
      });
      setPreviewUrl(data.presignedViewUrl);
      const copyUrl = `${window.location.origin}${data.proxyPath}`;
      setLegacyUrl(copyUrl);
      message.success("Certificate uploaded to S3.");
      return false;
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : "Certificate upload failed."
      );
      return Upload.LIST_IGNORE;
    } finally {
      setUploading(false);
    }
  };

  const handleAddCourse = async () => {
    const trimmed = newCourseName.trim();
    if (!trimmed) {
      message.error("Enter a course name.");
      return;
    }

    setAddingCourse(true);
    try {
      const res = await fetch("/api/admin/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add-course", courseName: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add course");

      setCourses(data.courses || []);
      form.setFieldValue("courseName", trimmed);
      setNewCourseName("");
      setAddCourseOpen(false);
      message.success("Course added.");
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : "Failed to add course."
      );
    } finally {
      setAddingCourse(false);
    }
  };

  const handleSave = async (values: CertificateFormValues) => {
    if (!values.s3Key?.trim()) {
      message.error("Upload a certificate file to S3 first.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          name: values.name,
          email: values.email,
          number: values.number,
          courseName: values.courseName,
          folderName: values.folderName,
          s3Key: values.s3Key,
          certPath: values.certPath,
          fileName: values.fileName,
          contentType: values.contentType,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save certificate");

      message.success("Certificate record saved.");
      form.setFieldsValue(emptyForm);
      resetUploadFields();
      await loadData();
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : "Failed to save certificate."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/admin/certificates?id=${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) {
      message.error(data.error || "Delete failed.");
      return;
    }
    message.success("Certificate deleted.");
    await loadData();
  };

  const columns = [
    { title: "ID", dataIndex: "id", width: 70 },
    { title: "Candidate", dataIndex: "name", ellipsis: true },
    { title: "Email", dataIndex: "email", ellipsis: true },
    { title: "Course", dataIndex: "courseName", ellipsis: true },
    { title: "Folder", dataIndex: "folderName", ellipsis: true },
    {
      title: "Certificate URL",
      dataIndex: "certificateUrl",
      ellipsis: true,
      render: (url: string) => (
        <Space>
          <span className="max-w-[220px] truncate inline-block">{url}</span>
          <Button
            type="link"
            size="small"
            icon={<CopyOutlined />}
            onClick={() => copyText(url)}
          />
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_: unknown, record: CertificateRow) => (
        <Popconfirm
          title="Delete this certificate?"
          onConfirm={() => handleDelete(record.id)}
        >
          <Button danger size="small">
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-xl border border-[#2441B6]/25 shadow-sm">
        <div className="border-b-4 border-[#2441B6] bg-[#2441B6] px-5 py-4">
          <h2 className="text-xl font-medium tracking-wide text-white">
            Upload Certificate
          </h2>
          <p className="mt-1 text-sm text-white/90">
            Upload to S3 under a folder you choose. Candidates can download via
            course name and email on the public certificate page.
          </p>
        </div>

        <div className="bg-[#FFFAF1] px-5 py-6 sm:px-6">
          <Form
            form={form}
            layout="vertical"
            initialValues={emptyForm}
            onFinish={handleSave}
            requiredMark={(label, { required }) =>
              required ? (
                <>
                  {label} <span className="text-[#2441B6]">*</span>
                </>
              ) : (
                label
              )
            }
          >
            <div className="grid gap-x-5 gap-y-1 sm:grid-cols-2">
              <div>
                <Form.Item
                  label="Course Name"
                  name="courseName"
                  rules={[{ required: true, message: "Select a course." }]}
                  className="mb-2"
                >
                  <Select
                    placeholder="Select course"
                    showSearch
                    size="large"
                    options={courseOptions}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
                <Button
                  type="default"
                  icon={<PlusOutlined />}
                  onClick={() => setAddCourseOpen(true)}
                  className="mb-4 border-[#2441B6] text-gray-800 hover:!border-[#2441B6] hover:!text-gray-900"
                >
                  Add New Course
                </Button>
              </div>

              <Form.Item
                label="Folder Name"
                name="folderName"
                rules={[
                  { required: true, message: "Folder name is required." },
                  {
                    pattern: /^[a-zA-Z0-9._-]+$/,
                    message:
                      "Use letters, numbers, dots, hyphens, or underscores only.",
                  },
                ]}
                extra={
                  <span className="text-gray-600">
                    S3 folder under CECTemp/Certificates/ (e.g. CA-06-2025-26)
                  </span>
                }
              >
                <Input placeholder="e.g. CA-06-2025-26" size="large" />
              </Form.Item>

              <Form.Item
                label="Candidate Name"
                name="name"
                rules={[
                  { required: true, message: "Candidate name is required." },
                ]}
              >
                <Input placeholder="Full name" size="large" />
              </Form.Item>

              <Form.Item
                label="Email ID"
                name="email"
                rules={[
                  { required: true, message: "Email is required." },
                  { type: "email", message: "Enter a valid email." },
                ]}
              >
                <Input placeholder="candidate@email.com" size="large" />
              </Form.Item>

              <Form.Item label="Mobile Number (optional)" name="number">
                <Input placeholder="+91..." size="large" />
              </Form.Item>

              <Form.Item label="Upload Certificate" required>
                <Upload
                  accept=".jpg,.jpeg,.png,.webp,.pdf,image/*,application/pdf"
                  fileList={fileList}
                  beforeUpload={handleCertificateUpload}
                  onRemove={() => {
                    resetUploadFields();
                    return true;
                  }}
                  maxCount={1}
                >
                  <Button
                    icon={<UploadOutlined />}
                    loading={uploading}
                    size="large"
                    className="border-[#102a43]/20"
                  >
                    Upload JPG, PNG, WEBP, or PDF
                  </Button>
                </Upload>
              </Form.Item>
            </div>

            <Form.Item name="s3Key" hidden>
              <Input />
            </Form.Item>
            <Form.Item name="certPath" hidden>
              <Input />
            </Form.Item>
            <Form.Item name="fileName" hidden>
              <Input />
            </Form.Item>
            <Form.Item name="contentType" hidden>
              <Input />
            </Form.Item>

            {previewUrl && (
              <div className="mb-4 rounded-lg border border-[#2441B6]/30 bg-white/70 p-4">
                <p className="mb-2 text-sm font-medium text-gray-800">Preview</p>
                {form.getFieldValue("contentType") === "application/pdf" ? (
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#102a43] underline hover:text-[#2441B6]"
                  >
                    Open uploaded PDF
                  </a>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewUrl}
                    alt="Certificate preview"
                    className="max-h-48 rounded-md border border-[#2441B6]/20"
                  />
                )}
              </div>
            )}

            {legacyUrl && (
              <div className="mb-5 flex flex-wrap items-center gap-2 rounded-lg border border-[#2441B6]/40 bg-[#2441B6]/40 p-4">
                <span className="text-sm font-medium text-gray-800">
                  Public certificate link:
                </span>
                <code className="max-w-full truncate text-xs text-gray-700 sm:text-sm">
                  {legacyUrl}
                </code>
                <Button
                  size="small"
                  icon={<CopyOutlined />}
                  onClick={() => copyText(legacyUrl)}
                >
                  Copy
                </Button>
              </div>
            )}

            <Button
              type="primary"
              htmlType="submit"
              loading={saving}
              size="large"
              className="min-w-[220px] border-none bg-[#2441B6] text-white font-medium tracking-wide hover:!bg-[#2441B6] hover:!text-white"
            >
              Save Certificate Record
            </Button>
          </Form>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-[#102a43]/15 shadow-sm">
        <div className="border-b-4 border-[#102a43] bg-[#102a43]/5 px-5 py-4">
          <h3 className="text-xl font-medium tracking-wide text-gray-900">
            Uploaded Certificates
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Recently uploaded certificate records and their public download links.
          </p>
        </div>
        <div className="px-2 py-4 sm:px-4">
          <Table
            rowKey="id"
            loading={loading}
            columns={columns}
            dataSource={certificates}
            scroll={{ x: 900 }}
            pagination={{ pageSize: 10 }}
          />
        </div>
      </section>

      <Modal
        title="Add New Course"
        open={addCourseOpen}
        onCancel={() => {
          setAddCourseOpen(false);
          setNewCourseName("");
        }}
        onOk={handleAddCourse}
        confirmLoading={addingCourse}
        okText="Add Course"
      >
        <Input
          placeholder="Enter course name"
          value={newCourseName}
          onChange={(e) => setNewCourseName(e.target.value)}
          onPressEnter={handleAddCourse}
        />
      </Modal>
    </div>
  );
}
