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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const localCustomer = localStorage.getItem('customer');
    if (localCustomer) {
      await router.push('/customer');
    }
  }, [router]);

  useEffect(() => {
    void handleLoggedIn();
  }, [handleLoggedIn]);

  const { mutate } = api.customer.getOne.useMutation({
    onSuccess: (response) => {
      localStorage.setItem('customer', JSON.stringify(response));
      void router.push('/customer');
    }
  });

  const onSubmit = async (formData: { username: string }) => {
    mutate({ username: formData.username });
  };

  return (
    <Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <div>
              {"Enter 'bob' for login"}
              <FormLabel>
                Username
                <Input {...field} />
              </FormLabel>
            </div>
          )}
        />
        <Button colorScheme="blue" type="submit">
          Submit
        </Button>
      </form>
    </Center>
  );
}
