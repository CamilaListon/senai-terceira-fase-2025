import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import Modal from "../Modal/Modal"

const ConsultationExam = () => {

  // estados
  const [searchTerm, setSearchTerm] = useState('')
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    type: "",
    laboratory: "",
    documentUrl: "",
    results: ""
  })

  // busca pacientes
  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:3000/patients")
      setPatients(response.data)
    } catch (error) {
      console.error("Erro ao obter dados")
    }
  }

  useEffect(() => {
    fetchPatients()
  }, [])

  // filtro
  const handleSearchChange = (e) => setSearchTerm(e.target.value)

  const filteredPatients = patients.filter(
    (patient) =>
      patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toString().includes(searchTerm)
  )

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPatient(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      name: "",
      date: "",
      time: "",
      type: "",
      laboratory: "",
      documentUrl: "",
      results: ""
    })
  }

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedPatient) return;

    try {
      setIsSaving(true)

      const dataToSave = {
        patientId: selectedPatient.id,
        ...formData
      }

      await axios.post("http://localhost:3000/exams", dataToSave)

      toast.success("Exame cadastrado com sucesso!", {
        autoClose: 3000,
        hideProgressBar: true
      })

      resetForm()
      handleCloseModal()

    } catch (error) {
      toast.error("Erro ao cadastrar exame!", {
        autoClose: 3000,
        hideProgressBar: true
      })
    } finally {
      setIsSaving(false)
    }
  }


  return (
    <section className='p-6 text-gray-800'>
      {/* Campo de busca */}
      <div className='mb-6'>
        <label htmlFor="name" className='block text-sm font-semibold mb-2'>
          Buscar paciente para cadastrar exame
        </label>
        <input
          id='name'
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder='Digite o nome ou registro do paciente'
          className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none'
        />
      </div>

      {/* lista */}
      <ul className='space-y-3'>
        {filteredPatients.map((patient) => (
          <li
            key={patient.id}
            className='p-4 border rounded-lg shadow-sm flex justify-between items-center hover:bg-gray-50 transition'
          >
            <div>
              <p className='text-sm'><strong>Registro: </strong>{patient.id}</p>
              <p className='text-sm'><strong>Nome: </strong>{patient.fullName}</p>
              <p className='text-sm'><strong>Convênio: </strong>{patient.healthInsurance}</p>
            </div>
            <button
              onClick={() => handleSelectPatient(patient)}
              className='bg-cyan-700 text-white px-3 py-2 rounded-lg hover:bg-cyan-600 transition cursor-pointer'
            >Selecionar</button>
          </li>
        ))}
      </ul>

      {/* modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedPatient && (
          <>
            <h2 className='text-lg font-bold mb-4 text-cyan-700'>
              Cadastro de Exame para {selectedPatient.fullName}
            </h2>

            <div className='mb-4 text-sm text-gray-700'>
              <p><strong>Email: </strong>{selectedPatient.email}</p>
              <p><strong>Telefone: </strong>{selectedPatient.phone}</p>
            </div>

            {/* form */}
            <form onSubmit={handleSubmit} className='space-y-4'>

              <div>
                <label htmlFor="name" className='block text-sm font-medium mb-1'>
                  Nome do Exame:
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className='w-full border p-2 rounded-lg focus:ring-cyan-600 outline-none'
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label htmlFor="date" className='block text-sm font-medium mb-1'>
                    Data:
                  </label>
                  <input
                    type='date'
                    name='date'
                    id='date'
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className='w-full border p-2 rounded-lg focus:ring-cyan-600 outline-none'
                  />
                </div>

                <div>
                  <label htmlFor="time" className='block text-sm font-medium mb-1'>
                    Horário:
                  </label>
                  <input
                    type='time'
                    name='time'
                    id='time'
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className='w-full border p-2 rounded-lg focus:ring-cyan-600 outline-none'
                  />
                </div>
              </div>

              <div>
                <label htmlFor="type" className='block text-sm font-medium mb-1'>
                  Tipo do Exame:
                </label>
                <input
                  type='text'
                  name='type'
                  id='type'
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className='w-full border p-2 rounded-lg focus:ring-cyan-600 outline-none'
                />
              </div>

              <div>
                <label htmlFor="laboratory" className='block text-sm font-medium mb-1'>
                  Laboratório:
                </label>
                <input
                  type='text'
                  name='laboratory'
                  id='laboratory'
                  value={formData.laboratory}
                  onChange={handleInputChange}
                  required
                  className='w-full border p-2 rounded-lg focus:ring-cyan-600 outline-none'
                />
              </div>

              <div>
                <label htmlFor="documentUrl" className='block text-sm font-medium mb-1'>
                  URL do Documento (PDF):
                </label>
                <input
                  type='text'
                  name='documentUrl'
                  id='documentUrl'
                  value={formData.documentUrl}
                  onChange={handleInputChange}
                  required
                  className='w-full border p-2 rounded-lg focus:ring-cyan-600 outline-none'
                />
              </div>

              <div>
                <label htmlFor="results" className='block text-sm font-medium mb-1'>
                  Resultados:
                </label>
                <textarea
                  name='results'
                  id='results'
                  value={formData.results}
                  onChange={handleInputChange}
                  rows='3'
                  required
                  className='w-full border p-2 rounded-lg focus:ring-cyan-600 outline-none'
                />
              </div>

              {/* botões */}
              <div className='flex justify-end gap-3 pt-4'>
                <button
                  type='button'
                  onClick={handleCloseModal}
                  className='px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition cursor-pointer'
                >Cancelar</button>

                <button
                  type='submit'
                  disabled={isSaving}
                  className='px-4 py-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-600 disabled:opacity-50 transition cursor-pointer'
                >
                  {isSaving ? "Salvando..." : "Salvar"}
                </button>
              </div>

            </form>
          </>
        )}
      </Modal>

    </section>
  )
}

export default ConsultationExam
