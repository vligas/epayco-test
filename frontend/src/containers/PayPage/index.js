import { Step, StepLabel, Stepper } from '@material-ui/core';
import React, { useState } from 'react';
import PayConfirmation from './PayConfirmation';
import PayForm from './PayForm';

export default function PayPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [token, setToken] = useState();
  return (
    <div>
      <Stepper activeStep={activeStep}>
        <Step>
          <StepLabel>Make Payment</StepLabel>
        </Step>
        <Step>
          <StepLabel>Verify Payment</StepLabel>
        </Step>
      </Stepper>
      <div>
        {activeStep === 0 && (
          <PayForm
            onPaymentMade={(token) => {
              setActiveStep(1);
              setToken(token);
            }}
          />
        )}
        {activeStep === 1 && <PayConfirmation token={token} />}
      </div>
    </div>
  );
}
