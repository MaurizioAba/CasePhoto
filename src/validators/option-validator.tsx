// bg-blue-950 border-blue-950
// bg-zinc-900 border-zinc-900
// bg-rose-950 border-rose-950


import { PRODUCT_PRICES } from "@/src/config/products"

export const COLORS = [
    { label: 'Nero', value: 'black', tw: 'zinc-900' },
    {
      label: 'Blue',
      value: 'blue',
      tw: 'blue-950',
    },
    { label: 'Rosso', value: 'rose', tw: 'rose-950' },
  ] as const

  export const MODELS = {
    name: "model",
    options: [
      {
        label: 'iPhone 11',
        value: 'iphone11',
      },
      {
        label: 'iPhone 12',
        value: 'iphone12',
      },
      {
        label: 'iPhone 13',
        value: 'iphone13',
      },
      {
        label: 'iPhone 14',
        value: 'iphone14',
      },
      {
        label: 'iPhone 15',
        value: 'iphone15',
      },
    ],
  } as const

  export const MATERIALS = {
    name: 'material',
    options: [
      {
        label: 'Silicone',
        value: 'silicone',
        description: undefined,
        price: PRODUCT_PRICES.material.silicone,
      },
      {
        label: 'Policarbonato soft',
        value: 'polycarbonate',
        description: 'Rivestimento antigraffio',
        price: PRODUCT_PRICES.material.polycarbonate,
      },
    ],
  } as const

  export const FINISHES = {
    name: 'finish',
    options: [
      {
        label: 'Finitura liscia',
        value: 'smooth',
        description: undefined,
        price: PRODUCT_PRICES.finish.smooth,
      },
      {
        label: 'Finitura soft',
        value: 'textured',
        description: 'Texture morbida e antiscivolo',
        price: PRODUCT_PRICES.finish.textured,
      },
    ],
  } as const