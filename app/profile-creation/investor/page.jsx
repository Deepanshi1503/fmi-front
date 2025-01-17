import Header from '@/components/profile-creation/header'
import ProfileStep from '@/components/investor-profile-creation/steps'
import Footer from '@/components/profile-creation/footer'
import { GlobalContextProvider } from '@/context/context'

export default function profile() {
    return (
        <GlobalContextProvider>
            <Header/>
            <ProfileStep/>
            <Footer/>
        </GlobalContextProvider>
    )
}