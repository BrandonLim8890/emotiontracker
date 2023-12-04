import React from 'react';
import { IconButton, IconButtonProps } from '@chakra-ui/react';
import { useState } from 'react';

type CustomIconButtonProps = IconButtonProps;

export const CustomIconButton: React.FC<CustomIconButtonProps> = ({
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
    <IconButton
      onClick={(e) => handleOnClick(e)}
      isLoading={isLoading}
      {...rest}
    >
      {children}
    </IconButton>
  );
};
