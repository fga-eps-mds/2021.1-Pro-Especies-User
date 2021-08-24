import { Schema, model, Document } from 'mongoose';

import * as bcrypt from "bcryptjs";

interface IFisherman extends Document {
    name: string,
    email: string,
    telephone: string,
    password: string,
    state: string,
    city: string
}

const fishermanSchema = new Schema<IFisherman>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telephone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    }
});

fishermanSchema.pre<IFisherman>('save', async function (next) {
    const fisherman = this;

    if (!fisherman.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;

    next();
});

export default model<IFisherman>('Fisherman', fishermanSchema);
