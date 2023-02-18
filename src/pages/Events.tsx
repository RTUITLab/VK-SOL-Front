import React from 'react'
import { Panel, PanelHeader, PanelHeaderButton, PanelProps, SimpleCell } from '@vkontakte/vkui'
import { Icon28AddSquareOutline, Icon28BillheadOutline } from '@vkontakte/icons'
import { push } from '@cteamdev/router'

function Events({ nav }: PanelProps) {

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
      >Мероприятия
      </PanelHeader>
    </Panel>
  )
}

export default Events