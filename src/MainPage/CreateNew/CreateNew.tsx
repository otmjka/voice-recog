import type { FC } from 'react';
import type { CreateNewState } from '../types';
// same as edit 
const CreateNew: FC<{ state: CreateNewState }> = () => {
  return (
    <>
      <Form>
  <FormField
    control={...}
    name="..."
    render={() => (
      <FormItem>
        <FormLabel />
        <FormControl>
          { /* Your form field */}
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    )}
  />
</Form>
    </>
  )
};

export default CreateNew;
