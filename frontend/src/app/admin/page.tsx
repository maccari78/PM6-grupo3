import Header from '@/components/admin/Header'
import MainContent from '@/components/admin/MainContent'
import SidebarAdm from '@/components/admin/SidebarAdm'
import React from 'react'

const page = () => {
  return (
    <>
    <div className="App flex min-h-screen">
      <SidebarAdm />
      <div className="flex-grow bg-gray-100 flex flex-col">
        <Header />
        <div className="flex-grow p-6">
          <MainContent />
        </div>
        </div>
    </div>
    </>
  )
}

export default page
