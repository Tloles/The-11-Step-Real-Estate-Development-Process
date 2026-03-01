import { ProjectProvider, useProject } from './state/ProjectContext.jsx'
import Header from './components/layout/Header.jsx'
import StepNavigator from './components/layout/StepNavigator.jsx'
import FinancialModelPanel from './components/layout/FinancialModelPanel.jsx'
import Step1Inception from './components/steps/Step1Inception.jsx'
import Step2Refinement from './components/steps/Step2Refinement.jsx'
import Step3Feasibility from './components/steps/Step3Feasibility.jsx'
import Step4Contracts from './components/steps/Step4Contracts.jsx'
import Step5Financing from './components/steps/Step5Financing.jsx'
import Step6Closing from './components/steps/Step6Closing.jsx'
import Step7Construction from './components/steps/Step7Construction.jsx'
import Step8Completion from './components/steps/Step8Completion.jsx'
import Step9Management from './components/steps/Step9Management.jsx'
import Step10Stabilization from './components/steps/Step10Stabilization.jsx'
import Step11Exit from './components/steps/Step11Exit.jsx'

const stepComponents = {
  1: Step1Inception,
  2: Step2Refinement,
  3: Step3Feasibility,
  4: Step4Contracts,
  5: Step5Financing,
  6: Step6Closing,
  7: Step7Construction,
  8: Step8Completion,
  9: Step9Management,
  10: Step10Stabilization,
  11: Step11Exit,
}

function AppContent() {
  const { currentStep } = useProject()
  const StepComponent = stepComponents[currentStep] || Step1Inception

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      <Header />
      <StepNavigator />
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-6 py-6">
        <StepComponent />
      </main>
      <FinancialModelPanel />
    </div>
  )
}

export default function App() {
  return (
    <ProjectProvider>
      <AppContent />
    </ProjectProvider>
  )
}
