'use client'

import { Typography, Card, Button, Modal, Form, Input, Space, List } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function IntegrationsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, organization } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [editingIntegration, setEditingIntegration] = useState<any>(null)

  const {
    data: integrations,
    isLoading,
    refetch,
  } = Api.integration.findMany.useQuery({
    where: { organizationId: params.organizationId },
  })

  const { mutateAsync: createIntegration } =
    Api.integration.create.useMutation()
  const { mutateAsync: updateIntegration } =
    Api.integration.update.useMutation()
  const { mutateAsync: deleteIntegration } =
    Api.integration.delete.useMutation()

  const handleAddIntegration = () => {
    setEditingIntegration(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEditIntegration = (integration: any) => {
    setEditingIntegration(integration)
    form.setFieldsValue(integration)
    setIsModalVisible(true)
  }

  const handleDeleteIntegration = async (id: string) => {
    try {
      await deleteIntegration({ where: { id } })
      enqueueSnackbar('Integration deleted successfully', {
        variant: 'success',
      })
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to delete integration', { variant: 'error' })
    }
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      if (editingIntegration) {
        await updateIntegration({
          where: { id: editingIntegration.id },
          data: values,
        })
        enqueueSnackbar('Integration updated successfully', {
          variant: 'success',
        })
      } else {
        await createIntegration({
          data: {
            ...values,
            organizationId: params.organizationId,
          },
        })
        enqueueSnackbar('Integration added successfully', {
          variant: 'success',
        })
      }
      setIsModalVisible(false)
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to save integration', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <Title level={2}>Integrations</Title>
        <Text>
          Manage your integrations to connect your workflow with external
          services and APIs.
        </Text>

        <Card style={{ marginTop: 24 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddIntegration}
            >
              Add New Integration
            </Button>

            <List
              loading={isLoading}
              dataSource={integrations}
              renderItem={(integration: any) => (
                <List.Item
                  actions={[
                    <Button
                      icon={<EditOutlined />}
                      onClick={() => handleEditIntegration(integration)}
                    >
                      Edit
                    </Button>,
                    <Button
                      icon={<DeleteOutlined />}
                      danger
                      onClick={() => handleDeleteIntegration(integration.id)}
                    >
                      Delete
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={integration.name}
                    description={`Type: ${integration.type}`}
                  />
                </List.Item>
              )}
            />
          </Space>
        </Card>

        <Modal
          title={
            editingIntegration ? 'Edit Integration' : 'Add New Integration'
          }
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={() => setIsModalVisible(false)}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Integration Name"
              rules={[
                {
                  required: true,
                  message: 'Please input the integration name!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="type"
              label="Integration Type"
              rules={[
                {
                  required: true,
                  message: 'Please input the integration type!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="config" label="Configuration">
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
