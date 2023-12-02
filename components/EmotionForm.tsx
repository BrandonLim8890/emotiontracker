import {
  Box,
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
import React, { useRef, useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  prevEmotionValue?: string;
  prevContentValue?: string;
};

const EmotionForm: React.FC<Props> = ({
  isOpen,
  onClose,
  prevContentValue,
  prevEmotionValue,
}) => {
  const [emotion, setEmotion] = useState(prevEmotionValue);
  const [content, setContent] = useState(prevContentValue);
  const firstField = useRef();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { emotion, content };
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      setContent('');
      setEmotion('');
      onClose();
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
