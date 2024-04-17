import { Button, Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';


// This page should be the index imo, should be used as a stand-in login page
// Just has two buttons one to go to staff and one to go to customer

export default function Homepage(){

    //Not sure if this is the preferred way to navigate around pages,
    //They are just 
    const router = useRouter();

        // Function to nav to staff page, change the '' to actual route
        const navigateToStaffPage = () => {
            router.push('/staff'); 
        };

        // Function to nav to Customer page, change the '' to actual route
        const navigateToCustomerPage = () => {
            router.push('/customer'); 
        };

    return(
        //html with the two buttons with the associated functions
        <Center height="100vh">
        <div>
            <Button onClick={navigateToStaffPage} colorScheme="blue" mr={4}>
            Staff
            </Button>
            <Button onClick={navigateToCustomerPage} colorScheme="green">
            Customer
            </Button>
        </div>
        </Center>
    );
}