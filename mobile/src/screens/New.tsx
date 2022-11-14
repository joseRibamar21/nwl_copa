import { Heading, Text, VStack, useToast } from "native-base";
import { Header } from "../components/Header";

import Logo from '../assets/logo.svg'
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import { api } from "../services/api";

export function New() {
    const [isLoading, setIsLoading] = useState(false)
    const [title, setTitle] = useState("");
    const toast = useToast();

    async function handlePoolCreate() {
        if(!title.trim()){
            return toast.show({
                title: 'Informe um nome para o seu bolão!',
                placement: 'top',
                bgColor: 'red.500',
            })
        }
        
        try{

            setIsLoading(true)

            await api.post('/pools',{
                title
            })
            setTitle('')
            return toast.show({
                title: "Bolão criado com sucesso!",
                placement: 'top',
                bgColor: 'green.500',
            })

        }catch(error){
            console.log(error)
            return toast.show({
                title: "Não foi possivel criar o bolão",
                placement: 'top',
                bgColor: 'red.500',
            })
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Criar novo bolão" showBackButton={true} />
            <VStack mt={8} mx={5} alignItems='center'>
                <Logo />

                <Heading fontFamily='heading' color='white' fontSize='xl' my={8} textAlign="center">
                    Crie seu próprio bolão da copa e compartilhe entre amigos
                </Heading>

                <Input
                    value={title}
                    onChangeText={setTitle}
                    mb={2}
                    placeholder="Qual o nome do seu bolão"
                />

                <Button 
                    title="CRIAR MEU BOLÃO"
                    onPress={handlePoolCreate}
                    isLoading = {isLoading}
                />

                <Text color='coolGray.w00' fontSize='sm' textAlign='center' px={4} mt={4}>
                    Após criar seu bolão, você receberá um código 
                    único que poderá usar para convidar outras pessoas.
                </Text>
            </VStack>
        </VStack>
    )
}