import React, { useState } from 'react';

// Classe de estilo reutilizável para campos de input e select (Tailwind CSS)
const inputClass = "w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500";
const labelClass = "block text-sm font-medium text-gray-700";
const gridContainerClass = "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4";
const sidebarItemClass = "p-3 flex items-center text-white cursor-pointer hover:bg-teal-700 transition-colors";

function PatientRegistrationForm() {
    // Estado inicial com os dados fornecidos pelo usuário
    const [formData, setFormData] = useState({
        fullName: "",
        gender: "",
        birthdate: "",
        cpf: "",
        rg: "",
        maritalStatus: "",
        phone: "",
        email: "",
        birthplace: "",
        emergencyContact: "",
        allergies: "",
        specialCare: "",
        healthInsurance: "",
        insuranceNumber: "",
        insuranceValidity: "",
        address: {
            cep: "",
            city: "",
            state: "",
            street: "",
            number: "",
            complement: "",
            neighborhood: "",
            reference: "",
        },
    });

    // Função de tratamento de mudança para campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Verifica se o campo pertence ao objeto 'address'
        if (Object.keys(formData.address).includes(name)) {
            setFormData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [name]: value
                }
            }));
        } else {
            // Se for um campo de nível superior
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    // Função de tratamento de envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dados a serem salvos:", formData);
        alert("Formulário de cadastro (simulado) enviado! Verifique o console para os dados.");
        // Aqui você faria a chamada à API para salvar os dados
    };

    return (
        <div className="flex min-h-screen">

            {/* Conteúdo Principal / Formulário */}
            <div className="flex-grow p-8">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Cadastro de Paciente</h1>

                <form className="bg-white p-6 rounded-lg shadow-xl" onSubmit={handleSubmit}>

                    {/* Informações Pessoais */}
                    <fieldset className="mb-8 pb-4 border-b border-gray-200">
                        <legend className="text-lg font-semibold mb-4 text-teal-800">Dados Pessoais</legend>
                        <div className={gridContainerClass}>

                            {/* Nome Completo / Gênero */}
                            <div>
                                <label htmlFor="fullName" className={labelClass}>Nome Completo</label>
                                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className={inputClass} required />
                            </div>
                            <div>
                                <label htmlFor="gender" className={labelClass}>Gênero</label>
                                <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className={inputClass} required>
                                    <option value="">Selecione</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                    <option value="Outro">Outro</option>
                                </select>
                            </div>

                            {/* Data de Nascimento / CPF */}
                            <div>
                                <label htmlFor="birthdate" className={labelClass}>Data de Nascimento</label>
                                <input type="date" id="birthdate" name="birthdate" value={formData.birthdate} onChange={handleChange} className={inputClass} required />
                            </div>
                            <div>
                                <label htmlFor="cpf" className={labelClass}>CPF</label>
                                <input type="text" id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} className={inputClass} required />
                            </div>

                            {/* RG / Estado Civil */}
                            <div>
                                <label htmlFor="rg" className={labelClass}>RG</label>
                                <input type="text" id="rg" name="rg" value={formData.rg} onChange={handleChange} className={inputClass} />
                            </div>
                            <div>
                                <label htmlFor="maritalStatus" className={labelClass}>Estado Civil</label>
                                <select id="maritalStatus" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className={inputClass}>
                                    <option value="">Selecione</option>
                                    <option value="Solteiro">Solteiro</option>
                                    <option value="Casado">Casado</option>
                                    <option value="Divorciado">Divorciado</option>
                                    <option value="Viúvo">Viúvo</option>
                                </select>
                            </div>

                            {/* Telefone / Contato de Emergência */}
                            <div>
                                <label htmlFor="phone" className={labelClass}>Telefone</label>
                                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} />
                            </div>
                            <div>
                                <label htmlFor="emergencyContact" className={labelClass}>Contato de Emergência</label>
                                <input type="tel" id="emergencyContact" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} className={inputClass} />
                            </div>

                            {/* E-mail / Naturalidade */}
                            <div>
                                <label htmlFor="email" className={labelClass}>E-mail</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} />
                            </div>
                            <div>
                                <label htmlFor="birthplace" className={labelClass}>Naturalidade</label>
                                <input type="text" id="birthplace" name="birthplace" value={formData.birthplace} onChange={handleChange} className={inputClass} />
                            </div>
                        </div>
                    </fieldset>

                    {/* Informações Médicas e Convênio */}
                    <fieldset className="mb-8 pb-4 border-b border-gray-200">
                        <legend className="text-lg font-semibold mb-4 text-teal-800">Informações Adicionais</legend>
                        <div className={gridContainerClass}>
                            {/* Alergias / Cuidados Especiais */}
                            <div>
                                <label htmlFor="allergies" className={labelClass}>Alergias</label>
                                <input type="text" id="allergies" name="allergies" value={formData.allergies} onChange={handleChange} className={inputClass} />
                            </div>
                            <div>
                                <label htmlFor="specialCare" className={labelClass}>Cuidados Especiais</label>
                                <input type="text" id="specialCare" name="specialCare" value={formData.specialCare} onChange={handleChange} className={inputClass} />
                            </div>

                            {/* Convênio / Número do Convênio */}
                            <div>
                                <label htmlFor="healthInsurance" className={labelClass}>Convênio</label>
                                <input type="text" id="healthInsurance" name="healthInsurance" value={formData.healthInsurance} onChange={handleChange} className={inputClass} />
                            </div>
                            <div>
                                <label htmlFor="insuranceNumber" className={labelClass}>Número do Convênio</label>
                                <input type="text" id="insuranceNumber" name="insuranceNumber" value={formData.insuranceNumber} onChange={handleChange} className={inputClass} />
                            </div>

                            {/* Validade do Convênio / CEP */}
                            <div>
                                <label htmlFor="insuranceValidity" className={labelClass}>Validade do Convênio</label>
                                <input type="date" id="insuranceValidity" name="insuranceValidity" value={formData.insuranceValidity} onChange={handleChange} className={inputClass} />
                            </div>
                            <div>
                                <label htmlFor="cep" className={labelClass}>CEP</label>
                                <input type="text" id="cep" name="cep" value={formData.address.cep} onChange={handleChange} className={inputClass} />
                            </div>
                        </div>
                    </fieldset>

                    {/* Endereço */}
                    <fieldset>
                        <legend className="text-lg font-semibold mb-4 text-teal-800">Endereço</legend>
                        <div className={gridContainerClass}>
                            {/* Rua / Número */}
                            <div>
                                <label htmlFor="street" className={labelClass}>Rua</label>
                                <input type="text" id="street" name="street" value={formData.address.street} onChange={handleChange} className={inputClass} />
                            </div>
                            <div>
                                <label htmlFor="number" className={labelClass}>Número</label>
                                <input type="text" id="number" name="number" value={formData.address.number} onChange={handleChange} className={inputClass} />
                            </div>

                            {/* Referência / Complemento */}
                            <div>
                                <label htmlFor="reference" className={labelClass}>Referência</label>
                                <input type="text" id="reference" name="reference" value={formData.address.reference} onChange={handleChange} className={inputClass} />
                            </div>
                            <div>
                                <label htmlFor="complement" className={labelClass}>Complemento</label>
                                <input type="text" id="complement" name="complement" value={formData.address.complement} onChange={handleChange} className={inputClass} />
                            </div>

                            {/* Bairro / Cidade */}
                            <div>
                                <label htmlFor="neighborhood" className={labelClass}>Bairro</label>
                                <input type="text" id="neighborhood" name="neighborhood" value={formData.address.neighborhood} onChange={handleChange} className={inputClass} />
                            </div>
                            <div>
                                <label htmlFor="city" className={labelClass}>Cidade</label>
                                <input type="text" id="city" name="city" value={formData.address.city} onChange={handleChange} className={inputClass} />
                            </div>

                            {/* Estado (Campo único, span-col-2) */}
                            <div className="col-span-1 md:col-span-2">
                                <label htmlFor="state" className={labelClass}>Estado</label>
                                <input type="text" id="state" name="state" value={formData.address.state} onChange={handleChange} className={inputClass} />
                            </div>
                        </div>
                    </fieldset>

                    {/* Botão Salvar */}
                    <div className="flex justify-end mt-8 pt-4 border-t border-gray-200">
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition-colors shadow-md">
                            Salvar
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

// Exporta o componente
export default PatientRegistrationForm;