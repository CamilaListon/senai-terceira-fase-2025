import React from 'react'
import PatientsCounter from '../../components/Counters/PatientsCounter'
import ExamsCounter from '../../components/Counters/ExamsCounter'
import ConsultsCounter from '../../components/Counters/ConsultsCounter'
import PatientList from '../../components/PatientList/PatientList'



function Dashboard() {
    return (
        <>
            <h2 className='text-xl font-semibold mb-4'>Estatísticas do Sistema</h2>
            <div className='flex gap-6'>
                <PatientsCounter />
                <ExamsCounter />
                <ConsultsCounter />
            </div>
            <div className='mb-4 rounded-lg gap-3'>
                <PatientList/>
            </div>
        </>
    )
}

export default Dashboard