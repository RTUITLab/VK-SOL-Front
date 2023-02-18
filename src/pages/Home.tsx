import React, { useEffect } from 'react'
import { Avatar, CardGrid, Group, Panel, PanelHeader, PanelHeaderContent, PanelProps, Search, SimpleCell, Spacing, Spinner } from '@vkontakte/vkui'
import {
  Icon28BillheadOutline,
  Icon28ChevronRightOutline,
  Icon28CheckCircleOutline,
  Icon28CancelCircleOutline,
  Icon28PawOutline,
  Icon28WarningTriangleOutline,
  Icon28ArticleOutline,
  Icon20TicketOutline
} from '@vkontakte/icons'
import bridge, { UserInfo } from '@vkontakte/vk-bridge'
import { useAtomValue, useSetAtomState } from '@mntm/precoil'
import { userAtom, vkUserAtom } from '../store'
import { setDoneSnackbar, setErrorSnackbar } from '../hooks'
import { push } from '@cteamdev/router'
import EventCard from '../components/eventCard/EventCard'
import Ticket from '../components/Ticket/Ticket'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../api'


export const Home: React.FC<PanelProps> = ({ nav }: PanelProps) => {
  const vkUser: UserInfo = useAtomValue(vkUserAtom)
  const user = useAtomValue(userAtom)
  const setUser = useSetAtomState(userAtom)

  const { data, isLoading } = useQuery({ queryKey: ['AllEvents'], queryFn: api.getAllEvents })

  return (
    <Panel nav={nav}>
      <PanelHeader><PanelHeaderContent>Главная</PanelHeaderContent></PanelHeader>
      <Search />
      <Spacing />
      <Group mode='plain'>
        <CardGrid size='l'>

          {isLoading ? <Spinner size={'large'} style={{ margin: '20px 0' }} /> : data?.map((e) =>
            <EventCard time={'18:00'} image={'https://levandrovskiy.ru' + e.cover} date={e.date} description={e.description} eventName={e.name} address={e.place} key={e._id} />
          )}
        </CardGrid>
      </Group>
    </Panel>
  )
}
