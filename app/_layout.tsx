import { StatusBar } from 'expo-status-bar';
import { ImageBackground } from 'react-native';
import blurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'
import { styled } from 'nativewind'
import * as SecureStore from 'expo-secure-store'

const StyledStripes = styled(Stripes)

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'

import {
  BaiJamjuree_700Bold
} from '@expo-google-fonts/bai-jamjuree'
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Layout() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<null | boolean>(null)
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold
  })

  useEffect(() => {
    SecureStore.getItemAsync('token')
      .then((token) => {
        setIsUserAuthenticated(!!token)
      })
  }, [])

  if (!hasLoadedFonts) {
    return <SplashScreen />
  }
  return (
    <ImageBackground source={blurBg} imageStyle={{ position: 'absolute', left: '-100%' }} className='relative flex-1 bg-gray-950'>
      {/* <StyledView className='flex items-center flex-col'>
        <Image className='w-20 animate-bounce transition-all' source={require("./assets/rocket.png")} />
        <Text className='text-yellow-100 font-alt text-3xl'>Rocketseat</Text>
      </StyledView>
      <StyledView className='flex flex-col mx-auto'>
        <Text className='w-fit text-yellow-100 ml-32 pl-2 font-alt text-3xl border-t-2 border-t-purple-300 border-l-2 border-l-purple-200 rounded'>LEARNING</Text>
        <Text className='w-fit text-yellow-100 ml-20 pl-2 mr-32 font-alt text-3xl border-t-2 border-t-purple-500 border-l-2 border-l-purple-600 rounded'>STOP</Text>
        <Text className='w-fit text-yellow-100 pl-2 mr-40 font-alt text-3xl border-t-2 border-t-purple-700 border-l-2 border-l-purple-800 rounded'>#NEVER</Text>
      </StyledView> */}
      <StatusBar style="light" translucent />
      <StyledStripes className='absolute left-2' />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'transparent'
          },
          animation: 'fade'
        }}>
          <Stack.Screen name="index" redirect={isUserAuthenticated}/>
          <Stack.Screen name="memories"/>
          <Stack.Screen name="new"/>
      </Stack>
    </ImageBackground>
  );
}

