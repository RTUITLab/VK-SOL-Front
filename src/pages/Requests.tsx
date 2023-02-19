import { useAtomValue } from "@mntm/precoil"
import { Panel, PanelHeader, PanelHeaderContent, PanelProps } from "@vkontakte/vkui"
import { userAtom } from "../store"
import React from "react"

function Requests({ nav }: PanelProps) {
  const user = useAtomValue(userAtom)

  return (
    <Panel nav={nav}>
      <PanelHeader><PanelHeaderContent>Заявки</PanelHeaderContent></PanelHeader>
    </Panel>
  )
}

export default Requests
