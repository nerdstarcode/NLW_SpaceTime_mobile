import { Image, View, Text, Switch, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";
import { useState } from "react";

import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import Icon from '@expo/vector-icons/Feather'

import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import { api } from "../src/lib/api";
import { AxiosResponse } from "axios";

export default function NewMemories() {
  const { bottom, top } = useSafeAreaInsets()
  const router = useRouter()

  const [content, setContent] = useState('')
  const [preview, setPreview] = useState<string | null>(null)
  const [isPublic, setIsPublic] = useState(false)

  const [sending, setSending] = useState(false)

  async function openImagePicker() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      setPreview(result?.assets[0]?.uri || null);

    } catch (err) {
      console.error(err);
    }
  }
  async function handleCreateMemory() {
    setSending(true);
    if (!content) {
      alert("No content")
      setSending(false)
      return
    }
    const token = await SecureStore.getItemAsync('token')

    let coverUrl = ''

    if (preview) {
      const uploadFormData = new FormData()

      uploadFormData.append('file', {
        uri: preview,
        name: 'image.jpg',
        type: 'image/jpg',
      } as any)

      const uploadResponse: AxiosResponse | any = await api.post('/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).catch(err => { console.error(err); setSending(false) })

      coverUrl = uploadResponse?.data?.fileUrl
    }

    await api.post(
      '/memories',
      {
        content,
        isPublic,
        coverUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ).catch(err => { console.error(err); setSending(false) })
    setSending(false)
    router.push('/memories')
  }
  return (
    <ScrollView className="flex-1 px-8" contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}>
      <View className="mt-4 flex-row items-center justify-between">
        <NLWLogo />
        <Link href="/memories">
          <View className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
            <Icon name="arrow-left" color="#ECECEC" />
          </View>
        </Link>
      </View>
      <View className="mt-6 space-y-6">
        <View className="flex-row items-center gap-2">
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            trackColor={{
              false: '#767577',
              true: '#372560'
            }}
            thumbColor={isPublic ? '#9b79ea' : '#9e9ea0'}
          />
          <Text
            onPress={() => setIsPublic(!isPublic)}
            className="font-body text-base text-gray-200"
          >
            Tornar memória pública
          </Text>
        </View>
        <TouchableOpacity onPress={openImagePicker} activeOpacity={0.8} className="items-center h-32 w-full justify-center rounded-lg border border-dashed border-gray-500 bg-black/20">
          {preview ?
            <Image source={{ uri: preview }} className="h-full w-full rounded-lg object-cover" />
            :
            <View className="flex-row items-center gap-2">
              <Icon name="image" size={16} color="#fff" />
              <Text className="font-body text-sm text-gray-200"> Adicionar foto ou vídeo de capa</Text>
            </View>
          }
        </TouchableOpacity>

        <TextInput
          multiline
          value={content}
          onChangeText={setContent}
          className="p-0 font-body text-lg text-gray-50 text-justify"
          placeholderTextColor='#56565a'
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
        />
        {
          sending ?
            <View
              className='mx-auto my-10 w-40 rounded-full items-center bg-green-500 px-8 py-2'
            >
              <Text className='font-alt text-sm uppercase text-black leadint'>Sending...</Text>
            </View>
            :
            <TouchableOpacity
              activeOpacity={0.7}
              className='mx-auto my-10 w-40 rounded-full items-center bg-green-500 px-8 py-2'
              onPress={handleCreateMemory}
            >
              <Text className='font-alt text-sm uppercase text-black leadint'>Salvar</Text>
            </TouchableOpacity>
        }

      </View>

    </ScrollView>
  )
}