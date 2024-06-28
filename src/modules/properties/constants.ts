import { z } from 'zod'

export const propertiesSchema = z.object({ property: z.string(), value: z.string() })
