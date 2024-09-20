'use client'
import { LandingCTA } from '@/designSystem/landing/LandingCTA'
import { LandingContainer } from '@/designSystem/landing/LandingContainer'
import LandingFAQ from '@/designSystem/landing/LandingFAQ'
import { LandingFeatures } from '@/designSystem/landing/LandingFeatures'
import { LandingHero } from '@/designSystem/landing/LandingHero'
import { LandingHowItWorks } from '@/designSystem/landing/LandingHowItWorks'
import { LandingPainPoints } from '@/designSystem/landing/LandingPainPoints'
import { LandingPricing } from '@/designSystem/landing/LandingPricing'
import { LandingSocialProof } from '@/designSystem/landing/LandingSocialProof'
import { LandingSocialRating } from '@/designSystem/landing/LandingSocialRating'
import { LandingTestimonials } from '@/designSystem/landing/LandingTestimonials'
import {
  RobotOutlined,
  ThunderboltOutlined,
  DollarOutlined,
  SafetyOutlined,
  RocketOutlined,
  ApiOutlined,
} from '@ant-design/icons'

export default function LandingPage() {
  const features = [
    {
      heading: `Intelligent Automation`,
      description: `Leverage AI-powered bots to automate complex workflows with ease.`,
      icon: <RobotOutlined />,
    },
    {
      heading: `Lightning-Fast Execution`,
      description: `Accelerate your processes with our high-performance automation engine.`,
      icon: <ThunderboltOutlined />,
    },
    {
      heading: `Cost-Effective Solution`,
      description: `Reduce operational costs by up to 90% with our efficient RPA platform.`,
      icon: <DollarOutlined />,
    },
    {
      heading: `Enhanced Compliance`,
      description: `Ensure regulatory compliance with automated audit trails and error-free processes.`,
      icon: <SafetyOutlined />,
    },
    {
      heading: `Scalable Architecture`,
      description: `Grow your automation initiatives seamlessly with our cloud-based platform.`,
      icon: <RocketOutlined />,
    },
    {
      heading: `Extensive Integrations`,
      description: `Connect with 1000+ apps and services for comprehensive process automation.`,
      icon: <ApiOutlined />,
    },
  ]

  const testimonials = [
    {
      name: `Sarah Johnson`,
      designation: `CFO, TechInnovate Inc.`,
      content: `EzFlow has revolutionized our financial processes. We've cut our month-end closing time by 70% and eliminated data entry errors completely.`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `Michael Chen`,
      designation: `Operations Manager, GlobalHealth`,
      content: `With EzFlow, we've automated patient data management, reducing processing time by 85% and improving patient satisfaction scores.`,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      name: `Emily Rodriguez`,
      designation: `HR Director, FutureRetail`,
      content: `EzFlow has transformed our HR operations. Onboarding time has been cut in half, and we've saved thousands of hours on payroll processing.`,
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    },
  ]

  const navItems = [
    {
      title: `Features`,
      link: `#features`,
    },
    {
      title: `Pricing`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]

  const packages = [
    {
      title: `Starter`,
      description: `Perfect for small businesses looking to automate basic processes`,
      monthly: 199,
      yearly: 1990,
      features: [
        `Up to 5 automated processes`,
        `1000 task executions/month`,
        `Email support`,
      ],
    },
    {
      title: `Professional`,
      description: `Ideal for growing companies with complex automation needs`,
      monthly: 499,
      yearly: 4990,
      features: [
        `Unlimited automated processes`,
        `10,000 task executions/month`,
        `24/7 priority support`,
        `Advanced analytics`,
      ],
      highlight: true,
    },
    {
      title: `Enterprise`,
      description: `Tailored solutions for large-scale automation requirements`,
      monthly: 999,
      yearly: 9990,
      features: [
        `Custom task execution limits`,
        `Dedicated account manager`,
        `On-premise deployment option`,
        `Custom integrations`,
      ],
    },
  ]

  const questionAnswers = [
    {
      question: `What is Robotic Process Automation (RPA)?`,
      answer: `RPA is a technology that uses software robots to automate repetitive, rule-based tasks typically performed by humans. It can interact with digital systems just like a human would, but with greater speed, accuracy, and consistency.`,
    },
    {
      question: `How does EzFlow differ from traditional automation tools?`,
      answer: `EzFlow combines the power of RPA with an intuitive, no-code interface, making it accessible to both technical and non-technical users. Our AI-powered bots can handle complex decision-making, setting us apart from basic automation tools.`,
    },
    {
      question: `Can EzFlow integrate with my existing systems?`,
      answer: `Absolutely! EzFlow is designed to work seamlessly with a wide range of applications and systems. We offer over 1000 pre-built integrations and the ability to create custom connections for your unique needs.`,
    },
    {
      question: `How quickly can I see ROI with EzFlow?`,
      answer: `Many of our customers see significant ROI within the first 3-6 months of implementation. The exact timeline can vary based on the complexity of your processes, but our team works closely with you to ensure rapid value realization.`,
    },
  ]

  const logos = [
    { url: 'https://i.imgur.com/afwBIFK.png' },
    { url: 'https://i.imgur.com/LlloOPa.png' },
    { url: 'https://i.imgur.com/j8jPb4H.png' },
    { url: 'https://i.imgur.com/mJ1sZFv.png' },
  ]

  const steps = [
    {
      heading: `Map Your Process`,
      description: `Use our intuitive drag-and-drop interface to visually map out your business process.`,
    },
    {
      heading: `Configure Automation`,
      description: `Set up triggers, actions, and decision points with our no-code tools.`,
    },
    {
      heading: `Test and Refine`,
      description: `Run simulations to ensure your automation works flawlessly before deployment.`,
    },
    {
      heading: `Deploy and Monitor`,
      description: `Launch your automation and track its performance with real-time analytics.`,
    },
  ]

  const painPoints = [
    {
      emoji: `🕒`,
      title: `Time-consuming manual tasks draining resources`,
    },
    {
      emoji: `❌`,
      title: `Errors in data entry leading to costly mistakes`,
    },
    {
      emoji: `💸`,
      title: `High operational costs eating into profits`,
    },
  ]

  const avatarItems = [
    {
      src: 'https://randomuser.me/api/portraits/men/51.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/9.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/52.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Unleash Your Business Potential with Intelligent Automation`}
        subtitle={`EzFlow: The No-Code RPA Platform That Transforms Manual Tasks into Effortless Workflows`}
        buttonText={`Start Automating Now`}
        pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/jqWtYa-ezflow-GwvK`}
        socialProof={
          <LandingSocialRating
            avatarItems={avatarItems}
            numberOfUsers={1000}
            suffixText={`from happy automation pioneers`}
          />
        }
      />
      <LandingSocialProof logos={logos} title={`Trusted by Industry Leaders`} />
      <LandingPainPoints
        title={`The Hidden Costs of Manual Processes: 45% of Work Activities Can Be Automated, Saving Up to $2 Trillion Annually`}
        painPoints={painPoints}
      />
      <LandingHowItWorks title={`Automate in 4 Simple Steps`} steps={steps} />
      <LandingFeatures
        id="features"
        title={`Empower Your Business with Cutting-Edge Automation`}
        subtitle={`Discover how EzFlow's powerful features can transform your operations and drive unprecedented efficiency`}
        features={features}
      />
      <LandingTestimonials
        title={`Real Businesses, Real Results`}
        subtitle={`See how EzFlow is helping companies across industries achieve their automation dreams`}
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title={`Invest in Efficiency, Scale Your Success`}
        subtitle={`Choose the plan that fits your automation needs and watch your ROI soar`}
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title={`Your Automation Questions, Answered`}
        subtitle={`Get the clarity you need to start your RPA journey with confidence`}
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title={`Ready to Revolutionize Your Business Processes?`}
        subtitle={`Join thousands of forward-thinking companies already benefiting from EzFlow's intelligent automation.`}
        buttonText={`Start Your Free Trial`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}
