import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormLabel,
  Grid,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Switch
} from '@chakra-ui/react';
import {
  type customer_address,
  type customer,
  type product,
  type credit_card
} from '@prisma/client';
import Head from 'next/head';
import { CustProductCard } from '~/components/CustProductCard';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import { api } from '~/utils/api';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { formatCurrency } from '~/utils/general';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';

export interface ProductWithPrice extends product {
  totalItems: number;
  totalPrice: number;
}

export default function Customer() {
  const [shoppingCartOpen, setShoppingCartOpen] = useState(false);
  const [user, setUser] = useState<customer | undefined>(undefined);
  const router = useRouter();
  const { data } = api.product.getAll.useQuery();

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('customer');
      if (!user) {
        void router.push('/');
      } else {
        setUser(JSON.parse(user) as unknown as customer);
      }
    } else {
      console.error('Web Storage is not supported in this environment.');
    }
  }, [router]);

  const addToCart = (data: product) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const cart: product[] = JSON.parse(
      localStorage.getItem('cart') ?? JSON.stringify([] as product[])
    );

    localStorage.setItem('cart', JSON.stringify([...cart, data]));
  };

  const ShoppingCartModal = () => {
    const [finalProducts, setFinalProducts] = useState(
      [] as ProductWithPrice[]
    );
    const [isNewAddress, setIsNewAddress] = useState(false);
    const [isNewCreditCard, setIsNewCreditCard] = useState(false);

    const { data: addressData } = api.address.getAllByCustId.useQuery({
      id: user?.cust_id ?? 0
    });

    const { data: cardData } = api.CreditCard.getAllByCustId.useQuery({
      id: user?.cust_id ?? 0
    });

    const { mutate: orderMutate, isPending } =
      api.order.postOrder.useMutation();

    const defaultValues = {
      address_id: 0,
      card_id: 0,
      streetNum: '',
      streetName: '',
      city: '',
      state: '',
      zip: '',
      cardNumber: '',
      cardExp: '',
      cardSecurity: ''
    };

    const { control, handleSubmit, setValue } = useForm({
      defaultValues: defaultValues
    });

    useEffect(() => {
      if (typeof localStorage === 'undefined') return;

      const shoppingCartStorage = localStorage.getItem('cart');

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const shoppingCartItems: product[] | undefined = shoppingCartStorage
        ? JSON.parse(shoppingCartStorage)
        : undefined;

      const productMap: Record<string, ProductWithPrice> = {};

      shoppingCartItems?.forEach((product, index) => {
        const key = product.name ?? 'product' + index;
        if (productMap[key]) {
          productMap[key]!.totalPrice += Number(product.price ?? 0);
          productMap[key]!.totalItems++;
        } else {
          productMap[key] = {
            ...product,
            totalPrice: Number(product.price ?? 0),
            totalItems: 1
          };
        }
      });

      setFinalProducts(Object.values(productMap));
    }, []);

    const deleteItem = (product_id: number) => {
      const shoppingCartStorage = localStorage.getItem('cart');

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const shoppingCartItems: product[] | undefined = shoppingCartStorage
        ? JSON.parse(shoppingCartStorage)
        : undefined;

      localStorage.setItem(
        'cart',
        JSON.stringify(
          shoppingCartItems?.filter(
            (product) => product_id !== product.product_id
          )
        )
      );
      setFinalProducts(
        finalProducts.filter((product) => product.product_id !== product_id)
      );
    };

    const handleAddressSelection = (value: customer_address) => {
      setValue('streetNum', value.street_number ?? '');
      setValue('streetName', value.street_name ?? '');
      setValue('city', value.city ?? '');
      setValue('state', value.state ?? '');
      setValue('zip', value.zip ?? '');
      setValue('address_id', value.cust_address_id);
    };

    const handleCardSelection = (value: credit_card) => {
      setValue('cardNumber', value.number ?? '');
      setValue('cardExp', dayjs(value.expiry_date).format('MM/YY') ?? '');
      setValue('cardSecurity', value.security_number ?? '');
      setValue('card_id', value.card_id);
    };

    const submitNewOrder = async (data: typeof defaultValues) => {
      orderMutate({
        status: 'New',
        customer_id: user!.cust_id,
        credit_card_id: data.card_id,
        order_date: dayjs().format('YYYY-MM-DD'),
        isNewAddress: isNewAddress,
        isNewCard: isNewCreditCard,
        street_name: data.streetName,
        street_number: data.streetNum,
        city: data.city,
        state: data.state,
        zip: data.zip,
        number: data.cardNumber,
        expiry_date: data.cardExp,
        finalProducts: finalProducts.map((value) => {
          return { ...value, price: isNaN(Number(value)) ? 0 : Number(value) };
        }),
        security_number: data.cardSecurity,
        firstName: user!.first_name!,
        lastName: user!.last_name!
      });
    };

    return (
      <Modal
        isOpen={shoppingCartOpen}
        onClose={() => setShoppingCartOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Shopping Cart</ModalHeader>
          <form onSubmit={handleSubmit(submitNewOrder)}>
            <ModalBody>
              <Container>
                {finalProducts?.map((value, index) => (
                  <>
                    {index > 0 && <Divider />}
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      padding="4px"
                    >
                      <Box key={index}>
                        {`(${value.totalItems})`} {value.name}
                      </Box>
                      <Flex alignItems="center" gap={4}>
                        <div>{formatCurrency(value.totalPrice)}</div>
                        <FaTrash
                          onClick={() => {
                            deleteItem(value.product_id);
                          }}
                        />
                      </Flex>
                    </Flex>
                  </>
                ))}
              </Container>

              <Container>
                <div>Credit Card</div>
                <Switch onChange={(e) => setIsNewCreditCard(e.target.checked)}>
                  Use New Card
                </Switch>

                {isNewCreditCard ? (
                  <>
                    <FormLabel width="100%">
                      Card Number
                      <Controller
                        name="cardNumber"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Card Number"
                            type="number"
                          />
                        )}
                      />
                    </FormLabel>
                    <FormLabel width="100%">
                      Card Expiration
                      <Controller
                        name="cardExp"
                        control={control}
                        render={({ field }) => (
                          <Input {...field} placeholder="Card Expiration" />
                        )}
                      />
                    </FormLabel>
                    <FormLabel width="100%">
                      Security Number
                      <Controller
                        name="cardSecurity"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Security Number"
                            type="number"
                          />
                        )}
                      />
                    </FormLabel>
                  </>
                ) : (
                  <Select>
                    {cardData?.map((value, index) => (
                      <option
                        value={JSON.stringify(value)}
                        key={index}
                        onChange={() => handleCardSelection(value)}
                      >
                        {value?.number}
                      </option>
                    ))}
                  </Select>
                )}
              </Container>
              <Container>
                <div>Address</div>
                <Switch onChange={(e) => setIsNewAddress(e.target.checked)}>
                  Use New Address
                </Switch>
                {isNewAddress ? (
                  <>
                    <FormLabel width="100%">
                      Street Number
                      <Controller
                        name="streetNum"
                        control={control}
                        render={({ field }) => (
                          <Input {...field} placeholder="Street Number" />
                        )}
                      />
                    </FormLabel>
                    <FormLabel width="100%">
                      Street Name
                      <Controller
                        name="streetName"
                        control={control}
                        render={({ field }) => (
                          <Input {...field} placeholder="Street Name" />
                        )}
                      />
                    </FormLabel>
                    <FormLabel width="100%">
                      City
                      <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                          <Input {...field} placeholder="City" />
                        )}
                      />
                    </FormLabel>
                    <FormLabel width="100%">
                      State
                      <Controller
                        name="state"
                        control={control}
                        render={({ field }) => (
                          <Input {...field} placeholder="State" />
                        )}
                      />
                    </FormLabel>
                    <FormLabel width="100%">
                      Zip
                      <Controller
                        name="zip"
                        control={control}
                        render={({ field }) => (
                          <Input {...field} placeholder="Zip" />
                        )}
                      />
                    </FormLabel>
                  </>
                ) : (
                  <Select>
                    {addressData?.map((value, index) => (
                      <option
                        value={JSON.stringify(value)}
                        key={index}
                        onChange={() => handleAddressSelection(value)}
                      >
                        {value.street_number} {value.street_name}
                      </option>
                    ))}
                  </Select>
                )}
              </Container>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" type="submit" isLoading={isPending}>
                Order
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <>
      <Head>
        <title>Shopping Page 🛒</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Flex alignItems="center" justifyContent="space-between">
          <div>
            Welcome {user?.first_name} {user?.last_name}
          </div>
          <FaShoppingCart onClick={() => setShoppingCartOpen(true)} />
        </Flex>
        <Grid
          templateColumns="repeat(4, 2fr)"
          autoRows="1fr"
          justifyContent="center"
          alignItems="center"
          gap={10}
        >
          {data?.map((data) => (
            <CustProductCard
              product={data}
              key={data.product_id}
              onAdd={() => {
                addToCart(data);
              }}
            />
          ))}
        </Grid>
        <ShoppingCartModal />
      </main>
    </>
  );
}
