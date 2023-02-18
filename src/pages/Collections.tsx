import React from "react";
import { Panel, PanelHeader, PanelHeaderContent, PanelProps } from "@vkontakte/vkui";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

function Collections({ nav }: PanelProps) {
  const { data, isLoading } = useQuery({ queryKey: ['AllTickets'], queryFn: api.getAllTickets })
  
  return (
    <Panel nav={nav}>
      <PanelHeader><PanelHeaderContent>Коллекции</PanelHeaderContent></PanelHeader>
    </Panel>
  )
}

export default Collections
