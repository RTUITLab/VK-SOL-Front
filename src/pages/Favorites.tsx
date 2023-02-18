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
    
    const ids = await bridge.send('VKWebAppStorageGet', {
      keys: likesKeys })
      .then((data) => { 
        if (data.keys) {
          return data.keys.filter(e=>e.value==='true').map(e=>e.key)
        }
      })
      .catch(() => [''])

    const cards = ids?.map((id)=> fetch(`https://levandrovskiy.ru/api/event/${id}`).then(data=>data.json())) || []
    
    return await Promise.all(cards)
  } })

  console.log(data)

  return (
    <Panel nav={nav}>
      <PanelHeader><PanelHeaderContent>Избранное</PanelHeaderContent></PanelHeader>
      {data?.map(card=><EventCard image={'https://levandrovskiy.ru'+card.cover} eventName={card.name} description={card.description} date={card.date.split('T')[0]} time={card.date.split('T')[1]} address={card.place} id={card._id} key={card._id}></EventCard>)}
    </Panel>
  )
}

export default Favorites