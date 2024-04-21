import { Button, Center, FormLabel, Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { api } from '~/utils/api';

export default function Login() {
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: ''
    }
  });

  const handleLoggedIn = useCallback(async () => {
    const customer = localStorage.getItem('customer');
    if (customer) {
      await router.push('/customer');
    }
  }, [router]);

  useEffect(() => {
    void handleLoggedIn();
  }, [handleLoggedIn]);

  const { data, mutate } = api.customer.getOne.useMutation();

  const onSubmit = async (formData: { username: string }) => {
    mutate({ username: formData.username });
    localStorage.setItem('customer', JSON.stringify(data));
    await router.push('/customer');
  };

  return (
    <Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <FormLabel>
              Username
              <Input {...field} />
            </FormLabel>
          )}
        />
        <Button colorScheme="blue" type="submit">
          Submit
        </Button>
      </form>
    </Center>
  );
}
