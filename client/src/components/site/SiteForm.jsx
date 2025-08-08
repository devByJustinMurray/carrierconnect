import React from 'react';
import { useForm } from 'react-hook-form';

const SiteForm = ({ initialData = {}, onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialData });

  const onSubmit = (data) => {
    onSave(data);
    reset();
  };

  return (
<div className='bg-gray-800'>' 
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-900 text-white shadow-xl rounded-xl p-8 max-w-7xl mx-auto space-y-5"
    >
      <h2 className="text-2xl font-semibold text-yellow-300">Site Details</h2>

      {/* Internal ID & EDI Location Code & Division */}
      <div className="grid grid-cols-4 gap-6">
        <div>
          <label className="block mb-1 font-semibold">Customer Reference</label>
          <input
            {...register('customerReference')}
            className="w-full bg-gray-200  border-gray-700 rounded px-0.5 py-0.5 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-gray-900"
          />
          {errors.name && <span className="text-red-400 text-sm">Required</span>}
        </div>
        <div>
          <label className="block mb-1 font-semibold">Internal Reference</label>
          <input
            {...register('internalReference')}
            className="w-full bg-gray-200 border border-gray-700 rounded px-0.5 py-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500"/>
        </div>
        
        <div className="flex items-center space-x-3 mt-7 justify-self-end">
          <label className=" pr-6 font-semibold">Division</label>
          <input
            type="checkbox"
            {...register('isActive')}
            className="form-checkbox h-5 w-5 text-teal-500 bg-gray-200 border-gray-700 focus:ring-teal-500"/>
          <label className="text-sm font-semibold">Watco</label>
          <input
            type="checkbox"
            {...register('isActive')}
            className="form-checkbox h-5 w-5 text-teal-500 bg-gray-200 border-gray-700 focus:ring-teal-500"/>
          <label className="text-sm font-semibold">Aspen</label>
        </div>
        <div className="flex items-center justify-items-start space-x-3 mt-7">
          <input
            type="checkbox"
            {...register('isActive')}
            className="form-checkbox h-5 w-5 text-teal-500 bg-gray-200 border-gray-700 focus:ring-teal-500"/>
          <label className="text-sm font-semibold">Mid-Ship</label>
          <input
            type="checkbox"
            {...register('isActive')}
            className="form-checkbox h-5 w-5 text-teal-500 bg-gray-200 border-gray-700 focus:ring-teal-500"/>
          <label className="text-sm font-semibold">Staples</label>
        </div>

      </div>
      <div className="grid grid-cols-4 gap-6">
        <div>
          <label className="block mb-1 font-semibold">Name *</label>
          <input
            {...register('name', { required: true })}
            className="w-full bg-gray-200 border border-gray-700 rounded px-0.5 py-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {errors.name && <span className="text-red-400 text-sm">Required</span>}
        </div>
        <div>
          <label className="block mb-1 font-semibold">Location Code</label>
          <input
            {...register('locationCode')}
            className="w-full bg-gray-200 border border-gray-700 rounded px-0.5 py-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>
      {/* Address */}
      <div className="grid grid-cols-3 gap-6">
        <div>
          <label className="block mb-1 font-semibold">Address</label>
          <input
            {...register('address')}
            className="w-full bg-gray-200 border border-gray-700 rounded px-0.5 py-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div></div>
        <div>
          <label className="block mb-1 font-semibold">Apartment / Suite / Unit / Building *</label>
          <input
            {...register('address2', { required: true })}
            className="w-full bg-gray-200 border border-gray-700 rounded px-0.5 py-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {errors.city && <span className="text-red-400 text-sm">Required</span>}
        </div>
      </div>

      {/* State, Zip, Country */}
      <div className="grid grid-cols-3 gap-6">
        <div>
          <label className="block mb-1 font-semibold">Apartment / Suite / Unit / Building</label>
          <input
            {...register('city', { required: true })}
            className="w-full bg-gray-200 border border-gray-700 rounded px-0.5 py-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Zip *</label>
          <input
            {...register('zip', { required: true })}
            className="w-full bg-gray-200 border border-gray-700 rounded px-0.5 py-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Country *</label>
          <input
            {...register('country', { required: true })}
            className="w-full bg-gray-200 border border-gray-700 rounded px-0.5 py-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-semibold">Phone</label>
          <input
            {...register('phone')}
            className="w-full bg-gray-200 border border-gray-700 rounded px-0.5 py-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            {...register('email')}
            className="w-full bg-gray-200 border border-gray-700 rounded px-0.5 py-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Coordinates */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-semibold">Latitude</label>
          <input
            type="number"
            step="any"
            {...register('latitude')}
            className="w-full bg-gray-200 border border-gray-700 rounded px-0.5 py-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Longitude</label>
          <input
            type="number"
            step="any"
            {...register('longitude')}
            className="w-full bg-gray-200 border border-gray-700 rounded px-0.5 py-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Notes */}
      <div className='grid grid-cols-2 gap-6  '>  
        <div><label className="block mb-1  font-semibold">Internal Notes</label>
        <textarea
          {...register('internalNotes')}
          rows={3}
          className="w-full bg-gray-200 border border-gray-700 rounded px-0.5 py-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-between items-center pt-6">
        <button
          type="submit"
          className="bg-yellow-300 hover:bg-yellow-200 text-black font-semibold px-6 py-2 rounded transition"
        >
          Save Site
        </button>

      </div>
    </form>
</div>
  );
};

export default SiteForm;