import { Center, Text, Icon } from "native-base";
import { Fontisto } from '@expo/vector-icons';

import Logo from '../assets/logo.svg';
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

export default function SingIn() {
    const { singIn, isUserLoading } = useAuth();

    return (
        <Center flex={1} bgColor="gray.900" p={7} >

            <Logo width={212} height={40} />
            <Button title="Entrar com Google"
                type="SECONDARY"
                leftIcon={
                    <Icon as={Fontisto} name="google" color="white" size={"md"} />}
                mt={12}
                onPress={singIn}
                isLoading={isUserLoading}
                _loading={{_spinner: {color: 'white'}}}
            />
            <Text color="white" textAlign="center" mt={4}>
                Não utilizamos nenhuma informação além{'\n'}
                do seu email para criação de sua conta
            </Text>
        </Center>
    )
}