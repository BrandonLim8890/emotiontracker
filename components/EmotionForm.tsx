import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { Entry } from '../pages';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  entryToEdit?: Entry;
};

const EmotionForm: React.FC<Props> = ({ isOpen, onClose, entryToEdit }) => {
  const [emotion, setEmotion] = useState('');
  const [content, setContent] = useState('');
  const firstField = useRef();

  useEffect(() => {
    if (entryToEdit) {
      setEmotion(entryToEdit.emotion);
      setContent(entryToEdit.content);
    } else {
      setEmotion('');
      setContent('');
    }
  }, [entryToEdit, isOpen]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (entryToEdit) {
      updateEntry();
    } else {
      postNewEntry();
    }
    setContent('');
    setEmotion('');
    onClose();
  };

  const updateEntry = async () => {
    try {
      const body = { emotion, content, id: entryToEdit.id };
      await fetch('/api/entry', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const postNewEntry = async () => {
    try {
      const body = { emotion, content };
      await fetch('/api/entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement='bottom'
      initialFocusRef={firstField}
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth='1px'>Log a new emotion</DrawerHeader>

        <DrawerBody>
          <Stack spacing='2rem'>
            <FormControl isRequired>
              <FormLabel htmlFor='emotion'>Emotion</FormLabel>
              <Input
                ref={firstField}
                value={emotion}
                onChange={(e) => setEmotion(e.target.value)}
                id='emotion'
                placeholder='Enter the emotion you felt'
              />
            </FormControl>
            <FormControl>
              <FormLabel>What happened?</FormLabel>
              <Textarea
                placeholder='I remember feeling...'
                resize='none'
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </FormControl>
          </Stack>
        </DrawerBody>
        <DrawerFooter borderTopWidth='1px'>
          <Button variant='outline' mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default EmotionForm;
