import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Heading, IconButton, Text, useDisclosure
} from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import EmotionForm from '../components/EmotionForm';
import Layout from '../components/Layout';
import prisma from '../lib/prisma';

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

export type Entry = {
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
  const { isOpen, onOpen, onClose: onDisclosureClose } = useDisclosure();
  const [entryToEdit, setEntryToEdit] = useState<Entry | undefined>(undefined);

  const handleEditEntry = (entry: Entry) => {
    setEntryToEdit(entry);
    onOpen();
  };

  const onClose = () => {
    setEntryToEdit(undefined);
    onDisclosureClose();
  }

  return (
    <>
      <Layout onOpen={onOpen}>
        <Box pt='6rem' px='5%'>
          <Heading as='h2' size='xl' mb='1rem'>
            Entries
          </Heading>
          <Accordion allowMultiple>
            {entries.map((entry) => (
              <AccordionItem key={entry.id} my='1.5'>
                <AccordionButton justifyContent='space-between'>
                  <Heading size='md'>{entry.emotion}</Heading>
                  <Flex textAlign='left' align='center'>
                    <Text fontSize='xs' color='gray.500'>
                      {new Date(entry.updatedAt).toLocaleDateString()}
                    </Text>
                    <AccordionIcon ml='1rem' />
                  </Flex>
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Box>
                    <Text fontSize='md'>{entry.content}</Text>
                    <Flex width='100%' justifyContent='end'>
                      <IconButton
                        aria-label='Edit Entry'
                        size='sm'
                        icon={<EditIcon />}
                        mr='2'
                        variant='ghost'
                        onClick={() => handleEditEntry(entry)}
                      >
                        Edit
                      </IconButton>
                      <IconButton
                        aria-label='Delete Entry'
                        size='sm'
                        icon={<DeleteIcon />}
                        colorScheme='red'
                        variant='outline'
                      />
                    </Flex>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
      </Layout>
      <EmotionForm entryToEdit={entryToEdit} onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default EmotionTracker;
