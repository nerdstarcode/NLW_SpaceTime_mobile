import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import blurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'
import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
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
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { useEffect } from 'react';
import { api } from '../src/lib/api';
import { useRouter } from 'expo-router';

export default function App() {
  const router = useRouter()

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold
  })

  // const discovery = {
  //   authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  //   tokenEndpoint: 'https://github.com/login/oauth/access_token',
  //   revocationEndpoint: 'https://github.com/settings/connections/applications/91ac5b6bfd37af1ee687',
  // };
  // const [request, response, sigInWithGithub] = useAuthRequest(
  //   {
  //     clientId: '91ac5b6bfd37af1ee687',
  //     scopes: ['identity'],
  //     redirectUri: makeRedirectUri({
  //       scheme: 'nlwspacetime'
  //     }),
  //   },
  //   discovery
  // );
  async function handleGithubOAuthCode(code: string) {
    // const response = await api.post('/register', {
    //   code,
    // })

    // const { token } = response.data

    await SecureStore.setItemAsync('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU3RoaXZlbiBNZWxvIiwiYXZhdGFyVXJsIjoiaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91Lzk1MzEyNTQzP3Y9NCIsInN1YiI6IjljMmNlNTUyLWE3MmUtNDk4ZC1iZDFjLTBmMzM3ZmEyZTA1NCIsImlhdCI6MTY4NDQyMTYwNywiZXhwIjoxNjg3MDEzNjA3fQ.uSqNCaZMuX5YNk88Ck2o8PUgJ5j-s1oZvc8lp0qkurw')


    router.push('/memories')
  }

  useEffect(() => {
    // console.log(
    //   'response',
    //   makeRedirectUri({
    //     scheme: 'nlwspacetime',
    //   }),
    // )

    // if (response?.type === 'success') {
    // const { code } = response.params
    handleGithubOAuthCode('code')
    // }
    // }, [response]);
  }, []);
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
          onPress={() => {/*sigInWithGithub()*/ }}
        >
          <Text className='font-alt text-sm uppercase text-black leadint'>Cadastrar lembrança</Text>
        </TouchableOpacity>
      </View>
      <Text className='text-center font-body text-sm leading-relaxed text-gray-200'>Feito com 💜 no NLW da Rocketseat</Text>
    </ImageBackground>
  );
}

