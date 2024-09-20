'use client'

import { Prisma } from '@prisma/client'
import { useState } from 'react'
import { Typography, Input, Button, List, Card, Modal, Form, Space } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function WorkflowsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, organization } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  const {
    data: workflows,
    isLoading,
    refetch,
  } = Api.workflow.findMany.useQuery({
    where: {
      organizationId: params.organizationId,
      name: { contains: searchTerm, mode: 'insensitive' },
    },
  })

  const { mutateAsync: createWorkflow } = Api.workflow.create.useMutation()

  const handleCreateWorkflow = async (values: {
    name: string
    description: string
  }) => {
    try {
      await createWorkflow({
        data: {
          ...values,
          organizationId: params.organizationId,
        },
      })
      enqueueSnackbar('Workflow created successfully', { variant: 'success' })
      setIsModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to create workflow', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>Automation Workflows</Title>
        <Text>Manage and organize your automation workflows efficiently.</Text>

        <Space style={{ marginTop: 24, marginBottom: 24 }}>
          <Input
            placeholder="Search workflows"
            prefix={<SearchOutlined />}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ width: 300 }}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Create Workflow
          </Button>
        </Space>

        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 }}
          dataSource={workflows}
          loading={isLoading}
          renderItem={workflow => (
            <List.Item>
              <Card
                title={workflow.name}
                extra={
                  <a
                    onClick={() =>
                      router.push(
                        `/organizations/${params.organizationId}/workflows/${workflow.id}/edit`,
                      )
                    }
                  >
                    Edit
                  </a>
                }
              >
                <p>{workflow.description}</p>
              </Card>
            </List.Item>
          )}
        />

        <Modal
          title="Create New Workflow"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleCreateWorkflow} layout="vertical">
            <Form.Item
              name="name"
              label="Workflow Name"
              rules={[
                { required: true, message: 'Please input the workflow name!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
