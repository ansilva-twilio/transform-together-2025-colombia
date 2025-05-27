import React, { useState } from 'react';
import { Box, Stack } from '@twilio-paste/core';
import {Theme} from '@twilio-paste/core/theme';
import { LogoTwilioIcon } from '@twilio-paste/icons/esm/LogoTwilioIcon';
import PasswordScreen from './components/PasswordScreen';
import OrderList from './components/OrderList';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Theme.Provider theme="default">
      {!isAuthenticated ? (
        <PasswordScreen onAuthenticated={() => setIsAuthenticated(true)} />
      ) : (
        <Box backgroundColor="colorBackgroundBody" minHeight="100vh">
          <Box
            backgroundColor="colorBackground"
            padding="space60"
            borderBottomWidth="borderWidth10"
            borderBottomStyle="solid"
            borderBottomColor="colorBorderWeaker"
          >
            <Stack orientation="horizontal" spacing="space40" align="center">
              <LogoTwilioIcon
                color="colorTextIcon"
                decorative
                size="sizeIcon60"
              />
              <h1>
                Transform Together 2025 🇨🇴 Colombia
              </h1>
            </Stack>
          </Box>
          <OrderList />
        </Box>
      )}
    </Theme.Provider>
  );
}

export default App;
