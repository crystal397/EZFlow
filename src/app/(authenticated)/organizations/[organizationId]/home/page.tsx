'use client'

import { Typography, Card, Row, Col, Statistic, Space } from 'antd'
import {
  DashboardOutlined,
  RocketOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, organization } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: workflows, isLoading: isLoadingWorkflows } =
    Api.workflow.findMany.useQuery({
      where: { organizationId: organization?.id },
      include: { workflowExecutions: true },
    })

  const getTotalExecutions = (workflow: any) => {
    return workflow.workflowExecutions?.length || 0
  }

  const getSuccessRate = (workflow: any) => {
    const totalExecutions = getTotalExecutions(workflow)
    if (totalExecutions === 0) return 0
    const successfulExecutions =
      workflow.workflowExecutions?.filter(
        (execution: any) => execution.status === 'completed',
      ).length || 0
    return (successfulExecutions / totalExecutions) * 100
  }

  const getLastExecutionDate = (workflow: any) => {
    if (
      !workflow.workflowExecutions ||
      workflow.workflowExecutions.length === 0
    )
      return 'N/A'
    const lastExecution = workflow.workflowExecutions.reduce(
      (latest: any, current: any) =>
        dayjs(current.startedAt).isAfter(dayjs(latest.startedAt))
          ? current
          : latest,
    )
    return dayjs(lastExecution.startedAt).format('YYYY-MM-DD HH:mm:ss')
  }

  return (
    <PageLayout layout="full-width">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Title level={2}>
            <DashboardOutlined /> Automation Workflows Dashboard
          </Title>
          <Paragraph>
            Monitor and manage your active workflows and their performance
            metrics.
          </Paragraph>
        </div>

        {isLoadingWorkflows ? (
          <Paragraph>Loading workflows...</Paragraph>
        ) : (
          <Row gutter={[16, 16]} justify="center">
            {workflows?.map(workflow => (
              <Col xs={24} sm={12} md={8} lg={6} key={workflow.id}>
                <Card
                  title={workflow.name}
                  extra={
                    <a
                      onClick={() =>
                        router.push(
                          `/organizations/${organization?.id}/workflows/${workflow.id}/edit`,
                        )
                      }
                    >
                      Edit
                    </a>
                  }
                  hoverable
                >
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: '100%' }}
                  >
                    <Statistic
                      title="Total Executions"
                      value={getTotalExecutions(workflow)}
                      prefix={<RocketOutlined />}
                    />
                    <Statistic
                      title="Success Rate"
                      value={getSuccessRate(workflow)}
                      precision={2}
                      suffix="%"
                      prefix={<CheckCircleOutlined />}
                    />
                    <Statistic
                      title="Last Execution"
                      value={getLastExecutionDate(workflow)}
                      prefix={<ClockCircleOutlined />}
                    />
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Space>
    </PageLayout>
  )
}
