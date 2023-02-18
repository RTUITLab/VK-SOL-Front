import React, { useEffect } from 'react'
import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  PlatformType,
  SplitCol,
  SplitLayout
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import { useCurrentState, View } from '@cteamdev/router'
import { Home } from './pages'
import { Navigation } from './components/navigation'
import { getPlatform } from './utils'
import { useAtomValue, useSetAtomState } from '@mntm/precoil'
import { eventIdAtom, vkUserAtom } from './store'
import bridge, { UserInfo } from '@vkontakte/vk-bridge'
import Events from './pages/Events'
import Favorites from './pages/Favorites'
import Profile from './pages/Profile'
import Tickets from './pages/Tickets'
import Collections from './pages/Collections'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import EventPage from './pages/EventPage/EventPage'

const queryClient = new QueryClient()

export const App: React.FC = () => {
  const platform: PlatformType = getPlatform()
  const setVkUser = useSetAtomState(vkUserAtom)

  useEffect(() => {
    const load = async () => {
      const vkUser: UserInfo = await bridge.send('VKWebAppGetUserInfo')
      setVkUser(vkUser)
    }
    load()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider platform={platform}>
        <AdaptivityProvider>
          <AppRoot>
            <Navigation >
              <View nav='/'>
                <Home nav='/' />
              </View>
              <View nav={'/current_event'}>
                <EventPage
                  nav='/'
                  name='event name'
                />
              </View>
              <View nav='/events'>
                <Events nav='/' />
              </View>
              <View nav='/favorite'>
                <Favorites nav='/' />
              </View>
              <View nav='/tickets'>
                <Tickets nav='/' />
              </View>
              <View nav='/profile'>
                <Profile nav='/' />
              </View>
              <View nav='/collections'>
                <Collections nav='/' />
              </View>
            </Navigation>
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    </QueryClientProvider>
  )
}
