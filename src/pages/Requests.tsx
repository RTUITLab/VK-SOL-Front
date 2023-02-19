import { useAtomValue } from "@mntm/precoil"
import { Panel, PanelHeader, PanelHeaderContent, PanelProps, Separator, Spacing, Spinner } from "@vkontakte/vkui"
import { userAtom } from "../store"
import React from "react"
import { useQuery } from "@tanstack/react-query"
import { api } from "../api"

function Requests({ nav }: PanelProps) {
  const user = useAtomValue(userAtom)
  const exchanges = useQuery({ queryKey: ['UserExchanges'], queryFn: () => api.getUserExchanges(user.walletAddress) })


  return (
    <Panel nav={nav}>
      <PanelHeader><PanelHeaderContent>Заявки</PanelHeaderContent></PanelHeader>

      {exchanges.isLoading
        ? <Spinner />
        : exchanges.data.length === 0
        ? <div style={{ textAlign: 'center', margin: 20 }}>{'Заявки на обмен билетами отсутствуют'}</div>
        : <></>
      }
    </Panel>
  )
}

export default Requests
