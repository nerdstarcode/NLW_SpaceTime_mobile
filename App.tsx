import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';

import blurBg from './src/assets/bg-blur.png'
import Stripes from './src/assets/stripes.svg'
import NLWLogo from './src/assets/nlw-spacetime-logo.svg'
import { styled } from 'nativewind'

const StyledStripes = styled(Stripes)
const StyledView = styled(View)

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'

import {
  BaiJamjuree_700Bold
} from '@expo-google-fonts/bai-jamjuree'

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold
  })
  if (!hasLoadedFonts) {
    return null
  }
  return (
    <ImageBackground source={blurBg} imageStyle={{ position: 'absolute', left: '-100%' }} className='relative flex-1 bg-gray-950 px-8 py-10'>
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
      <View className='flex-1 items-center justify-center gap-6'>
        <NLWLogo />
        <View className='space-y-2'>
          <Text className='text-center font-title text-2xl leading-tight text-gray-50'>Sua cápsula do tempo</Text>
          <Text className='text-center font-body text-base leading-relaxed text-gray-100'>Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          className='rounded-full bg-green-500 px-5 py-2'
        >
          <Text className='font-alt text-sm uppercase text-black leadint'>Cadastrar lembrança</Text>
        </TouchableOpacity>
      </View>
      <Text className='text-center font-body text-sm leading-relaxed text-gray-200'>Feito com 💜 no NLW da Rocketseat</Text>
    </ImageBackground>
  );
}

