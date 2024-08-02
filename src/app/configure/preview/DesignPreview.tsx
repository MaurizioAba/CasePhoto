"use client"




import { Configuration } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { ArrowRight, Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import Confetti from 'react-dom-confetti'
import { createCheckoutSession } from './actions'
import { useRouter } from 'next/navigation'
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs"

import { cn, formatPrice } from '../../../lib/utils'
import { BASE_PRICE, PRODUCT_PRICES } from '@/src/config/products'
import { COLORS, MODELS } from '@/src/validators/option-validator'
import LoginModal from '@/src/components/LoginModal'
import Phone from '@/src/components/Phone'
import { Button } from '@/src/components/ui/button'
import { useToast } from '@/src/components/ui/use-toast'

const DesignPreview = ({configuration}: {configuration: Configuration}) => {
    const router = useRouter()
    const {toast} = useToast()
    const {id} = configuration
    const {user} = useKindeBrowserClient()
    const [isLoadingModalOpen, setIsLoginModalOpen] = useState<boolean>(false)

    const [showConfetti, setShowConfetti] = useState(false)
    useEffect(() => setShowConfetti(true))

        
    const { color, model, finish, material } = configuration
    const tw = COLORS.find((supportedColor) => supportedColor.value === color)?.tw

    const { label: modelLabel } = MODELS.options.find(
        ({ value }) => value === model
      )!

    let totalPrice = BASE_PRICE
    if (material === 'polycarbonate')
        totalPrice += PRODUCT_PRICES.material.polycarbonate
    if (finish === 'textured') totalPrice += PRODUCT_PRICES.finish.textured

    const {mutate: createPaymentSession} = useMutation({
        mutationKey: ["get-checkout-session"],
        mutationFn:  createCheckoutSession,
        onSuccess: ({url}) => {
          if(url) router.push(url)
            else throw new Error("Unable to retrieve payment Url")
        },
        onError: () => {
          toast({
            title: "Something went wrong",
            description: "There was an error on our end. Try again.",
            variant: "destructive",
          })
        } ,
    })

    const handleCheckout = () => {
      if(user) {
        createPaymentSession({configId: id})
      } else {
        localStorage.setItem("configurationId", id)
        setIsLoginModalOpen(true)
      }
    }

    return ( 
    <> 
        <div aria-hidden='true' className='pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center'>
            <Confetti active={showConfetti} config={{elementCount: 200, spread: 90}}/>
        </div>

        <LoginModal isOpen={isLoadingModalOpen} setIsOpen={setIsLoginModalOpen}/>
    
        <div className='mt-20 flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12'>
          <div className='md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2'>
            <Phone
              className={cn(`bg-${tw}`, "max-w-[150px] md:max-w-full")}
              imgSrc={configuration.croppedImageUrl!}
            />
          </div>
          <div className='mt-6 sm:col-span-9 md:row-end-1'>
          <h3 className='text-3xl font-bold tracking-tight text-gray-900'>
            Your {modelLabel} Case
          </h3>
          <div className='mt-3 flex items-center gap-1.5 text-base'>
            <Check className='h-4 w-4 text-green-500' />
            In stock and ready to ship
          </div>
        </div>
        
        <div className='sm:col-span-12 md:col-span-9 text-base'>
            <div className='grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10'>
                <div>
                <p className='font-medium text-zinc-950'>Punti salienti</p>
                    <ol className='mt-3 text-zinc-700 list-disc list-inside'>
                        <li>Compatibile con la ricarica wireless</li>
                        <li>Assorbimento degli urti perchè in materiale TPU</li>
                        <li>Imballaggio realizzato con materiali riciclati</li>
                        <li>Garanzia di stampa di 5 anni</li>
                    </ol>
                    </div>
                    <div>
                    <p className='font-medium text-zinc-950'>Materiale</p>
                    <ol className='mt-3 text-zinc-700 list-disc list-inside'>
                        <li>Materiale durevole e di alta qualità</li>
                        <li>Rivestimento antigraffio e antimpronte</li>
                    </ol>
                </div>
            </div>
            <div className='mt-8'>
            <div className='bg-gray-50 p-6 sm:rounded-lg sm:p-8'>
              <div className='flow-root text-sm'>
                <div className='flex items-center justify-between py-1 mt-2'>
                  <p className='text-gray-600'>Prezzo base</p>
                  <p className='font-medium text-gray-900'>
                    {formatPrice(BASE_PRICE / 100)}
                  </p>
                </div>

                {finish === 'textured' ? (
                  <div className='flex items-center justify-between py-1 mt-2'>
                    <p className='text-gray-600'>Finitura</p>
                    <p className='font-medium text-gray-900'>
                      {formatPrice(PRODUCT_PRICES.finish.textured / 100)}
                    </p>
                  </div>
                ) : null}

                {material === 'polycarbonate' ? (
                  <div className='flex items-center justify-between py-1 mt-2'>
                    <p className='text-gray-600'>Materiale policarbonato</p>
                    <p className='font-medium text-gray-900'>
                      {formatPrice(PRODUCT_PRICES.material.polycarbonate / 100)}
                    </p>
                  </div>
                ) : null}
                
                <div className='my-2 h-px bg-gray-200' />
                
                <div className='flex items-center justify-between py-2'>
                  <p className='font-semibold text-gray-900'>Totale Ordine</p>
                  <p className='font-semibold text-gray-900'>
                    {formatPrice(totalPrice / 100)}
                  </p>
                </div>
              </div>
            </div>
            <div className='mt-8 flex justify-end pb-12'>
              <Button onClick={() => handleCheckout()}
                className='px-4 sm:px-6 lg:px-8'>
                Check out <ArrowRight className='h-4 w-4 ml-1.5 inline' />
              </Button>
            </div>
          </div>
        </div> 
       </div>
    </>
    )
}

export default DesignPreview