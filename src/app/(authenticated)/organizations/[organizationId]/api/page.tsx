'use client'

import {
  Typography,
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Space,
} from 'antd'
import {
  KeyOutlined,
  DeleteOutlined,
  PlusOutlined,
  BookOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function APIManagementPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, organization } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  const {
    data: apiKeys,
    isLoading,
    refetch,
  } = Api.apiKey.findMany.useQuery({
    where: { organizationId: params.organizationId },
    include: { organization: true },
  })

  const { mutateAsync: createApiKey } = Api.apiKey.create.useMutation()
  const { mutateAsync: deleteApiKey } = Api.apiKey.delete.useMutation()

  const handleCreateApiKey = async (values: any) => {
    try {
      await createApiKey({
        data: {
          name: values.name,
          key:
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15),
          expiresAt: values.expiresAt
            ? values.expiresAt.toISOString()
            : undefined,
          userId: user?.id!,
          organizationId: params.organizationId,
        },
      })
      enqueueSnackbar('API Key created successfully', { variant: 'success' })
      setIsModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to create API Key', { variant: 'error' })
    }
  }

  const handleDeleteApiKey = async (id: string) => {
    try {
      await deleteApiKey({ where: { id } })
      enqueueSnackbar('API Key deleted successfully', { variant: 'success' })
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to delete API Key', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
      render: (text: string) => `${text.substring(0, 8)}...`,
    },
    {
      title: 'Expires At',
      dataIndex: 'expiresAt',
      key: 'expiresAt',
      render: (text: string) =>
        text ? dayjs(text).format('YYYY-MM-DD HH:mm') : 'Never',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Button
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteApiKey(record.id)}
          danger
        >
          Delete
        </Button>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>API Management</Title>
        <Paragraph>
          Manage your API keys and explore our API documentation to integrate
          your workflows with external systems.
        </Paragraph>

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Title level={3}>API Keys</Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalVisible(true)}
              style={{ marginBottom: 16 }}
            >
              Create New API Key
            </Button>
            <Table
              columns={columns}
              dataSource={apiKeys}
              loading={isLoading}
              rowKey="id"
            />
          </div>

          <div>
            <Title level={3}>API Documentation</Title>
            <Button
              icon={<BookOutlined />}
              onClick={() => window.open('/api-docs', '_blank')}
            >
              View API Documentation
            </Button>
          </div>
        </Space>

        <Modal
          title="Create New API Key"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleCreateApiKey} layout="vertical">
            <Form.Item
              name="name"
              label="API Key Name"
              rules={[
                { required: true, message: 'Please input the API key name!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="expiresAt" label="Expiration Date (Optional)">
              <DatePicker showTime />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<KeyOutlined />}>
                Create API Key
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
