import type { Dispatch, SetStateAction } from "react"
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog"
import Image from 'next/image'
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog"
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs"
import { buttonVariants } from "./ui/button"

const LoginModal = ({isOpen, setIsOpen}: {
    isOpen: boolean
    setIsOpen : Dispatch<SetStateAction<boolean>>
}) => {
    return (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
            <DialogContent className="absolute z-[9999999]">
                <DialogHeader>
                <div className="relative mx-auto w-24 h-24 mb-2">
                </div>
                <DialogTitle className="text-3xl text-center font-bold tracking-tight text-gray-900">Login</DialogTitle>
                <DialogDescription className="text-base text-center py-2">
                    <span className="font-medium text-zinc-900">La tua configurazione è stata salvata</span>{''}
                    Accedi o crea un account per completare l'acquisto
                </DialogDescription>
                </DialogHeader>

                <div className='grid grid-cols-2 gap-6 divide-x divide-gray-200'>
                <LoginLink className={buttonVariants({ variant: 'outline' })}>
                    Login
                </LoginLink>
                <RegisterLink className={buttonVariants({ variant: 'default' })}>
                    Registrazione
                </RegisterLink>
        </div>
            </DialogContent>
        </Dialog>
    )
}

export default LoginModal