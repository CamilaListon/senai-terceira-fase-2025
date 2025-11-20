import React, { useState, useEffect } from "react";

const PatientForm = ({ patient, onCancel, onSave }) => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (patient) setFormData(patient);
  }, [patient]);

  if (!formData) return null;

  // ✔ Tradução dos campos para português
  const fieldLabels = {
    fullName: "Nome Completo",
    gender: "Gênero",
    birthdate: "Data de Nascimento",
    cpf: "CPF",
    rg: "RG",
    maritalStatus: "Estado Civil",
    phone: "Telefone",
    email: "E-mail",
    birthplace: "Naturalidade",
    emergencyContact: "Contato de Emergência",
    allergies: "Alergias",
    specialCare: "Cuidados Especiais",
    healthInsurance: "Convênio",
    insuranceNumber: "Número do Convênio",
    insuranceValidity: "Validade do Convênio",

    // Endereço
    cep: "CEP",
    city: "Cidade",
    state: "Estado",
    street: "Rua",
    number: "Número",
    complement: "Complemento",
    neighborhood: "Bairro",
    reference: "Referência"
  };

  const simpleFields = [
    "fullName", "gender", "birthdate", "cpf", "rg", "maritalStatus",
    "phone", "email", "birthplace", "emergencyContact", "allergies",
    "specialCare", "healthInsurance", "insuranceNumber", "insuranceValidity"
  ];

  const addressFields = [
    "cep", "city", "state", "street", "number",
    "complement", "neighborhood", "reference"
  ];

  const handleSimpleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleAddressChange = (key, value) => {
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [key]: value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Campos simples */}
      {simpleFields.map((key) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {fieldLabels[key]}
          </label>

          <input
            type={key.includes("date") ? "date" : "text"}
            value={formData[key] || ""}
            onChange={(e) => handleSimpleChange(key, e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            required={key !== "specialCare"}
          />
        </div>
      ))}

      {/* Endereço */}
      <h3 className="text-lg font-semibold mt-4">Endereço</h3>

      {addressFields.map((key) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {fieldLabels[key]}
          </label>

          <input
            type="text"
            value={formData.address?.[key] || ""}
            onChange={(e) => handleAddressChange(key, e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      ))}

      {/* Botões */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
        >
          Salvar
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default PatientForm;
