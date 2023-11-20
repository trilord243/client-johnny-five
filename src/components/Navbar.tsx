import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Logo from "../assets/Icono-MT.png"




export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [waterLevel, setWaterLevel] = useState(null);
    const relay = () => {

        fetch('http://localhost:3000/relay')

    };

    const ventiladorOn = async () => {
        console.log("first")

        fetch('http://localhost:3000/motor-on ')

    };
    const ventiladorOff = async () => {
        console.log("first")

        fetch('http://localhost:3000/motor-off ')

    };
    const agua = async () => {
        const response = await fetch('http://localhost:3000/water')
        const data = await response.json();
        console.log(data)
        setWaterLevel(data.level);
    };

    const navigation = [
        { name: 'Ventilador On 🔛☁', onClick: ventiladorOn },
        { name: 'Ventilador Off 📴☁', onClick: ventiladorOff },
        { name: 'Nivel Agua 💦', onClick: agua },
        ,
    ]



    let waterStatus = "";
    if (waterLevel !== null) {
        if (waterLevel >= 400) {
            waterStatus = "Lleno 😱";
        } else if (waterLevel >= 100) {
            waterStatus = "Medio 😒";
        } else {
            waterStatus = "Vacio 🚰";
        }
    }
    return (
        <header className="bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex flex-1">
                    <div className="hidden lg:flex lg:gap-x-12" >
                        {navigation.map((item) => (
                            <p key={item.name} onClick={item.onClick} className="text-sm font-semibold leading-6 cursor-pointer text-gray-900">
                                {item.name}
                            </p>
                        ))}

                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Abrir meny</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>

                <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">Metrotech</span>
                    <img className="h-14 w-auto max-md:pr-4" src={Logo} alt="" />
                </a>
                <div className="flex flex-1 justify-end">
                    <a onClick={relay} href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        Mover Brazo 🦾 <span aria-hidden="true">&rarr;</span>
                    </a>
                    <span className='ml-10' > Nivel agua: {waterStatus}</span>
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-1">
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Cerrar menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Metrotech</span>
                            <img
                                className="h-8 w-auto"
                                src={Logo}
                                alt="a"
                            />
                        </a>
                        <div className="flex flex-1 justify-end">
                            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                                Mover Brazo <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div>
                    <div className="mt-6 space-y-2">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}
