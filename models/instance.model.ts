import { Schema, Document, Model, model } from 'mongoose'



export interface IInstance extends Document {
  _id: string
  groupId: string
  groupName: string
  updatedAt: number
  createdAt: number
  meta: Record<string, unknown>
}

const instanceSchema = new Schema(
  {
    _id: { type: String, required: true },
    groupName: { type: String, required: true },
    groupId: { type: String, required: true },
    meta: { type: Object },
    createdAt: { type: Number },
    updatedAt: { type: Number },
  },
  {
    timestamps: { currentTime: Date.now }
  }

)

instanceSchema.index({ groupName: 1, _id: 1, groupId: 1 }, { unique: true })


const Instance: Model<IInstance> = model('Instance', instanceSchema);

export { Instance }