import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  IconButton,
  Spinner,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import EmotionForm from '../components/EmotionForm';
import Layout from '../components/Layout';


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

const EmotionTracker: React.FC = () => {
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [isLoading, setLoading] = useState(true);

  const { isOpen, onOpen, onClose: onDisclosureClose } = useDisclosure();
  const [entryToEdit, setEntryToEdit] = useState<Entry | undefined>(undefined);

  const fetchData = async () => {
    const res = await fetch(`/api/entry`, {
      method: 'GET',
    });
    const data = await res.json();
    setEntries(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditEntry = (entry: Entry) => {
    setEntryToEdit(entry);
    onOpen();
  };

  const handleDeleteEntry = async (entryId: string) => {
    await fetch(`/api/entry/${entryId}`, {
      method: 'DELETE'
    })
    await fetchData();
  }

  const onClose = () => {
    setEntryToEdit(undefined);
    fetchData();
    onDisclosureClose();
  };

  if (isLoading) {
    return <Spinner />;
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
                        onClick={() => handleDeleteEntry(entry.id)}
                      />
                    </Flex>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
      </Layout>
      <EmotionForm
        entryToEdit={entryToEdit}
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
};

export default EmotionTracker;
