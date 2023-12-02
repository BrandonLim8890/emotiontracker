import React from 'react';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import prisma from '../lib/prisma';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  Box,
  Text,
  Heading,
  Flex,
  AccordionIcon,
  AccordionPanel,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import EmotionForm from '../components/EmotionForm';

export const getStaticProps: GetStaticProps = async () => {
  const entries = await prisma.entry.findMany({
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return {
    props: {
      entries: entries
        .map((entry) => ({
          ...entry,
          createdAt: JSON.parse(JSON.stringify(entry.createdAt)),
          updatedAt: JSON.parse(JSON.stringify(entry.updatedAt)),
        }))
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        ),
    },
    revalidate: 10,
  };
};

type Entry = {
  id: string;
  emotion: string;
  author: {
    name: string;
    email: string;
  } | null;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
};

type Props = {
  entries: Entry[];
};

const EmotionTracker: React.FC<Props> = ({ entries }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Layout onOpen={onOpen}>
        <Box pt='6rem' px='5%'>
          <Heading as='h2' size='xl' mb='1rem'>
            Entries
          </Heading>
          <Accordion allowMultiple>
            {entries.map((entry) => (
              <AccordionItem key={entry.id} py='1.5'>
                <AccordionButton justifyContent='space-between'>
                  <Heading size='md'>{entry.emotion}</Heading>
                  <Flex textAlign='left' align='center'>
                    <Text fontSize='xs' color='gray.500'>
                      {new Date(entry.updatedAt).toLocaleDateString()}
                    </Text>
                    <AccordionIcon ml='1rem' />
                  </Flex>
                </AccordionButton>
                <AccordionPanel pb={4}>{entry.content}</AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
      </Layout>
      <EmotionForm onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default EmotionTracker;
