import { useQuery } from '@tanstack/react-query'
import bridge from '@vkontakte/vk-bridge'
import { Panel, PanelHeader, PanelHeaderContent, PanelProps, Spacing, Spinner } from '@vkontakte/vkui'
import React from 'react'
import EventCard from '../components/eventCard/EventCard'

function Favorites({ nav }: PanelProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['allLikes'], queryFn: async () => {
      const likesKeys = await bridge.send('VKWebAppStorageGetKeys', {
        count: 30, offset: 0
      })
        .then((data) => {
          if (data.keys) {
            return data.keys.filter((e) => e.startsWith('liked')) || ['']
          }
        })
        .catch() || ['']

      const ids = await bridge.send('VKWebAppStorageGet', {
        keys: likesKeys
      })
        .then((data) => {
          console.log(data)
          if (data.keys) {
            return data.keys.filter(e => e.value === 'true').map(e => e.key).map(e => e.slice(5))
          }
        })
        .catch()

      const cards = ids?.map((id) => fetch(`https://levandrovskiy.ru/api/event/${id}`).then(data => data.json()).then((d) => {
        console.log(ids)
        console.log(d)
        return d
      })) || []
      

      return (await Promise.all(cards)).filter((d) => !!d)
    }
  })

  return (
    <Panel nav={nav}>
      <PanelHeader><PanelHeaderContent>Избранное</PanelHeaderContent></PanelHeader>
      <Spacing /> 

      {isLoading ? <Spinner size={'large'} /> : data && data?.length>0 && data?.map(card => (
        <React.Fragment key={card._id}>
          <EventCard image={card.cover} eventName={card.name} description={card.description} date={card.date.split('T')[0]} time={card.date.split('T')[1]} address={card.place} id={card._id} key={card._id}></EventCard>
          <Spacing></Spacing>
        </React.Fragment>
      )) || <div style={{ textAlign: 'center', margin: 20 }}>{'В избранном пока ничего нет'}</div>}

    </Panel>
  )
}

export default Favorites