
import * as React from "react";
import { UseFormReturnType } from '@mantine/form';
import { Button } from '@mantine/core';

import createStyles from './Form.styles';

type FormType = {
  form: UseFormReturnType<any>,
  handler: (values: any) => Promise<void>,
  children?: React.ReactNode
  className?: string,
}

export default function Form({ form, handler, children, className }: FormType) {

  const { classes } = createStyles();


  return (
    <>

      <form onSubmit={form.onSubmit((values: any) => handler(values))} className={className + " " + classes.form} >
        {children}
        <Button type="submit">Valider</Button>
      </form>

    </>
  );
}