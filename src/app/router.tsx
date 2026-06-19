import { createBrowserRouter } from 'react-router-dom'

import { appRoutes } from './routes'

export const router = createBrowserRouter(appRoutes, {
    basename: '/Leegality---FrontEnd-Exercise-/',
})