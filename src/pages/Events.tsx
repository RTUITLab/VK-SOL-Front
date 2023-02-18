import React from 'react'
import { Panel, PanelHeader, PanelHeaderButton, PanelHeaderContent, PanelProps, SimpleCell, Spinner, View } from '@vkontakte/vkui'
import { Icon28AddSquareOutline, Icon28BillheadOutline } from '@vkontakte/icons'
import { push } from '@cteamdev/router'
import { useQuery } from '@tanstack/react-query'
import { api } from '../api'


function Events({ nav }: PanelProps) {
  const { data, isLoading } = useQuery({ queryKey: ['events', { admin: 'idHere' }], queryFn: api.getAllEvents })
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
        }
      >
        <PanelHeaderContent>Мероприятия
        </PanelHeaderContent></PanelHeader>
      {isLoading ? <Spinner size={'large'} style={{ margin: '20px 0' }} /> : 'nothing here now'//data.map((e)=>e)

      }
    </Panel>
  )
}

export default Events