import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const LoadForm = ({ initialData = {}, onSave, nextLoadNumber }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialData });

  useEffect(() => {
    if (!initialData.loadNumber) {
      reset({ ...initialData, loadNumber: nextLoadNumber });
    }
  }, [nextLoadNumber, initialData, reset]);

  const onSubmit = async (data) => {
    await onSave(data);
    reset({ loadNumber: nextLoadNumber + 1 });
  };

  return (
    <div className="bg-gray-800 pt-6 pb-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-900 text-white shadow-xl rounded-xl p-8 max-w-7xl mx-auto space-y-6"
      >
        <h2 className="text-2xl font-semibold text-yellow-300">Load Details</h2>

        {/* Primary Info */}
        <div className="grid grid-cols-4 gap-6">
          <Input label="Load Number" name="loadNumber" type="number" readOnly register={register} />
          <Input label="Required Docs" name="requiredDocs" type="number" register={register} />
          <Input label="Dispatch Evaluation" name="dispatchEvaluation" register={register} />
          <Input label="Shipment Number" name="shipmentNumber" register={register} />
        </div>

        {/* Customer & Equipment */}
        <div className="grid grid-cols-4 gap-6">
          <Input label="Branch" name="branch" register={register} />
          <Input label="Customer" name="customer" register={register} />
          <Input label="Equipment Length" name="equipmentLength" type="number" register={register} />
          <Input label="Equipment Type" name="equipmentType" register={register} />
        </div>

        {/* Pickup Info */}
        <div className="grid grid-cols-4 gap-6">
          <Input label="Carrier" name="carrier" register={register} />
          <Input label="Pickup Number" name="pickupNumber" register={register} />
          <Input label="Shipper City" name="shipperCity" register={register} />
          <Input label="Shipper State" name="shipperState" register={register} />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <Input label="Available Pickup" name="availablePickup" type="date" register={register} />
          <Input label="Required Pickup" name="requiredPickup" type="date" register={register} />
          <Input label="Actual Pickup" name="actualPickup" type="date" register={register} />
        </div>

        {/* Delivery Info */}
        <div className="grid grid-cols-4 gap-6">
          <Input label="Delivery Number" name="deliveryNumber" register={register} />
          <Input label="Consignee City" name="consigneeCity" register={register} />
          <Input label="Consignee State" name="consigneeState" register={register} />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <Input label="Available Delivery" name="availableDelivery" type="date" register={register} />
          <Input label="Required Delivery" name="requiredDelivery" type="date" register={register} />
          <Input label="Actual Delivery" name="actualDelivery" type="date" register={register} />
        </div>

        {/* Status & Tracking */}
        <div className="grid grid-cols-4 gap-6">
          <Input label="Operator" name="operator" register={register} />
          <Select label="Status" name="status" register={register} options={['Delivered', 'In Transit', 'Pending', 'Cancelled']} />
          <Checkbox label="Macropoint Enabled" name="macropoint" register={register} />
          <Input label="ETA" name="eta" register={register} />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Select label="ETA Status" name="etaStatus" register={register} options={['On Time', 'Behind', 'Ahead']} />
        </div>

        {/* Submit */}
        <div className="flex justify-between items-center pt-6">
          <button
            type="submit"
            className="bg-yellow-300 hover:bg-yellow-200 text-black font-semibold px-6 py-2 rounded transition"
          >
            Save Load
          </button>
        </div>
      </form>
    </div>
  );
};

// Reusable Input Component
const Input = ({ label, name, type = 'text', register, readOnly = false }) => (
  <div>
    <label className="block mb-1 font-semibold">{label}</label>
    <input
      {...register(name)}
      type={type}
      readOnly={readOnly}
      className="w-full bg-gray-200 border-gray-700 rounded px-0.5 py-0.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
  </div>
);

// Reusable Select Component
const Select = ({ label, name, register, options }) => (
  <div>
    <label className="block mb-1 font-semibold">{label}</label>
    <select
      {...register(name)}
      className="w-full bg-gray-200 border-gray-700 rounded px-0.5 py-0.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
    >
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

// Reusable Checkbox Component
const Checkbox = ({ label, name, register }) => (
  <div className="flex items-center space-x-3 mt-7">
    <input
      type="checkbox"
      {...register(name)}
      className="form-checkbox h-5 w-5 text-teal-500 bg-gray-200 border-gray-700 focus:ring-teal-500"
    />
    <label className="text-sm font-semibold">{label}</label>
  </div>
);

export default LoadForm;