import { back } from '@cteamdev/router';
import { useAtomValue } from '@mntm/precoil';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, FormItem, FormLayout, Input, ModalCard, ModalCardBaseProps, ModalCardProps } from '@vkontakte/vkui';
import React, { useState } from 'react';
import { api } from '../api';
import { eventIdAtom } from '../store';

export const ModalAddWalet: React.FC<ModalCardProps> = ({ nav }: ModalCardProps) => {

    const [walletId, setWalletId] = useState('')
    const eventId = useAtomValue(eventIdAtom)

    const { mutate, error } = useMutation({ mutationKey: ['add_to_whitelist'], mutationFn: () => api.addToWhiteList(eventId, walletId), onSuccess: handleSuccess, onError: handleError })

    function handleError() {
        console.log('error', error);
    }
    function handleSuccess() {
        back()
    }

    function handleAddWallet() {
        mutate()
    }
    return (
        <ModalCard
            nav={nav}
            onClose={back}
            header='Добавить в вайтлист'
            actions={
                <Button size='l' onClick={handleAddWallet}>
                    Добавить
                </Button>
            }

        >
            <FormLayout>
                <FormItem top='Идентификатор кошелька'>
                    <Input
                        value={walletId}
                        onChange={e => setWalletId(e.target.value)}
                        type={'text'}
                        placeholder='Введите название'
                    />
                </FormItem>

            </FormLayout>

        </ModalCard>
    );
}

export default ModalAddWalet;