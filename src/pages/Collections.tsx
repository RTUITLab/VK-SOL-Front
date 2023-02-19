import React from 'react'
import { Cell, Group, Panel, PanelHeader, PanelHeaderContent, PanelProps, Spacing, Spinner } from '@vkontakte/vkui'
import { useQuery } from '@tanstack/react-query'
import { api } from '../api'
import { useAtomValue } from '@mntm/precoil'
import { userAtom } from '../store'
import Ticket from '../components/Ticket/Ticket'
import { push } from '@cteamdev/router'

function Collections({ nav }: PanelProps) {
  const user = useAtomValue(userAtom)
  const tickets = useQuery({ queryKey: ['TicketsForSell'], queryFn: api.getTicketsForSell })
  const events = useQuery({ queryKey: ['AllEvents'], queryFn: api.getAllEvents })

  return (
    <Panel nav={nav}>
      <PanelHeader><PanelHeaderContent>Коллекции</PanelHeaderContent></PanelHeader>

      {tickets.isLoading || events.isLoading
        ? <Spinner />
        : tickets.data.length == 0
          ? <div style={{ textAlign: 'center', margin: 20 }}>{'Ни один билет не выставлен на обмен'}</div>
          : <Group>
            {tickets.data.map((ticket: any) => {
              const t_event = events.data.find((i: any) => i._id === ticket.event_id)
              return (
                <React.Fragment  key={ticket._id}>
                  <Cell onClick={() => push(`/collections/?modal=exchange&ticket=${ticket._id}&user=${ticket.user_id}`)}>
                    <Ticket
                      with_qr={false}
                      image={ticket.url}
                      eventName={t_event.name}
                      date={t_event.date.split('T')[0]}
                      time={t_event.date.split('T')[1]}
                      address={t_event.place}
                    />
                  </Cell>
                  <Spacing size={16} />
                </React.Fragment>
              )
            })
            }
          </Group>
      }
    </Panel>
  )
}

export default Collections
