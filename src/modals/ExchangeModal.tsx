import { back } from "@cteamdev/router";
import { useAtomValue } from "@mntm/precoil";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Cell, Group, List, ModalCard, ModalCardProps, Spacing, Spinner } from "@vkontakte/vkui";
import React from "react";
import { api } from "../api";
import Ticket from "../components/Ticket/Ticket";
import { userAtom } from "../store";

export const ExchangeModal: React.FC<ModalCardProps> = ({ nav }: ModalCardProps) => {
  const user = useAtomValue(userAtom)
  const tickets = useQuery({ queryKey: ['AllTickets'], queryFn: api.getAllTickets })
  const events = useQuery({ queryKey: ['AllEvents'], queryFn: api.getAllEvents })
  const { mutate, isLoading } = useMutation({ mutationFn: api.createExchange, mutationKey: ['AddExchange'], onSuccess: handleSuccess, onError: handleError })

  function handleSuccess() { }

  function handleError() { }

  function handleCreate() { }

  return (
    <ModalCard nav={nav} onClose={back} header='Выбор билетов для обмена'>
      {tickets.isLoading || events.isLoading
        ? <Spinner />
        : <Group>
          <List>
            {tickets.data.filter((item: any) => item.user_id === user.walletAddress).map((e: any) => {
              const t_event = events.data.find((i: any) => i._id === e.event_id)
              return (
                <>
                  <Cell key={e._id}>
                    <Ticket
                      with_qr={false}
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

      <Button style={{ marginLeft: 'auto' }} size='l' mode='primary' onClick={() => handleCreate()}>
        Предложить обмен
      </Button>
    </ModalCard>
  )
}
