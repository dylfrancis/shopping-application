import { Flex, Button, Input, Skeleton, Grid, GridItem } from '@chakra-ui/react';
import Head from 'next/head';
import { type credit_card } from '@prisma/client';
import { type customer_address } from '@prisma/client';
import { useState } from 'react';
import { AddAddressFormModal } from '~/components/AddAddressForm';
import { ModifyAddressFormModal } from '~/components/ModifyAddressForm';
import { AddCreditCardFormModal } from '~/components/AddCreditCardForm';
import { ModifyCreditCardFormModal } from '~/components/ModifyCreditCardForm';
import { AddressCard } from '~/components/AddressCard';
import { CreditCardCard } from '~/components/CreditCardCard';
import { api } from '~/utils/api';

//Lists all addresses
//Lists all Credit cards

export default function Account(){
    const [isAddCreditCardOpen, setIsAddCreditCardOpen] = useState(false);
  const [modifiedCreditCard, setModifiedCreditCard] = useState<credit_card>(
    {} as credit_card
  );
  const [isModifyCreditCardOpen, setIsModifyCreditCardOpen] = useState(false);

  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [modifiedAddress, setModifiedAddress] = useState<customer_address>(
    {} as customer_address
  );
  const [isModifyAddressOpen, setIsModifyAddressOpen] = useState(false);

    const ctx = api.useUtils();
  const { data: CreditCardData } = api.CreditCard.getAll.useQuery();
  const { data: Addressdata } = api.Address.getAll.useQuery();


    return(
        <>
      <Head>
        <title>Account Settings</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <h2>Addresses:</h2>
        </div>
        <Button onClick={() => setIsAddAddressOpen(true)} colorScheme="blue">
          Add Address
        </Button>
        <Flex flexWrap="wrap" justifyContent="flex-start">
          {Addressdata?.map((Address) => (
            <AddressCard
              customer_address = {Address}
              id={Address.cust_address_id}
              onModify={() => {
                setModifiedAddress(Address);
                setIsModifyAddressOpen(true);
              }}
            />
          ))}
        </Flex>
        <div>
          <h2>Credit Cards:</h2>
        </div>
        <Button onClick={() => setIsAddCreditCardOpen(true)} colorScheme="blue">
          Add Credit Card
        </Button>
        <Flex flexWrap="wrap" justifyContent="flex-start">
          {CreditCardData?.map((CreditCard) => (
            <CreditCardCard
              Credit_Card = {CreditCard}
              id={CreditCard.card_id}
              onModify={() => {
                setModifiedCreditCard(CreditCard);
                setIsModifyCreditCardOpen(true);
              }}
            />
          ))}
        </Flex> 
        <AddCreditCardFormModal
        isOpen={isAddCreditCardOpen}
        onClose={() => setIsAddCreditCardOpen(false)}
        />
        {isModifyCreditCardOpen && (
          <ModifyCreditCardFormModal
            isOpen={isModifyCreditCardOpen}
            onClose={() => setIsModifyCreditCardOpen(false)}
            credit_card = {modifiedCreditCard}
          />
        )}
        <AddAddressFormModal
        isOpen={isAddAddressOpen}
        onClose={() => setIsAddAddressOpen(false)}
        />
        {isModifyAddressOpen && (
          <ModifyAddressFormModal
            isOpen={isModifyAddressOpen}
            onClose={() => setIsModifyAddressOpen(false)}
            address = {modifiedAddress}
          />
        )}

      </main>
    </>
    );
}