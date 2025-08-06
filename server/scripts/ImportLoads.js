import mongoose from 'mongoose';
import xlsx from 'xlsx';
import Load from '../models/loadModel.js'; // Adjust path to your schema file
import dotenv from 'dotenv';
dotenv.config();    

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function importExcel(filePath) {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const loads = sheetData.map(row => ({
      loadNumber: row.loadNumber,
      shipmentNumber: row.shipmentNumber,
      branch: row.branch,
      customer: row.customer,
      carrier: row.carrier,
      pickupNumber: row.pickupNumber,
      shipperCity: row.shipperCity,
      shipperState: row.shipperState,
      loadPickupDate: new Date(row.loadPickupDate),
      loadPickupTime1: row.loadPickupTime1,
      consigneeCity: row.consigneeCity,
      consigneeState: row.consigneeState,
      loadPickupTime2: row.loadPickupTime2,
      loadDeliveryDate: new Date(row.loadDeliveryDate),
      loadDeliveryTime1: row.loadDeliveryTime1,
      loadDeliveryTime2: row.loadDeliveryTime2,
      equipmentLength: row.equipmentLength,
      equipmentType: row.equipmentType,
      operator: row.operator,
      driver: row.driver,
      driverPhone: row.driverPhone,
      dispatchName: row.dispatchName,
      dispatchPhone: row.dispatchPhone,
      dispatchEmail: row.dispatchEmail,
      status: row.status,
      carrierCharges: row.carrierCharges,
      customerCharges: row.customerCharges,
      mode: row.mode
    }));

    await Load.insertMany(loads);
    console.log('Excel data successfully imported into MongoDB!');
  } catch (error) {
    console.error('Error importing Excel data:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Example usage
importExcel('./report1.xlsx'); // Adjust the path to your Excel file
