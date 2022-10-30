import { Anchor, createStyles } from '@mantine/core';
import { Group } from '@mantine/core';
import { IoLogoGithub } from 'react-icons/io';
import { BsLinkedin, BsFillTelephoneFill } from 'react-icons/bs';
import { GrMail } from 'react-icons/gr';
import * as React from 'react';



const style = createStyles((theme) => ({
    icon: {
        color: theme.colorScheme === "light" ? theme.black : theme.white,
    },

}));

export function Contacts() {
    const { classes } = style();
    return (
        <>
            <Group spacing="xl" aria-label="social links">
                <Anchor className={classes.icon} href="https://github.com/EkawaD"><IoLogoGithub size="1.5em" /></Anchor>
                <Anchor className={classes.icon} href="https://www.linkedin.com/in/bastien-ederhy/"><BsLinkedin size="1.3em" /></Anchor>
                <Anchor className={classes.icon} href={`mailto:ederhy.bastien@gmail.com`}><GrMail size="1.4em" /></Anchor>
                <Anchor className={classes.icon} href={`tel:085804336`}><BsFillTelephoneFill size="1.2em" /></Anchor>
            </Group>
        </>
    );

}