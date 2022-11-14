import { useRoute } from "@react-navigation/native";
import { HStack, useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Share } from "react-native";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Guesses } from "../components/Guesses";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Option } from "../components/Option";
import { PoolCardPros } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { api } from "../services/api";

interface RouteParams {
    id: string;
}

export function Details() {
    const route = useRoute()
    const [isLoading, setIsLoading] = useState(false);
    const [optionSelected, setOptionSelected] = useState<'Seus palpites' | 'Ranking do grupo'>('Seus palpites');
    const [poolDetails, setPoolDetails] = useState<PoolCardPros>({} as PoolCardPros);
    const { id } = route.params as RouteParams;
    const toast = useToast();

    async function fetchPoolDeatais() {
        try {
            setIsLoading(true)

            const response = await api.get(`/pools/${id}`)
            setPoolDetails(response.data.pool)
        } catch (error) {
            return toast.show({
                title: "Não foi possivel carregar bolão",
                placement: 'top',
                bgColor: 'red.500',
            })
        } finally {
            setIsLoading(false)
        }
    }

    async function handleCodeShare() {
        await Share.share({
            message: poolDetails.code,
        })
    }

    useEffect(() => {
        fetchPoolDeatais()
    }, [id])

    if (isLoading) {
        return <Loading />
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title={poolDetails.title} showBackButton showShareButton onShare={handleCodeShare} />

            {
                poolDetails._count?.participants > 0 ?
                    <VStack>
                        <PoolHeader data={poolDetails} />
                        <HStack bgColor="gray.800" p={1} rounded='sm' mb={5}>
                            <Option title="Seus palpites"
                                isSelected={optionSelected === "Seus palpites"}
                                onPress={() => setOptionSelected("Seus palpites")}
                            />
                            <Option title="Ranking do grupo"
                                isSelected={optionSelected === "Ranking do grupo"}
                                onPress={() => setOptionSelected("Ranking do grupo")}
                            />

                        </HStack>
                        <Guesses poolId={poolDetails.id} />
                    </VStack>
                    :
                    <EmptyMyPoolList code={poolDetails.code} />

            }
        </VStack>
    )
}