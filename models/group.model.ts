import { Schema, Document, Model, model } from 'mongoose'

export interface IGroup extends Document {
  _id: string
  name: string
  updatedAt: number
  createdAt: number
}

const groupSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    createdAt: { type: Number },
    updatedAt: { type: Number },
  },
  {
    timestamps: { currentTime: Date.now }
  }
)

groupSchema.index({ name: 1, _id: 1 }, { unique: true })

const Group: Model<IGroup> = model('Group', groupSchema);

export { Group }