import React from 'react'
import { Modal } from './Modal'
import { ModalRoot } from '@cteamdev/router'
import { ExchangeModal } from './ExchangeModal'

export const Modals = () => {
  return (
    <ModalRoot>
      <Modal nav='modal' />
      <ExchangeModal nav='exchange' />
    </ModalRoot>
  )
}
