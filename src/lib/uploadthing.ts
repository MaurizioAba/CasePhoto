import { OurFileRouter } from '@/src/app/api/uploadthing/core'
import { generateReactHelpers } from '@uploadthing/react'

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>()
