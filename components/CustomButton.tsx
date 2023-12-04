import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { useState } from 'react';

type CustomButtonProps = ButtonProps;

export const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  children,
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsLoading(true);
    await onClick(e);
    setIsLoading(false);
  };

  return (
    <Button onClick={(e) => handleOnClick(e)} isLoading={isLoading} {...rest}>
      {children}
    </Button>
  );
};
