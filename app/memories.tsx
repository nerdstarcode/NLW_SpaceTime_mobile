import { Image, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { styled } from 'nativewind'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import Icon from '@expo/vector-icons/Feather'

import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { api } from '../src/lib/api';

import dayjs from 'dayjs';
import ptBr from 'dayjs/locale/pt-br'

const StyledView = styled(View)

dayjs.locale(ptBr)
interface MemoryDTO {
  coverUrl?: string;
  excerpt: string;
  id: string;
  created_at: string;
}
export default function Memories() {
  const { bottom, top } = useSafeAreaInsets()
  const router = useRouter()

  const [memories, setMemories] = useState<MemoryDTO[]>([])

  async function signOut() {
    await SecureStore.deleteItemAsync('token')
    router.push('/')
  }

  async function loadMemories() {
    const token = await SecureStore.getItemAsync('token')
    const response = await api.get('/memories', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setMemories(response.data)
  }

  useEffect(() => {
    loadMemories()
  }, [])
  return (
    // <View className='flex-1 justify-center items-center'>
    //   <StyledView className='flex items-center flex-col'>
    //     <Image className='w-20 animate-bounce transition-all' source={require('../assets/rocket.png')} />
    //     <Text className='text-yellow-100 font-alt text-3xl'>Rocketseat</Text>
    //   </StyledView>
    //   <StyledView className='flex flex-col mx-auto'>
    //     <Text className='w-fit text-yellow-100 ml-32 pl-2 font-alt text-3xl border-t-2 border-t-purple-300 border-l-2 border-l-purple-200 rounded'>LEARNING</Text>
    //     <Text className='w-fit text-yellow-100 ml-20 pl-2 mr-32 font-alt text-3xl border-t-2 border-t-purple-500 border-l-2 border-l-purple-600 rounded'>STOP</Text>
    //     <Text className='w-fit text-yellow-100 pl-2 mr-40 font-alt text-3xl border-t-2 border-t-purple-700 border-l-2 border-l-purple-800 rounded'>#NEVER</Text>
    //   </StyledView>
    // </View>
    <ScrollView className='flex-1' contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}>
      <View className='mt-4 px-8 flex-row items-center justify-between'>
        <TouchableOpacity onPress={signOut} className='h-8 w-8 items-center justify-center rounded-full bg-red-500'>
          <Icon name='log-out' color='#000' />
        </TouchableOpacity>
        <NLWLogo />
        <View className='flex-row items-center gap-2'>
          <Link href='/new'>
            <View className='h-10 w-10 items-center justify-center rounded-full bg-green-500'>
              <Icon name='plus' color='#000' />
            </View>
          </Link>
        </View>
      </View>

      <View className='mt-6 space-y-10'>
        {memories.map((memory) => {
          return (
            <View key={memory.id} className='space-y-4'>
              <View className='flex-row items-center gap-2'>
                <View className='h-px w-5 bg-gray-50' />
                <Text className='font-body text-xs text-gray-100'>
                  {
                    dayjs(memory.created_at).format("D[ de ]MMMM[, ]YYYY")
                  }
                </Text>
              </View>
              <View className='space-y-4 px-8'>
                <Image
                  source={{ uri: memory.coverUrl||'http://192.168.1.100:3333/uploads/noImage.jpg' }}
                  className='aspect-video object-cover w-full rounded-lg'
                  alt='image from memory'
                />
                <Text className='font-body text-base leading-relaxed text-gray-100 text-justify'>
                  {memory.excerpt}
                </Text>
                <Link href='/memories/id'>
                  <View className='flex-row items-center'>
                    <Text className='font-body text-sm text-gray-200'>
                      Ler mais
                    </Text>
                    <Icon name='arrow-right' size={16} color='#9a9ea0' />
                  </View>
                </Link>
              </View>
            </View>
          )
        })

        }
      </View>

    </ScrollView>
  )
}