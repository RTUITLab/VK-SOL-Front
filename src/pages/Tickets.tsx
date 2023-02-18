import React from 'react'
import { Cell, Group, List, Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent, PanelProps, Spacing, Spinner } from '@vkontakte/vkui'
import { back } from '@cteamdev/router'
import Ticket from '../components/Ticket/Ticket'
import { useQuery } from '@tanstack/react-query'
import { api } from '../api'
import { useAtomValue } from '@mntm/precoil'
import { userAtom } from '../store'

function Tickets({ nav }: PanelProps) {
  const user = useAtomValue(userAtom)
  const tickets = useQuery({ queryKey: ['AllTickets'], queryFn: api.getAllTickets })
  const events = useQuery({ queryKey: ['AllEvents'], queryFn: api.getAllEvents })

  return (
    <Panel nav={nav}>
      <PanelHeader >
        <PanelHeaderContent>Мои Билеты</PanelHeaderContent>
      </PanelHeader>
      {tickets.isLoading || events.isLoading
        ? <Spinner />
        : <Group>
          <List>
            {tickets.data.filter((item: any) => item.user_id == user.walletAddress).map((e: any) => {
              const t_event = events.data.find((i: any) => i._id == e.event_id)
              return (
                <>
                  <Cell key={e._id}>
                    <Ticket
                      image={e.url}
                      eventName={t_event.name}
                      date={t_event.date.split('T')[0]}
                      time={t_event.date.split('T')[1]}
                      address={t_event.place}
                    />
                  </Cell>
                  <Spacing size={16} />
                </>
              )
            })}
          </List>
        </Group>}
    </Panel>
  )
}

export default Tickets