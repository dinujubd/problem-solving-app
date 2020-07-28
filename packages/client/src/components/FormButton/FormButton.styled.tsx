import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';

export const FormButton: React.FunctionComponent<ButtonProps> = styled(Button)`
  margin-right: 8px;
`;