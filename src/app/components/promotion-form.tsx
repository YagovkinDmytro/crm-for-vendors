'use client';

import { Form, Formik } from 'formik';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPromotion, getCompany } from '@/lib/api';
import Button from '@/app/components/button';
import InputField from '@/app/components/input-field';
import LogoUploader from '@/app/components/logo-uploader';

export type PromotionFieldValues = {
  title: string;
  description: string;
  discount: string | number;
};

const initialValues: PromotionFieldValues = {
  title: '',
  description: '',
  discount: '',
};

export interface PromotionFormProps {
  companyId: string;
  onSubmit?: (values: PromotionFieldValues) => void | Promise<void>;
}

export default function PromotionForm({
  companyId,
  onSubmit,
}: PromotionFormProps) {
  const queryClient = useQueryClient();

  const { data: company } = useQuery({
    queryKey: ['companies', companyId],
    queryFn: () => getCompany(companyId),
    staleTime: 10 * 1000,
    enabled: Boolean(companyId),
  });

  const isLoadingDictionaries = company == null;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: Parameters<typeof createPromotion>[0]) =>
      createPromotion(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['promotions', companyId],
      });

      queryClient.invalidateQueries({
        queryKey: ['promotions'],
        exact: true,
      });
    },
  });

  const handleSubmit = async (values: PromotionFieldValues) => {
    if (isLoadingDictionaries) {
      return;
    }

    await mutateAsync({
      ...values,
      discount: Number(values.discount) || 0,
      companyId: company.id,
      companyTitle: company.title,
    });

    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className='flex flex-col gap-10'>
        <p className='mb-0.5 text-xl'>Add new promotion</p>
        <div className='flex flex-col gap-5'>
          <InputField required label='Title' placeholder='Title' name='title' />
          <InputField
            required
            label='Description'
            placeholder='Description'
            name='description'
          />
          <InputField
            required
            type='number'
            label='Discount'
            placeholder='Discount'
            name='discount'
          />
          <LogoUploader square label='Image' placeholder='Upload photo' />
        </div>
        <Button type='submit' disabled={isPending || isLoadingDictionaries}>
          Add promotion
        </Button>
      </Form>
    </Formik>
  );
}
