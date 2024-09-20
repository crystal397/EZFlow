'use client'

import { Typography, Card, Row, Col, Button, Modal, Form, Input } from 'antd'
import { PlusOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function TemplatesPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, organization } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  const {
    data: workflows,
    isLoading,
    refetch,
  } = Api.workflow.findMany.useQuery({
    where: { organizationId: params.organizationId },
  })

  const { mutateAsync: createWorkflow } = Api.workflow.create.useMutation()
  const { mutateAsync: deleteWorkflow } = Api.workflow.delete.useMutation()

  const handleSaveAsTemplate = async (values: {
    name: string
    description: string
  }) => {
    try {
      await createWorkflow({
        data: {
          name: values.name,
          description: values.description,
          organizationId: params.organizationId,
        },
      })
      enqueueSnackbar('Template saved successfully', { variant: 'success' })
      setIsModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to save template', { variant: 'error' })
    }
  }

  const handleDeleteTemplate = async (id: string) => {
    try {
      await deleteWorkflow({ where: { id } })
      enqueueSnackbar('Template deleted successfully', { variant: 'success' })
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to delete template', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>Workflow Templates</Title>
        <Text>
          Browse pre-built workflow templates or save your own for future use.
        </Text>

        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          {workflows?.map(workflow => (
            <Col xs={24} sm={12} md={8} lg={6} key={workflow.id}>
              <Card
                title={workflow.name}
                extra={
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteTemplate(workflow.id)}
                    type="text"
                    danger
                  />
                }
                style={{ height: '100%' }}
              >
                <Text>{workflow.description}</Text>
                <Button
                  type="primary"
                  style={{ marginTop: '16px' }}
                  onClick={() =>
                    router.push(
                      `/organizations/${params.organizationId}/workflows/${workflow.id}/edit`,
                    )
                  }
                >
                  Use Template
                </Button>
              </Card>
            </Col>
          ))}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              style={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={() => setIsModalVisible(true)}
            >
              <PlusOutlined style={{ fontSize: '32px' }} />
              <Text style={{ marginTop: '16px' }}>Save New Template</Text>
            </Card>
          </Col>
        </Row>

        <Modal
          title="Save Workflow as Template"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleSaveAsTemplate} layout="vertical">
            <Form.Item
              name="name"
              label="Template Name"
              rules={[
                { required: true, message: 'Please enter a template name' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" icon={<SaveOutlined />} htmlType="submit">
                Save Template
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
