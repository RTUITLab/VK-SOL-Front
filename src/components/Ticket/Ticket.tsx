import { Icon16ClockOutline, Icon16DonateOultine, Icon16Location, Icon28QrCodeOutline } from '@vkontakte/icons';
import { Caption, IconButton, MiniInfoCell, Text, Title } from '@vkontakte/vkui';
import React from 'react';
import './ticket.css'

type TicketProps = {
    image: string,
    eventName: string,
    date: string,
    time: string,
    address: string,
}

function Ticket(props: TicketProps) {
    return (
        <article className='ticket'>
            <div className='ticket__info'>
                <Title level={'2'} weight='medium'>
                    {props.eventName}
                </Title>
                <div className='event-card__date'>
                    <MiniInfoCell
                        before={<Icon16DonateOultine />}
                        style={{ display: 'flex', alignItems: 'center', padding: '0' }}
                    >
                        {props.date}
                    </MiniInfoCell>
                    <MiniInfoCell
                        before={<Icon16ClockOutline />}
                        style={{ display: 'flex', alignItems: 'center', padding: '0' }}
                    >
                        {props.time}
                    </MiniInfoCell>
                </div>
                <MiniInfoCell
                    before={<Icon16Location />}
                    style={{ display: 'flex', alignItems: 'center', padding: '0' }}
                >
                    <a
                        className='event-card__location'
                        target={'_blank'}
                        href={`https://yandex.ru/maps/213/moscow/search/${props.address}`}>
                        <Text weight='semibold'>
                            {props.address}
                        </Text>

                    </a>

                </MiniInfoCell>
            </div>
            <img className='ticket__image' src={props.image} />
            <IconButton className='ticket__qr' >
                <Icon28QrCodeOutline fill='fff' />
            </IconButton>
        </article>
    );
}

export default Ticket;