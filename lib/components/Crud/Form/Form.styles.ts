import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
    form: {
        margin: "1rem",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
    },
    input: {
        marginRight: "2rem",
        marginBottom: "1rem",
    },
    fileInput: {
        display: "flex",
        gridTemplateColumns: "1fr",
        margin: "1rem",
    },

}));