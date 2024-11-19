import mongoose, { Document, Schema } from 'mongoose';

// Interface décrivant la structure du document
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

// Définir le schéma Mongoose
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Créer le modèle avec le schéma et l'interface
const User = mongoose.model<IUser>('User', UserSchema);

export default User;
