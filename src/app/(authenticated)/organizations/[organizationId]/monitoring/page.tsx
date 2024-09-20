'use client'

import {
  Typography,
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Select,
} from 'antd'
import { ExclamationCircleOutlined, BellOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function MonitoringPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, organization } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [alertModalVisible, setAlertModalVisible] = useState(false)
  const [form] = Form.useForm()

  const {
    data: workflowExecutions,
    isLoading,
    refetch,
  } = Api.workflowExecution.findMany.useQuery({
    where: { workflowId: { in: organization?.workflows?.map(w => w.id) } },
    include: { workflow: true },
    orderBy: { dateCreated: 'desc' },
  })

  const { mutateAsync: createAlert } = Api.workflow.update.useMutation()

  useEffect(() => {
    const interval = setInterval(() => {
      refetch()
    }, 30000) // Refresh every 30 seconds

    return () => clearInterval(interval)
  }, [refetch])

  const columns = [
    {
      title: 'Workflow Name',
      dataIndex: ['workflow', 'name'],
      key: 'workflowName',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Text
          style={{
            color:
              status === 'COMPLETED'
                ? 'green'
                : status === 'FAILED'
                  ? 'red'
                  : 'orange',
          }}
        >
          {status}
        </Text>
      ),
    },
    {
      title: 'Started At',
      dataIndex: 'startedAt',
      key: 'startedAt',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Completed At',
      dataIndex: 'completedAt',
      key: 'completedAt',
      render: (date: string) =>
        date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : '-',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            icon={<BellOutlined />}
            onClick={() => showAlertModal(record.workflow.id)}
          >
            Set Alert
          </Button>
        </Space>
      ),
    },
  ]

  const showAlertModal = (workflowId: string) => {
    form.setFieldsValue({ workflowId })
    setAlertModalVisible(true)
  }

  const handleAlertSubmit = async (values: any) => {
    try {
      await createAlert({
        where: { id: values.workflowId },
        data: {
          // This is a simplified example. In a real scenario, you'd need to implement
          // a more complex alert system, possibly with a separate 'alerts' model
          description: `Alert: ${values.condition} ${values.value}`,
        },
      })
      enqueueSnackbar('Alert set successfully', { variant: 'success' })
      setAlertModalVisible(false)
      form.resetFields()
    } catch (error) {
      enqueueSnackbar('Failed to set alert', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <Space
        direction="vertical"
        size="large"
        style={{ width: '100%', padding: '24px' }}
      >
        <Title level={2}>Workflow Monitoring</Title>
        <Text>
          View real-time status of your running workflows and set up alerts for
          specific conditions.
        </Text>

        <Table
          columns={columns}
          dataSource={workflowExecutions}
          loading={isLoading}
          rowKey="id"
        />

        <Modal
          title="Set Alert"
          visible={alertModalVisible}
          onCancel={() => setAlertModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleAlertSubmit}>
            <Form.Item name="workflowId" hidden>
              <Input />
            </Form.Item>
            <Form.Item
              name="condition"
              label="Condition"
              rules={[{ required: true, message: 'Please select a condition' }]}
            >
              <Select>
                <Select.Option value="status">Status</Select.Option>
                <Select.Option value="duration">Duration</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="value"
              label="Value"
              rules={[{ required: true, message: 'Please enter a value' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Set Alert
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Space>
    </PageLayout>
  )
}
