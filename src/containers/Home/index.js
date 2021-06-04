import { Fragment } from 'react'
// import banner_img from '../../assets/img/top_banner01.png'
import { Popover, Transition } from '@headlessui/react'
// import logo from '../../assets/img/main_logo2.png'



export default function Home() {
  return (
    <div >
      <section className="header relative pt-16 items-center flex bg-cover bg-secondary" style={{backgroundImage:url(''),height:"600px"}}>
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold text-4xl text-white">K-cancer omics open.</h2>
              <p className="mt-4 text-lg leading-relaxed text-white">A cancer data platform that provides a variety of visualized analysis results
                by combining high quality clinical and protein genome information of domestic cancer patients
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
