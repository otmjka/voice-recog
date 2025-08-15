'use client';
import { useId, type FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

import type { CreateNewState } from '../types';
import generateNewTitle from './generateNewTitle';
import TokensForm from './TokensForm';
import type { AddMemoFormValue } from '@/types';
import { createNewMemoSchema } from '@/utils/validators';
// same as edit
const CreateNew: FC<{
  state: CreateNewState;
}> = ({ state: { onSubmit } }) => {
  const form = useForm<AddMemoFormValue>({
    resolver: zodResolver(createNewMemoSchema),
    defaultValues: {
      id: useId(),
      title: generateNewTitle(),
      summary: '',
      tokens: [],
      description: '',
      records: [],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tokens"
          render={({ field }) => <TokensForm {...field} />}
        />

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Textarea
                  className="bg-purple-200"
                  placeholder="Summary"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="bg-purple-200"
                  placeholder="description"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!form.formState.isValid}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreateNew;
