import { type ClassValue, clsx } from 'clsx'
import { Metadata } from 'next'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  });


  return formatter.format(price)
}

export function constructMetadata({
  title = 'SnapPhoto - crea la tua cover personalizzata in alta qualità',
  description = 'Crea la tua cover personalizzata per smartphone in alta qualità in pochi secondi',
  image = '/thumbnail.png',
  icons = '/favicon.ico',
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@snaphoto',
    },
    icons,
    metadataBase: new URL("https://localhost:3000")
  }
}