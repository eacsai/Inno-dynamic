import React, { memo } from 'react'
import { View, Text, Button } from '../../runtime-core/npm/components'
import './index.scss'

export const Index = memo(()=>{
  const click = () => {
    console.log('wqw click', wx)  // wqwRemove
    // wqwRem
    console.log('wqw click', wx)
  }
  return(
    <View className='title' onClick={click}>hello world</View>
  )
})
Page(require('../../runtime-core/npm/app.js').createPage(Index))