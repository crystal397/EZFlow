'use client'

import { Typography, Card, Row, Col, Statistic, Table, Spin } from 'antd'
import {
  DollarOutlined,
  ThunderboltOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function UsageandBillingPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, organization } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: subscriptions, isLoading: isLoadingSubscriptions } =
    Api.billing.findManySubscriptions.useQuery({})
  const { data: payments, isLoading: isLoadingPayments } =
    Api.billing.findManyPayments.useQuery({})
  const { data: workflowExecutions, isLoading: isLoadingWorkflowExecutions } =
    Api.workflowExecution.findMany.useQuery({
      where: { organizationId: params.organizationId },
      include: { workflow: true },
    })

  const columns = [
    {
      title: 'Workflow Name',
      dataIndex: ['workflow', 'name'],
      key: 'name',
    },
    {
      title: 'Executions',
      dataIndex: 'executionCount',
      key: 'executionCount',
    },
    {
      title: 'Last Execution',
      dataIndex: 'lastExecution',
      key: 'lastExecution',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]

  const workflowStats = workflowExecutions?.reduce(
    (acc, execution) => {
      const workflowId = execution.workflowId
      if (!acc[workflowId]) {
        acc[workflowId] = {
          workflow: execution.workflow,
          executionCount: 0,
          lastExecution: execution.startedAt,
        }
      }
      acc[workflowId].executionCount++
      if (dayjs(execution.startedAt).isAfter(acc[workflowId].lastExecution)) {
        acc[workflowId].lastExecution = execution.startedAt
      }
      return acc
    },
    {} as Record<string, any>,
  )

  const dataSource = Object.values(workflowStats || {})

  const currentSubscription = subscriptions?.[0]
  const latestPayment = payments?.[0]

  if (
    isLoadingSubscriptions ||
    isLoadingPayments ||
    isLoadingWorkflowExecutions
  ) {
    return (
      <PageLayout layout="full-width">
        <Spin size="large" />
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <Title level={2}>Usage and Billing Information</Title>
        <Text>
          View your current usage statistics and manage your subscription.
        </Text>

        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Current Plan"
                value={
                  currentSubscription?.planName || 'No active subscription'
                }
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Billing Period"
                value={
                  currentSubscription
                    ? `${dayjs(currentSubscription.startDate).format('MMM D')} - ${dayjs(currentSubscription.endDate).format('MMM D')}`
                    : 'N/A'
                }
                prefix={<ClockCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Last Payment"
                value={
                  latestPayment
                    ? `${latestPayment.amount} ${latestPayment.currency}`
                    : 'N/A'
                }
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
        </Row>

        <Title level={3} style={{ marginTop: '32px' }}>
          Resource Consumption by Workflow
        </Title>
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey={record => record.workflow.id}
        />
      </div>
    </PageLayout>
  )
}
