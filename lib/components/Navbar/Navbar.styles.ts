import { createStyles } from '@mantine/core';


export default createStyles((theme) => ({
    navbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "flex-end",
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        padding: "0 clamp(2rem,1rem + 5vw, 5rem)",
    },
    homeButton: {
        color: theme.colorScheme === "light" ? theme.black : theme.white,
        marginRight: "auto",

    },
    link: {
        color: theme.colorScheme === "light" ? theme.black : theme.white
    },

}));