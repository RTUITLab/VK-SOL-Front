import { useAtomValue } from '@mntm/precoil'
import { useQuery } from '@tanstack/react-query'
import { Cell, Group, List, Panel, PanelHeader, PanelHeaderContent, PanelProps, Spacing, Spinner } from '@vkontakte/vkui'
import React from 'react'
import { api } from '../api'
import Ticket from '../components/Ticket/Ticket'
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
      {user.walletAddress==='' ?  <><div style={{ textAlign: 'center', margin: 20 }}>{'Подключите кошелек для просмотра своих билетов'}</div>
        <div style={{ textAlign: 'center', margin: 20 }}>{'Это можно сделать во вкладке "Профиль"'}</div></> : tickets.isLoading || events.isLoading
        ? <Spinner size={'large'} style={{ margin: '20px 0' }} />
        : <Group>
          <List>
            {tickets.data.filter((item: any) => item.user_id === user.walletAddress).filter((e)=>e).map((e: any, ind) => {
              const t_event = events.data.find((i: any) => i._id === e.event_id)
              if (!t_event?.name) return <React.Fragment key={ind}></React.Fragment>
              return (
                <React.Fragment key={e._id}>
                  <Cell >
                    <Ticket
                      id={e._id}
                      ticket={e.mint}
                      with_qr={true}
                      image={e.url}
                      eventName={t_event.name}
                      date={t_event.date.split('T')[0]}
                      time={t_event.date.split('T')[1]}
                      address={t_event.place}
                      forSell={e.for_sell}
                    />
                  </Cell>
                  <Spacing size={16} />
                </React.Fragment>
              )
            })}
          </List>
        </Group>}
    </Panel>
  )
}

export default Tickets