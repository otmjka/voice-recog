'use client';
import { type FC } from 'react';
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
import type {
  AddMemoFormValue,
  MemoRecord,
  OnRecordResultHandler,
} from '@/types';
import { createNewMemoSchema } from '@/types';
import { ChangeFromTestId } from '@/enums/dataTestId';
import { getEmptyMemo } from '@/lib/getEmptyMemo';
import { VoiceRecorder } from '@/components/VoiceRecorder';

import TokensForm from '../uiKit/TokensForm/TokensForm';

const CreateNew: FC<{
  value?: MemoRecord;
  onSubmit: (value: MemoRecord) => void;
}> = ({ value, onSubmit }) => {
  const form = useForm<AddMemoFormValue>({
    resolver: zodResolver(createNewMemoSchema),
    defaultValues: value ? value : getEmptyMemo(),
  });

  const handlerOnRecorderResult: OnRecordResultHandler = (params) => {
    if (params.speach.result) {
      const currentDescription = form.getValues('description') ?? '';
      form.setValue(
        'description',
        `${currentDescription} ${params.speach.result}`,
        {
          shouldValidate: true,
          shouldDirty: true,
        },
      );
    }

    if (params.audio.result) {
      form.setValue('audio', params.audio.result, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  return (
    <div className="relative">
      <div className="absolute right-0 top-[-50px]">
        <VoiceRecorder onResult={handlerOnRecorderResult} />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    data-testid={ChangeFromTestId.titleInput}
                    placeholder="title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tokens"
            render={({ field }) => (
              <TokensForm value={field.value} onChange={field.onChange} />
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
                    data-testid={ChangeFromTestId.inputDescription}
                    placeholder="description"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            data-testid={ChangeFromTestId.submitMemo}
            disabled={!form.formState.isValid}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateNew;
