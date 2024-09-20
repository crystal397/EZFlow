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
  PlusOutlined,
  CalendarOutlined,
  HistoryOutlined,
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

export default function SchedulerPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, organization } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  const { data: workflows, isLoading: isLoadingWorkflows } =
    Api.workflow.findMany.useQuery({
      where: { organizationId: params.organizationId },
    })

  const {
    data: scheduledExecutions,
    isLoading: isLoadingExecutions,
    refetch,
  } = Api.workflowExecution.findMany.useQuery({
    where: {
      workflowId: { in: workflows?.map(w => w.id) },
      status: 'SCHEDULED',
    },
    include: { workflow: true },
  })

  const { mutateAsync: createExecution } =
    Api.workflowExecution.create.useMutation()

  const handleSchedule = async (values: any) => {
    try {
      await createExecution({
        data: {
          status: 'SCHEDULED',
          startedAt: values.scheduledTime.toISOString(),
          workflowId: values.workflowId,
          userId: user!.id,
        },
      })
      enqueueSnackbar('Workflow scheduled successfully', { variant: 'success' })
      setIsModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to schedule workflow', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Workflow',
      dataIndex: ['workflow', 'name'],
      key: 'workflow',
    },
    {
      title: 'Scheduled Time',
      dataIndex: 'startedAt',
      key: 'startedAt',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>Workflow Scheduler</Title>
        <Paragraph>
          Schedule your workflows to run at specific times or intervals and
          manage all scheduled executions.
        </Paragraph>

        <Space style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Schedule New Workflow
          </Button>
          <Button
            icon={<HistoryOutlined />}
            onClick={() =>
              router.push(`/organizations/${params.organizationId}/workflows`)
            }
          >
            View All Workflows
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={scheduledExecutions}
          loading={isLoadingExecutions || isLoadingWorkflows}
          rowKey="id"
        />

        <Modal
          title="Schedule Workflow"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleSchedule} layout="vertical">
            <Form.Item
              name="workflowId"
              label="Select Workflow"
              rules={[{ required: true, message: 'Please select a workflow' }]}
            >
              <Select>
                {workflows?.map(workflow => (
                  <Select.Option key={workflow.id} value={workflow.id}>
                    {workflow.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="scheduledTime"
              label="Scheduled Time"
              rules={[{ required: true, message: 'Please select a time' }]}
            >
              <DatePicker showTime />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<CalendarOutlined />}
              >
                Schedule
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
