'use client'

import { Typography, Table, Space, Button, Modal } from 'antd'
import { HistoryOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function WorkflowExecutionHistoryPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [selectedExecution, setSelectedExecution] = useState<string | null>(
    null,
  )

  const { data: workflow, isLoading: isWorkflowLoading } =
    Api.workflow.findUnique.useQuery({
      where: { id: params.workflowId },
      include: { workflowExecutions: true },
    })

  const { data: selectedExecutionData, isLoading: isExecutionLoading } =
    Api.workflowExecution.findUnique.useQuery({
      where: { id: selectedExecution ?? '' },
      enabled: !!selectedExecution,
    })

  const columns = [
    {
      title: 'Execution ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Started At',
      dataIndex: 'startedAt',
      key: 'startedAt',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Completed At',
      dataIndex: 'completedAt',
      key: 'completedAt',
      render: (text: string) =>
        text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : 'N/A',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Button onClick={() => setSelectedExecution(record.id)}>
          View Details
        </Button>
      ),
    },
  ]

  const handleCloseModal = () => {
    setSelectedExecution(null)
  }

  if (isWorkflowLoading) {
    return <PageLayout layout="full-width">Loading...</PageLayout>
  }

  return (
    <PageLayout layout="full-width">
      <Space
        direction="vertical"
        size="large"
        style={{ width: '100%', maxWidth: 1200, margin: '0 auto' }}
      >
        <Title level={2}>
          <HistoryOutlined /> Workflow Execution History
        </Title>
        <Text>View and analyze the execution history of your workflow.</Text>

        <Title level={4}>Workflow: {workflow?.name}</Title>

        <Table
          dataSource={workflow?.workflowExecutions}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />

        <Modal
          title="Execution Details"
          open={!!selectedExecution}
          onCancel={handleCloseModal}
          footer={null}
          width={800}
        >
          {isExecutionLoading ? (
            <div>Loading execution details...</div>
          ) : (
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Text strong>Execution ID: {selectedExecutionData?.id}</Text>
              <Text strong>Status: {selectedExecutionData?.status}</Text>
              <Text strong>
                Started At:{' '}
                {dayjs(selectedExecutionData?.startedAt).format(
                  'YYYY-MM-DD HH:mm:ss',
                )}
              </Text>
              <Text strong>
                Completed At:{' '}
                {selectedExecutionData?.completedAt
                  ? dayjs(selectedExecutionData.completedAt).format(
                      'YYYY-MM-DD HH:mm:ss',
                    )
                  : 'N/A'}
              </Text>

              <Title level={5}>Logs:</Title>
              <Text>
                {selectedExecutionData?.status === 'FAILED' ? (
                  <Space>
                    <ExclamationCircleOutlined style={{ color: 'red' }} />
                    Error: The workflow execution failed. Please check your
                    workflow configuration and try again.
                  </Space>
                ) : (
                  'Execution completed successfully. No errors or warnings to display.'
                )}
              </Text>
            </Space>
          )}
        </Modal>
      </Space>
    </PageLayout>
  )
}
