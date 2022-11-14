import { NavigationContainer } from '@react-navigation/native'
import { Box } from 'native-base'

import { useAuth } from '../hooks/useAuth'

import SingIn from '../screens/SingIn'
import { AppRoutes } from './app.routes'

export function Routes() {
    const { user } = useAuth()

    return (
        <Box flex={1} bg='gray.900'>
            <NavigationContainer>
                {user.name ? <AppRoutes /> : <SingIn />}
            </NavigationContainer>
        </Box>
    )
}