'use client'

import { Typography, Space, Card } from 'antd'
import { InfoCircleOutlined, RocketOutlined } from '@ant-design/icons'
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
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  return (
    <PageLayout layout="full-width">
      <Space
        direction="vertical"
        size="large"
        style={{ width: '100%', maxWidth: 800, margin: '0 auto' }}
      >
        <Title level={1} style={{ textAlign: 'center' }}>
          Welcome to Our Application
        </Title>
        <Paragraph style={{ textAlign: 'center', fontSize: '18px' }}>
          We're excited to have you here! Let's get you started with how our
          application works.
        </Paragraph>

        <Card
          title={
            <>
              <InfoCircleOutlined /> How It Works
            </>
          }
          style={{ width: '100%' }}
        >
          <Space direction="vertical" size="middle">
            <Paragraph>
              Our application is designed to streamline your workflow and boost
              productivity. Here's a quick overview:
            </Paragraph>
            <ol>
              <li>Create and manage workflows</li>
              <li>Integrate with various tools and services</li>
              <li>Monitor and analyze your workflow executions</li>
              <li>Manage your data storage</li>
              <li>Schedule tasks and automate processes</li>
            </ol>
            <Paragraph>
              Each feature is designed to work seamlessly together, providing
              you with a powerful toolkit for your business needs.
            </Paragraph>
          </Space>
        </Card>

        <Card
          title={
            <>
              <RocketOutlined /> Getting Started
            </>
          }
          style={{ width: '100%' }}
        >
          <Space direction="vertical" size="middle">
            <Paragraph>To begin using our application:</Paragraph>
            <ol>
              <li>Explore the different sections using the navigation menu</li>
              <li>Create your first workflow in the Workflows section</li>
              <li>Set up integrations with your favorite tools</li>
              <li>Monitor your workflow executions and optimize as needed</li>
            </ol>
            <Paragraph>
              Don't hesitate to reach out if you need any assistance along the
              way!
            </Paragraph>
          </Space>
        </Card>

        <Paragraph style={{ textAlign: 'center' }}>
          Ready to get started? Click on any menu item to begin exploring our
          features!
        </Paragraph>
      </Space>
    </PageLayout>
  )
}
