import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'

import {
  BaiJamjuree_700Bold
} from '@expo-google-fonts/bai-jamjuree'
import {styled} from 'nativewind'

const StyledView = styled(View)
export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold
  })
  if(!hasLoadedFonts){
    return null
  }
  return (
    <View className='flex-1 items-center justify-center bg-gray-950 gap-20'>
      <StyledView className='flex items-center flex-col'>
        <Image className='w-20 animate-bounce transition-all' source={require("./assets/rocket.png")}/>
        <Text className='text-yellow-100 font-alt text-3xl'>Rocketseat</Text>
      </StyledView>
      <StyledView className='flex flex-col'>
        <Text className='w-fit text-yellow-100 ml-32 pl-2 font-alt text-3xl border-t-2 border-t-purple-300 border-l-2 border-l-purple-200 rounded'>LEARNING</Text>
        <Text className='w-fit text-yellow-100 ml-20 pl-2 mr-32 font-alt text-3xl border-t-2 border-t-purple-500 border-l-2 border-l-purple-600 rounded'>STOP</Text>
        <Text className='w-fit text-yellow-100 pl-2 mr-40 font-alt text-3xl border-t-2 border-t-purple-700 border-l-2 border-l-purple-800 rounded'>#NEVER</Text> 
      </StyledView>
      <StatusBar style="light" translucent/>
    </View>
  );
}

