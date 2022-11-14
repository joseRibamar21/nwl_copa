import { Heading, useToast, VStack } from "native-base";
import { Header } from "../components/Header";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";

export function Find() {
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState('');
    const toast = useToast();
    const { navigate } = useNavigation()

    async function handleJoinPoll() {
        try{
            setIsLoading(true)
            if(!code.trim()){
                toast.show({
                    title: "Informe o codigo!",
                    placement: 'top',
                    bgColor: 'green.500',
                })
            }

            await api.post("/pools/join",{code});
            toast.show({
                title: "Você entrou no Bolão com sucesso!",
                placement: 'top',
                bgColor: 'green.500',
            })    
            navigate('pools')

        }catch(error){
            console.log(error)
            setIsLoading(false)
            if(error.response?.data?.message){
                toast.show({
                    title: "Erro ao entrar no bolao",
                    placement: 'top',
                    bgColor: 'red.500',
                })    
                return
            }else{
                toast.show({
                    title: "Não foi possivel encontrar o bolão",
                    placement: 'top',
                    bgColor: 'red.500',
                })
            }
            
        }
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Buscar por codigo " showBackButton={true} />
            <VStack mt={8} mx={5} alignItems='center'>

                <Heading fontFamily='heading' color='white' fontSize='xl' mb={8} textAlign="center">
                    Encontre um bolão através de {"\n"} seu código único
                </Heading>

                <Input
                    autoCapitalize="characters"
                    onChangeText={setCode}
                    mb={2}
                    placeholder="Qual o código bolão?"
                />

                <Button 
                    title="BUSCAR BOLÃO"
                    onPress={handleJoinPoll}
                />
            </VStack>
        </VStack>
    )
}