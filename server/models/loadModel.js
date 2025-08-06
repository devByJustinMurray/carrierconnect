import mongoose from 'mongoose';


const loadSchema = new mongoose.Schema({
  loadNumber: { type: Number },
  shipmentNumber: { type: String },
  branch: { type: String },
  customer: { type: String },
  carrier: { type: String },
  pickupNumber: { type: String },
  shipperCity: { type: String },
  shipperState: { type: String },
  loadPickupDate: { type: String },
  loadPickupTime1: { type: String },
  loadPickupTime2: { type: String },
  consigneeCity: { type: String },
  consigneeState: { type: String },
  loadDeliveryDate: { type: String },
  loadDeliveryTime1: { type: String},
  loadDeliveryTime2: { type: String },
  equipmentLength: { type: String },
  equipmentType: { type: String },
  operator: { type: String },
  driver: { type: String },
  driverPhone: { type: String },
  dispatchName: { type: String },
  dispatchPhone: { type: String },
  dispatchEmail: { type: String },
  status: { type: String },
  carrierCharges: { type: Number },
  customerCharges: { type: Number},
  mode: { type: String }
}, { timestamps: true });

const Load = mongoose.module = mongoose.model('Load', loadSchema);

export default Load

