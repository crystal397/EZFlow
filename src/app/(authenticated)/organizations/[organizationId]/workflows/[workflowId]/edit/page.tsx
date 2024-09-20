'use client'

import { useState, useEffect } from 'react'
import { Typography, Card, Button, Space, Input, Modal, Form } from 'antd'
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  ArrowsAltOutlined,
} from '@ant-design/icons'
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow'
import 'reactflow/dist/style.css'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function WorkflowEditorPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, organization } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [workflow, setWorkflow] = useState<any>(null)
  const [nodes, setNodes] = useState<any[]>([])
  const [edges, setEdges] = useState<any[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  const {
    data: workflowData,
    isLoading,
    refetch,
  } = Api.workflow.findUnique.useQuery({
    where: { id: params.workflowId },
    include: { workflowSteps: true },
  })

  const { mutateAsync: updateWorkflow } = Api.workflow.update.useMutation()
  const { mutateAsync: createWorkflowStep } =
    Api.workflowStep.create.useMutation()
  const { mutateAsync: updateWorkflowStep } =
    Api.workflowStep.update.useMutation()
  const { mutateAsync: deleteWorkflowStep } =
    Api.workflowStep.delete.useMutation()

  useEffect(() => {
    if (workflowData) {
      setWorkflow(workflowData)
      const newNodes =
        workflowData.workflowSteps?.map((step: any, index: number) => ({
          id: step.id,
          type: 'default',
          data: { label: step.name },
          position: { x: 250, y: index * 100 },
        })) || []
      setNodes(newNodes)

      const newEdges =
        workflowData.workflowSteps
          ?.slice(0, -1)
          .map((step: any, index: number) => ({
            id: `e${step.id}-${workflowData.workflowSteps[index + 1].id}`,
            source: step.id,
            target: workflowData.workflowSteps[index + 1].id,
            type: 'smoothstep',
          })) || []
      setEdges(newEdges)
    }
  }, [workflowData])

  const handleAddStep = () => {
    setIsModalVisible(true)
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      const newStep = await createWorkflowStep({
        data: {
          name: values.name,
          description: values.description,
          order: workflow.workflowSteps?.length || 0,
          workflowId: workflow.id,
        },
      })
      enqueueSnackbar('Step added successfully', { variant: 'success' })
      setIsModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to add step', { variant: 'error' })
    }
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleDeleteStep = async (stepId: string) => {
    try {
      await deleteWorkflowStep({ where: { id: stepId } })
      enqueueSnackbar('Step deleted successfully', { variant: 'success' })
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to delete step', { variant: 'error' })
    }
  }

  if (isLoading) {
    return <PageLayout layout="full-width">Loading...</PageLayout>
  }

  return (
    <PageLayout layout="full-width">
      <Card>
        <Title level={2}>Workflow Editor</Title>
        <Paragraph>
          Design and edit your automation workflow visually.
        </Paragraph>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            value={workflow?.name}
            onChange={e => setWorkflow({ ...workflow, name: e.target.value })}
            onBlur={() =>
              updateWorkflow({
                where: { id: workflow.id },
                data: { name: workflow.name },
              })
            }
            style={{ marginBottom: 16 }}
          />
          <Button icon={<PlusOutlined />} onClick={handleAddStep}>
            Add Step
          </Button>
          <div style={{ height: 500, border: '1px solid #ddd' }}>
            <ReactFlow nodes={nodes} edges={edges} fitView>
              <Background />
              <Controls />
              <MiniMap />
            </ReactFlow>
          </div>
          {workflow?.workflowSteps?.map((step: any) => (
            <Card key={step.id} style={{ marginTop: 16 }}>
              <Space>
                <EditOutlined />
                <Input
                  value={step.name}
                  onChange={e => {
                    const updatedSteps = workflow.workflowSteps.map((s: any) =>
                      s.id === step.id ? { ...s, name: e.target.value } : s,
                    )
                    setWorkflow({ ...workflow, workflowSteps: updatedSteps })
                  }}
                  onBlur={() =>
                    updateWorkflowStep({
                      where: { id: step.id },
                      data: { name: step.name },
                    })
                  }
                />
                <ArrowsAltOutlined />
                <DeleteOutlined
                  onClick={() => handleDeleteStep(step.id)}
                  style={{ color: 'red' }}
                />
              </Space>
            </Card>
          ))}
        </Space>
      </Card>
      <Modal
        title="Add Workflow Step"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Step Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
