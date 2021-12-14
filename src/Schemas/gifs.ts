import { getModelForClass, prop } from '@typegoose/typegoose'

class Gifs {
  @prop()
  number!: string

  @prop({ required: true })
  type!: string

  @prop({ required: true })
  url!: string
}

export const GifsModel = getModelForClass(Gifs)
