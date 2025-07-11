import { useState } from 'react'
import { PrimaryButton, Separator, mergeStyleSets } from '@fluentui/react'
import { RegistrationPanel } from './components/RegistrationPanel.tsx';
import { initializeIcons } from '@fluentui/font-icons-mdl2';

const styles = mergeStyleSets({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    justifyContent: 'flex-start',
    paddingTop: '10vh',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
  }
});


function App() {
  initializeIcons();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <>
      <div className={styles.root}>
        <h1>Register Form</h1>
        <PrimaryButton id='openPanelButton' text="Register New Users" onClick={() => { setIsPanelOpen(true) }} />
      </div>
      <RegistrationPanel isPanelOpen={isPanelOpen} onDismiss={() => { setIsPanelOpen(false) }} />
      <Separator />
    </>
  )
}

export default App
