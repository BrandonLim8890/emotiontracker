import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Button, Flex, Heading, Link } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

interface HeaderProps {
  onOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpen }) => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  let left = (
    <Flex>
      <NextLink href='/' passHref>
        <Link>
          <Heading as='h1' size='2xl' data-active={isActive('/')}>
            Emotion Tracker
          </Heading>
        </Link>
      </NextLink>
    </Flex>
  );

  let right = (
    <Button onClick={onOpen}>
      <AddIcon />
    </Button>
  );

  return (
    <div>
      <Flex
        position='fixed'
        top='0'
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
        p='5% 5%'
        zIndex={1}
        w='100%'
        background='white'
      >
        {left}
        {right}
      </Flex>
    </div>
  );
};

export default Header;
