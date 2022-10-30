import { Divider, Group, Text } from '@mantine/core';
import * as React from 'react';
import createStyles from './Footer.styles';
import { Contacts } from "./Contacts";



export default function Footer({ contact, children, className }: { contact?: boolean, children?: React.ReactNode, className?: string }) {
  const { classes } = createStyles();


  return (
    <>

      <Divider size="md" variant="dashed" />
      <Group p={40} className={className + " " + classes.footer} aria-label="footer">
        {contact &&
          <Group position="right">
            <Contacts />
          </Group>
        }
        {children}
        <Group position="left" styles={{ width: "100%" }} >
          <Text size="xs"> © Copyright 2022. Made by Ederhy Bastien  </Text>
        </Group>
      </Group>


    </>
  );
}