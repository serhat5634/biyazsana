import React from 'react';

const CategoryForm = ({ fields, formData, handleChange, handleSubmit, loading }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm"
    >
      {fields.map((field) => {
        const FieldComponent = field.type === 'textarea' ? 'textarea' : 'input';

        return (
          <FieldComponent
            key={field.name}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name] || ''}
            onChange={handleChange}
            required={field.required}
            rows={field.type === 'textarea' ? 4 : undefined}
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-teal-500"
          />
        );
      })}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg text-white font-semibold transition-shadow duration-200 ${
          loading
            ? 'bg-gray-400 cursor-wait'
            : 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-500 shadow-sm hover:shadow-md'
        }`}
      >
        {loading ? '⏳ Yükleniyor...' : '✨ Yaz Bana!'}
      </button>
    </form>
  );
};

export default CategoryForm;
