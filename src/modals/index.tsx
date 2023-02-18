import React from 'react'
import { Modal } from './Modal'
import { ModalRoot } from '@cteamdev/router'
import ModalAddWalet from './ModalAddWalet'
import { ExchangeModal } from './ExchangeModal'

export const Modals = () => {
  return (
    <ModalRoot>
      <Modal nav='modal' />
      <ModalAddWalet nav='wallet' />
      <ExchangeModal nav='exchange' />
    </ModalRoot>
  )
}
