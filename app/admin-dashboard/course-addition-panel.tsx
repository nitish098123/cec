"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Image,
  Input,
  Modal,
  Radio,
  Select,
  Space,
  Table,
  Upload,
  message,
} from "antd";
import type { UploadFile } from "antd";
import { CopyOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import type { AdminCourse } from "@/lib/course-enrich";
import type { CourseInput } from "@/lib/course-types";
import { COURSE_CATEGORIES } from "@/lib/course-types";

type RedirectSource = "s3" | "external";

type CourseFormValues = CourseInput & {
  redirectSource: RedirectSource;
};

const emptyForm: CourseFormValues = {
  name: "",
  duration: "",
  mode: "Online",
  students: "",
  partner: "",
  category: "Emerging Technologies",
  image: "",
  redirectLink: "",
  redirectMediaKey: "",
  redirectSource: "s3",
  openInNewTab: true,
};

async function copyText(text: string) {
  if (!text) return;
  await navigator.clipboard.writeText(text);
  message.success("Copied to clipboard.");
}

export default function CourseAdditionPanel() {
  const [form] = Form.useForm<CourseFormValues>();
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<AdminCourse | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);
  const [mediaFileList, setMediaFileList] = useState<UploadFile[]>([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [redirectCopyUrl, setRedirectCopyUrl] = useState("");

  const redirectSource = Form.useWatch("redirectSource", form) ?? "s3";

  const loadCourses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/courses", { cache: "no-store" });
      if (res.status === 401) {
        message.error("Session expired. Please login again.");
        window.location.href = "/admin-login";
        return;
      }
      if (!res.ok) throw new Error("Failed to load courses");
      const data = await res.json();
      setCourses(data.courses || []);
    } catch {
      message.error("Unable to load courses.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const filteredCourses = useMemo(() => {
    if (categoryFilter === "all") return courses;
    return courses.filter((course) => course.category === categoryFilter);
  }, [courses, categoryFilter]);

  const openCreateModal = () => {
    setEditingCourse(null);
    form.setFieldsValue(emptyForm);
    setImageFileList([]);
    setMediaFileList([]);
    setImagePreviewUrl("");
    setRedirectCopyUrl("");
    setModalOpen(true);
  };

  const openEditModal = (course: AdminCourse) => {
    setEditingCourse(course);
    const hasMediaKey = Boolean(course.redirectMediaKey?.trim());
    form.setFieldsValue({
      name: course.name,
      duration: course.duration,
      mode: course.mode,
      students: course.students,
      partner: course.partner,
      category: course.category,
      image: course.image,
      redirectLink: course.redirectLink,
      redirectMediaKey: course.redirectMediaKey || "",
      redirectSource: hasMediaKey ? "s3" : "external",
      openInNewTab: course.openInNewTab,
    });
    setImageFileList([]);
    setMediaFileList([]);
    setImagePreviewUrl(course.imagePreviewUrl);
    setRedirectCopyUrl(course.redirectCopyUrl);
    setModalOpen(true);
  };

  const uploadToS3 = async (file: File, type: "image" | "media") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");
    return data as {
      key: string;
      presignedViewUrl: string;
      copyUrl: string;
      proxyPath: string;
    };
  };

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    try {
      const uploaded = await uploadToS3(file, "image");
      form.setFieldValue("image", uploaded.key);
      setImagePreviewUrl(uploaded.presignedViewUrl);
      message.success("Course image uploaded to S3.");
      return false;
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : "Image upload failed."
      );
      return Upload.LIST_IGNORE;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleMediaUpload = async (file: File) => {
    setUploadingMedia(true);
    try {
      const uploaded = await uploadToS3(file, "media");
      form.setFieldValue("redirectMediaKey", uploaded.key);
      form.setFieldValue("redirectSource", "s3");
      form.setFieldValue("redirectLink", "");
      const copyUrl = `${window.location.origin}${uploaded.proxyPath}`;
      setRedirectCopyUrl(copyUrl);
      message.success("Redirect media uploaded. Copy the link below.");
      return false;
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : "Media upload failed."
      );
      return Upload.LIST_IGNORE;
    } finally {
      setUploadingMedia(false);
    }
  };

  const handleSave = async (values: CourseFormValues) => {
    setSaving(true);
    try {
      const payload: CourseInput = {
        name: values.name,
        duration: values.duration,
        mode: values.mode,
        students: values.students,
        partner: values.partner,
        category: values.category,
        image: values.image,
        openInNewTab: Boolean(values.openInNewTab),
        redirectLink:
          values.redirectSource === "external" ? values.redirectLink : "",
        redirectMediaKey:
          values.redirectSource === "s3" ? values.redirectMediaKey : undefined,
      };

      if (!payload.image?.trim()) {
        throw new Error("Upload a course image to S3.");
      }
      if (!payload.redirectLink?.trim() && !payload.redirectMediaKey?.trim()) {
        throw new Error("Upload redirect media or provide an external link.");
      }

      const url = editingCourse
        ? `/api/admin/courses/${editingCourse.id}`
        : "/api/admin/courses";
      const method = editingCourse ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save course");
      }

      message.success(editingCourse ? "Course updated." : "Course added.");
      setModalOpen(false);
      setEditingCourse(null);
      form.resetFields();
      await loadCourses();
    } catch (error) {
      message.error(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (course: AdminCourse) => {
    Modal.confirm({
      title: "Delete this course?",
      content: "This will also delete linked S3 image/media files.",
      okText: "Delete",
      okType: "danger",
      onOk: async () => {
        const res = await fetch(`/api/admin/courses/${course.id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          message.error("Failed to delete course.");
          return;
        }
        message.success("Course deleted.");
        await loadCourses();
      },
    });
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "imagePreviewUrl",
      width: 90,
      render: (url: string) => (
        <Image src={url || "/course.jpeg"} alt="course" width={64} height={40} />
      ),
    },
    { title: "Name", dataIndex: "name", ellipsis: true },
    { title: "Category", dataIndex: "category", width: 170 },
    { title: "Partner", dataIndex: "partner", width: 130, ellipsis: true },
    { title: "Duration", dataIndex: "duration", width: 110 },
    {
      title: "Redirect",
      dataIndex: "redirectCopyUrl",
      ellipsis: true,
      render: (url: string) =>
        url ? (
          <Button
            type="link"
            size="small"
            icon={<CopyOutlined />}
            onClick={() => copyText(url)}
          >
            Copy link
          </Button>
        ) : (
          "—"
        ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 170,
      render: (_: unknown, record: AdminCourse) => (
        <Space>
          <Button size="small" onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Button size="small" danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Select
          value={categoryFilter}
          onChange={setCategoryFilter}
          style={{ minWidth: 240 }}
          options={[
            { value: "all", label: "All Categories" },
            ...COURSE_CATEGORIES.map((category) => ({
              value: category,
              label: category,
            })),
          ]}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal}>
          Add New Course
        </Button>
      </div>

      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={filteredCourses}
        pagination={{ pageSize: 8 }}
        scroll={{ x: 1100 }}
      />

      <Modal
        title={editingCourse ? "Edit Course" : "Add New Course"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={820}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={emptyForm}
          onFinish={handleSave}
        >
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-x-4">
            <Form.Item
              label="Course Name"
              name="name"
              rules={[{ required: true, message: "Required" }]}
              className="md:col-span-2"
            >
              <Input placeholder="Course title" />
            </Form.Item>

            <Form.Item label="Category" name="category" rules={[{ required: true }]}>
              <Select
                options={COURSE_CATEGORIES.map((c) => ({ value: c, label: c }))}
              />
            </Form.Item>

            <Form.Item label="Partner" name="partner" rules={[{ required: true }]}>
              <Input placeholder="Partner name" />
            </Form.Item>

            <Form.Item label="Duration" name="duration" rules={[{ required: true }]}>
              <Input placeholder="e.g. 6 Months" />
            </Form.Item>

            <Form.Item label="Mode" name="mode" rules={[{ required: true }]}>
              <Input placeholder="Online / Offline" />
            </Form.Item>

            <Form.Item label="Students" name="students" rules={[{ required: true }]}>
              <Input placeholder="e.g. 500+" />
            </Form.Item>

            <Form.Item name="openInNewTab" valuePropName="checked">
              <Checkbox>Open link in new tab</Checkbox>
            </Form.Item>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="mb-3 font-medium text-gray-800">Course card image (S3)</p>
            <Form.Item
              name="image"
              rules={[{ required: true, message: "Upload course image to S3" }]}
              className="mb-2"
            >
              <Input placeholder="S3 key (auto-filled after upload)" readOnly />
            </Form.Item>
            <Upload
              accept="image/jpeg,image/png,image/webp"
              maxCount={1}
              fileList={imageFileList}
              beforeUpload={(file) => {
                handleImageUpload(file);
                return false;
              }}
              onChange={({ fileList: next }) => setImageFileList(next)}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />} loading={uploadingImage}>
                Upload image to S3
              </Button>
            </Upload>
            {imagePreviewUrl ? (
              <div className="mt-3">
                <Image
                  src={imagePreviewUrl}
                  alt="Preview"
                  style={{ maxHeight: 160, objectFit: "contain" }}
                />
              </div>
            ) : null}
          </div>

          <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="mb-3 font-medium text-gray-800">Course redirect link</p>
            <Form.Item name="redirectSource" className="mb-3">
              <Radio.Group>
                <Radio value="s3">Upload media to S3 (default)</Radio>
                <Radio value="external">External URL</Radio>
              </Radio.Group>
            </Form.Item>

            {redirectSource === "s3" ? (
              <>
                <Form.Item
                  name="redirectMediaKey"
                  rules={[
                    { required: true, message: "Upload redirect media to S3" },
                  ]}
                  className="mb-2"
                >
                  <Input placeholder="S3 media key (auto-filled after upload)" readOnly />
                </Form.Item>
                <Upload
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  maxCount={1}
                  fileList={mediaFileList}
                  beforeUpload={(file) => {
                    handleMediaUpload(file);
                    return false;
                  }}
                  onChange={({ fileList: next }) => setMediaFileList(next)}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />} loading={uploadingMedia}>
                    Upload PDF or image to S3
                  </Button>
                </Upload>
                {redirectCopyUrl ? (
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <Input value={redirectCopyUrl} readOnly />
                    <Button
                      icon={<CopyOutlined />}
                      onClick={() => copyText(redirectCopyUrl)}
                    >
                      Copy redirect link
                    </Button>
                  </div>
                ) : null}
                <p className="mt-2 text-xs text-gray-500">
                  This link uses a pre-signed URL flow via your site API (no CDN required).
                </p>
              </>
            ) : (
              <Form.Item
                name="redirectLink"
                rules={[{ required: true, message: "Enter external redirect URL" }]}
              >
                <Input placeholder="https://partner-site.com/course" />
              </Form.Item>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={saving}>
              {editingCourse ? "Update Course" : "Add Course"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
