import * as mongoose from "mongoose";
import Usuario from "./Usuario";
class BaseModel extends mongoose.Schema {
  constructor(args, props) {
    super({
      createdAt: Date,
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios" },
      deletedAt: Date,
      deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios" },
      delete: Boolean,
      ...args
    });
    this.virtual("id").get(function() {
      return this._id;
    });
    this.pre("remove", softDelete);
    this.pre("find", select);

    this.set("toJSON", {
      virtuals: true
    });

    for (let key in props) {
      this[key] = props[key];
    }
  }
}

function select() {
  this.where({ $or: [{ delete: false }, { delete: undefined }] });
}

function softDelete(next: Function) {
  this.delete = true;
  this.deletedAt = new Date();
  this.save();
  next(new Error("Apagado"));
  return;
}

export default BaseModel;
