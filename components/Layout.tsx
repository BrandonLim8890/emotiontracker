import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import Header from './Header';

type Props = {
  onOpen: () => void;
  children: ReactNode;
};

const Layout: React.FC<Props> = ({onOpen, children}) => (
  <Box>
    <Header onOpen={onOpen} />
    {children}
  </Box>
);

export default Layout;
