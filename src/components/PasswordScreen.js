import React, { useState } from 'react';
import {
  Box,
  Button,
  Form,
  FormControl,
  Input,
  Heading,
  Stack,
  Alert,
  Label
} from '@twilio-paste/core';
import { LogoTwilioIcon } from '@twilio-paste/icons/esm/LogoTwilioIcon';

const PasswordScreen = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simple frontend check
    if (password === process.env.REACT_APP_PASSWORD) {
      onAuthenticated();
    } else {
      setError('Contraseña incorrecta');
    }
    setIsLoading(false);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      backgroundColor="colorBackgroundBody"
    >
      <Box
        width="400px"
        padding="space60"
        backgroundColor="colorBackground"
        borderRadius="borderRadius30"
        boxShadow="shadowCard"
      >
        <Stack spacing="space60">
          <Heading as="h3" variant="heading20">
            <Stack orientation='horizontal' spacing='space30'>
              <LogoTwilioIcon
                color="colorTextIcon"
                decorative
                size="sizeIcon60" />
              <span>
                Transform Together 2025
              </span>
            </Stack>
          </Heading>
          {error && (
            <Alert variant="error">
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Stack spacing="space50">
              <FormControl>
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete='new-password'
                  required
                />
              </FormControl>
              <span>&nbsp;</span>
              <Button
                variant="primary"
                type="submit"
                loading={isLoading}
                fullWidth
              >
                Ingresar
              </Button>
            </Stack>
          </Form>
        </Stack>
      </Box>
    </Box>
  );
};

export default PasswordScreen; 