import { type FC } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { TokenList } from '@/components/uiKit';
import type { AddTokenFormValue, Token } from '@/types';
import { tokenFormSchema } from '@/utils/validators';
import { ChangeFromTestId } from '@/enums/dataTestId';

type TokensFormProps = {
  value: Token[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (...event: any[]) => void;
};

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
                data-testid={ChangeFromTestId.addTokenInput}
                {...field}
                placeholder="Enter token"
              />
            )}
          />

          <Button
            className="text-xs px-2 py-0"
            data-testid={ChangeFromTestId.addTokenSubmit}
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
