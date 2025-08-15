import { type FC } from 'react';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { ControllerRenderProps } from 'react-hook-form';
import { Button } from '@/components/ui/button';

import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TokenList } from '@/components/uiKit';
import type { AddMemoFormValue, AddTokenFormValue } from '@/types';
import { tokenFormSchema } from '@/utils/validators';

type TokensFormProps = ControllerRenderProps<AddMemoFormValue, 'tokens'>;

const TokensForm: FC<TokensFormProps> = ({ value, onChange }) => {
  const form = useForm<AddTokenFormValue>({
    resolver: zodResolver(tokenFormSchema),
    defaultValues: {
      token: '',
    },
  });

  const onSubmit = (values: z.infer<typeof tokenFormSchema>) => {
    onChange([{ token: values.token }, ...value]);
    form.reset();
  };

  const handleRemove = (itemToRemove: AddTokenFormValue) =>
    onChange(value.filter((srcItem) => srcItem !== itemToRemove));

  return (
    <FormItem>
      <TokenList items={value} onRemove={handleRemove} />
      <div className="flex flex-col gap-1">
        <div className="flex">
          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <Input
                className="min-w-[50px] max-w-[70px] py-0"
                {...field}
                placeholder="Enter token"
              />
            )}
          />

          <Button
            className="text-xs px-2 py-0"
            onClick={form.handleSubmit(onSubmit)}
          >
            +
          </Button>
        </div>
      </div>
    </FormItem>
  );
};

export default TokensForm;
