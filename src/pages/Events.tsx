import React from 'react'
import { CardGrid, Panel, PanelHeader, PanelHeaderButton, PanelHeaderContent, PanelProps, SimpleCell, Spacing, Spinner, View } from '@vkontakte/vkui'
import { Icon28AddSquareOutline, Icon28BillheadOutline } from '@vkontakte/icons'
import { push } from '@cteamdev/router'
import { useQuery } from '@tanstack/react-query'
import { api, APIEventType } from '../api'
import { useAtomValue } from '@mntm/precoil'
import { userAtom } from '../store'
import EventCard from '../components/eventCard/EventCard'


function Events({ nav }: PanelProps) {
  const user = useAtomValue(userAtom)
  const { data, isLoading } = useQuery<APIEventType[]>({ queryKey: ['events', { admin: user.walletAddress }], queryFn: () => api.getEventsById(user.walletAddress) })
  return (
    <Panel nav={nav}>
      <PanelHeader
        before={
          <PanelHeaderButton
            aria-label='Создать мероприятие'
            onClick={() => push('/events/?modal=modal')}
          >
            <Icon28AddSquareOutline />
          </PanelHeaderButton>
        }>
        <PanelHeaderContent>Мероприятия
        </PanelHeaderContent></PanelHeader>
      {isLoading && <Spinner size={'large'} style={{ margin: '20px 0' }} />}
      <Spacing />
      <CardGrid
        size='l'>
        {data ? data.map((item) => <EventCard
          id={item._id}
          key={item._id}
          eventName={item.name}
          description={item.description}
          image={`https://levandrovskiy.ru${item.cover}`}
          address={item.place}
          time={item.date.split('T')[1]}
          date={item.date.split('T')[0]}
          owner={true}
        />) : "здесь пока пусто"}
      </CardGrid>
    </Panel>
  )
}

export default Events