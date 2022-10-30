import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
    table: {
        marginBottom: '1rem',

        ["td"]: {
            maxWidth: "fit-content",
        }
    },
    actions: {
        display: "flex",
        justifyContent: "end",
        gap: "1rem"
    },
    head: {
        display: 'flex',
        flex: "row wrap",
        alignItems: "center",
        justifyContent: "space-between"
    }

   

}));