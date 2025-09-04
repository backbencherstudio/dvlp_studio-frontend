import Footer from '@/components/common/Footer'
import Navbar from '@/components/pages/Home/Navbar'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer/>
        </div>
    )
}