import { back, push, replace, useCurrentState } from '@cteamdev/router';
import { useAtomValue } from '@mntm/precoil';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Icon16ClockOutline, Icon16DonateOultine, Icon16Location, Icon24Done, Icon24Error, Icon28AddOutline, Icon28CopyOutline, Icon28LikeOutline, Icon28UserOutline } from '@vkontakte/icons';
import { Button, Cell, CellButton, Counter, Div, Group, Header, Headline, IconButton, MiniInfoCell, Panel, PanelHeader, PanelHeaderBack, SimpleCell, Snackbar, Spinner, SplitCol, SplitLayout, TabsItem, Title } from '@vkontakte/vkui';
import { func } from 'prop-types';
import React, { useRef, useState } from 'react';
import { api, APIEventType } from '../../api';
import { eventIdAtom, userAtom } from '../../store';
import './eventpage.css'

type EventPagetypes = {
    nav: string
}

function EventPage(props: EventPagetypes) {

    const eventId = useAtomValue(eventIdAtom)
    const user = useAtomValue(userAtom)

    const { data, isLoading } = useQuery<APIEventType>({ queryKey: ['current_event'], queryFn: () => api.getEventById(eventId) })
    const { mutate, error } = useMutation({ mutationKey: ['get_ticket'], mutationFn: () => api.getTicket(eventId, user.walletAddress), onSuccess: handleSuccess, onError: handleError })



    const [snackbar, setSnackbar] = useState<JSX.Element | null>(null)
    const successSnackbar = <Snackbar
        onClose={() => setSnackbar(null)}
        before={<Icon24Done />}
    >
        Билет успешно приобретён
    </Snackbar>
    const errorSnackbar = <Snackbar
        onClose={() => setSnackbar(null)}
        before={<Icon24Error />}
    >
        Ошбка при приобретении билета
    </Snackbar>


    function handlechangeFavorite() {

    }

    function handleError() {
        setSnackbar(errorSnackbar)
        console.log('error', error);
    }
    function handleSuccess() {
        setSnackbar(successSnackbar)
        console.log('success');
    }

    function handleGetTicket() {
        mutate()
    }

    return (
        <Panel nav={props.nav}>
            <PanelHeader
                before={<PanelHeaderBack onClick={() => replace('/')} />}
            >
                {data && data.name}
                {isLoading && ' Загрузка'}
            </PanelHeader>
            {data &&
                <Group>
                    <div className='event-page'>
                        <img className='event-page__image' src={`https://levandrovskiy.ru${data.cover}`} />
                        <div className='event-page__info'>
                            <Headline size={3} >
                                {data.description}
                            </Headline>
                            <div className='event-card__date'>
                                <MiniInfoCell
                                    before={<Icon16DonateOultine />}
                                    style={{ display: 'flex', alignItems: 'center', padding: '0' }}
                                >
                                    {data.date.split('T')[0]}
                                </MiniInfoCell>
                                <MiniInfoCell
                                    before={<Icon16ClockOutline />}
                                    style={{ display: 'flex', alignItems: 'center', padding: '0' }}
                                >
                                    {data.date.split('T')[1]}
                                </MiniInfoCell>


                            </div>
                            <MiniInfoCell
                                before={<Icon16Location fill='#2688EB' />}
                                style={{ display: 'flex', alignItems: 'center', padding: '0' }}
                            >
                                <a
                                    className='event-card__location'
                                    target={'_blank'}
                                    href={`https://yandex.ru/maps/213/moscow/search/${data.place}`} rel='noreferrer'
                                >
                                    <Headline style={{ color: '#2688EB', maxWidth: '100px' }} weight='semibold'>
                                        {data.place}
                                    </Headline>

                                </a>

                            </MiniInfoCell>
                            {
                                data.white_list.includes(user.walletAddress) ?
                                    <Button
                                        size='l'
                                        appearance='accent'
                                        mode='secondary'
                                        onClick={handleGetTicket}
                                    >
                                        Получить билет
                                    </Button>
                                    :
                                    <Button
                                        size='l'
                                        appearance='positive'
                                        mode='outline'
                                    >
                                        Купить билет
                                    </Button>
                            }


                        </div>
                        <div className='event-card__secondary'>
                            <IconButton onClick={handlechangeFavorite}>
                                <Icon28LikeOutline />
                            </IconButton>
                            <Cell indicator={<Counter>{data.amount}</Counter>}>
                                Всего билеты
                            </Cell>
                        </div>
                    </div>
                </Group>
            }

            <Group>
                <Div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Title>Вайтлист</Title>
                    {data && (data.user_id === user.walletAddress && user.isAdmin === true) ? <CellButton
                        onClick={() => push('/events/?modal=wallet')}
                        before={<Icon28AddOutline />}>Добавить</CellButton> : null}
                </Div>
                {
                    data && data.white_list.map((item, index) => <SimpleCell key={index} after={<Icon28CopyOutline />}>
                        {item}
                    </SimpleCell>)
                }
                {
                    data && data.white_list.length === 0 && <SimpleCell>Вайтлист пока пуст</SimpleCell>
                }
            </Group>
            {
                snackbar
            }
        </Panel >
    );
}

export default EventPage;