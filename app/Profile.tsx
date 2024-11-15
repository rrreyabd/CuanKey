import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'

const Profile = () => {
  const [fact, setFact] = useState<string | null>(null)
  const [refresh, setRefresh] = useState<boolean>(false)

  useEffect(() => {
    const fetchFact = async () => {
      try {
        const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en')
        const data = await response.json()
        setFact(data.text)
      } catch (error) {
        console.error('Error fetching fact:', error)
      }
    }

    fetchFact()
  }, [refresh])

  return (
    <View className='justify-center items-center flex-1'>
      <Text className='text-red-300'>Profile</Text>
      {fact ? <Text className='text-green-500'>{fact}</Text> : <Text>Loading...</Text>}
      <Button title='Refresh' onPress={() => setRefresh(prev => !prev)} />
      <Link href="./" className='text-blue-400 font-semibold'>Back to Home</Link>
    </View>
  )
}

export default Profile