import { useQuery } from '@tanstack/react-query'
import bridge from '@vkontakte/vk-bridge'
import { Panel, PanelHeader, PanelHeaderContent, PanelProps } from '@vkontakte/vkui'
import React from 'react'
import EventCard from '../components/eventCard/EventCard'

function Favorites({ nav }: PanelProps) {
  const { data } = useQuery({ queryKey: ['like'], queryFn: async () => {
    const likesKeys = await bridge.send('VKWebAppStorageGetKeys', {
      count: 30, offset: 0
    })
      .then((data) => { 
        if (data.keys) {
          return data.keys.filter((e)=>e.startsWith('liked')).map(e=>e.slice(5)) || ['']
        }
      })
      .catch(() => {
        return ['']
      }) || ['']
    
    const ids = bridge.send('VKWebAppStorageGet', {
      keys: likesKeys })
      .then((data) => { 
        if (data.keys) {
          return data.keys.filter(e=>e.value==='true').map(e=>e.key)
        }
      })
      .catch(() => [''])

    //! дописать 
  } })

  return (
    <Panel nav={nav}>
      <PanelHeader><PanelHeaderContent>Избранное</PanelHeaderContent></PanelHeader>
    </Panel>
  )
}

export default Favorites