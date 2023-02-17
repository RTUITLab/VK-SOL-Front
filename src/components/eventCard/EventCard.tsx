import { Card, Group, SimpleCell, SplitCol } from '@vkontakte/vkui';
import React from 'react';
import './eventcard.css'

type EventCardprops = {
    image: string,

}

function EventCard(props: EventCardprops) {
    return (
        <Card className='event-card'>
            <img className='event-card__image' src={props.image} />
            <Group>
                adasd
            </Group>
        </Card>
    );
}

export default EventCard;