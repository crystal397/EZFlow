'use client'

import { Prisma } from '@prisma/client'
import { Typography, Table, Button, Modal, Form, Input, Space } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function DataStoragePage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, organization } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingWorkflow, setEditingWorkflow] = useState<Prisma.WorkflowGetPayload<{include: {workflowSteps: true}}} | null>(null)
  const [form] = Form.useForm()

  const { data: workflows, isLoading, refetch } = Api.workflow.findMany.useQuery({
    where: { organizationId: params.organizationId },
    include: { workflowSteps: true }
  })

  const { mutateAsync: createWorkflow } = Api.workflow.create.useMutation()
  const { mutateAsync: updateWorkflow } = Api.workflow.update.useMutation()
  const { mutateAsync: deleteWorkflow } = Api.workflow.delete.useMutation()

  const handleCreateOrUpdate = async (values: any) => {
    try {
      if (editingWorkflow) {
        await updateWorkflow({
          where: { id: editingWorkflow.id },
          data: values
        })
        enqueueSnackbar('Workflow updated successfully', { variant: 'success' })
      } else {
        await createWorkflow({
          data: {
            ...values,
            organizationId: params.organizationId
          }
        })
        enqueueSnackbar('Workflow created successfully', { variant: 'success' })
      }
      setIsModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      enqueueSnackbar('Error saving workflow', { variant: 'error' })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteWorkflow({ where: { id } })
      enqueueSnackbar('Workflow deleted successfully', { variant: 'success' })
      refetch()
    } catch (error) {
      enqueueSnackbar('Error deleting workflow', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Steps',
      dataIndex: 'workflowSteps',
      key: 'workflowSteps',
      render: (steps: any[]) => steps?.length.toString() || '0',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Prisma.WorkflowGetPayload<{include: {workflowSteps: true}}>) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingWorkflow(record)
              form.setFieldsValue(record)
              setIsModalVisible(true)
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>Data Storage Management</Title>
        <Text>View and manage the data structures used in your workflows.</Text>

        <div style={{ marginTop: '24px', marginBottom: '24px' }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingWorkflow(null)
              form.resetFields()
              setIsModalVisible(true)
            }}
          >
            Create New Data Structure
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={workflows}
          loading={isLoading}
          rowKey="id"
        />

        <Modal
          title={editingWorkflow ? 'Edit Data Structure' : 'Create Data Structure'}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form
            form={form}
            onFinish={handleCreateOrUpdate}
            layout="vertical"
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please input the name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {editingWorkflow ? 'Update' : 'Create'}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}