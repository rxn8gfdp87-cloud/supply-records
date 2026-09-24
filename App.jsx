import { useState, useEffect } from 'react'
import { Button } from './components/ui/button'
import { Dashboard } from './components/Dashboard'
import { TestRecordList } from './components/TestRecordList'
import { Reports } from './components/Reports'
import { Restock } from './components/Restock'
import { RecordsHistory } from './components/RecordsHistory'
import { storage } from './lib/storage'
import { initializeTestRecords } from './lib/testsData'
import { DailyScheduler } from './lib/scheduler'
import { Activity, ClipboardList, FileText, Package, History } from 'lucide-react'

function App() {
  const [testRecords, setTestRecords] = useState({})
  const [restockCounts, setRestockCounts] = useState({})
  const [clientCount, setClientCount] = useState(0)
  const [records, setRecords] = useState([])
  const [activeTab, setActiveTab] = useState('records')

  useEffect(() => {
    // Initialize test records if not exists
    const existingRecords = storage.getTestRecords()
    const initialRecords = initializeTestRecords()
    const now = new Date()
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    
    if (Object.keys(existingRecords).length === 0) {
      storage.setTestRecords(initialRecords)
      setTestRecords(initialRecords)
    } else {
      // Update existing records and add any new tests
      Object.keys(initialRecords).forEach(key => {
        if (!existingRecords[key]) {
          // Add new test
          existingRecords[key] = initialRecords[key]
        } else {
          // Update existing test fields
          if (existingRecords[key].minStock !== 3) {
            existingRecords[key].minStock = 3
          }
          if (!existingRecords[key].date) {
            existingRecords[key].date = now.toISOString().split('T')[0]
            existingRecords[key].day = days[now.getDay()]
            existingRecords[key].lastUpdated = now.toISOString()
          }
        }
      })
      storage.setTestRecords(existingRecords)
      setTestRecords(existingRecords)
    }
    
    setRecords(storage.getUsageRecords())
    
    // Initialize client count
    setClientCount(storage.getClientCount())
    
    // Initialize restock counts separately
    const existingRestockCounts = storage.getRestockCounts()
    const initializedRestockCounts = storage.initializeRestockCounts(initialRecords)
    setRestockCounts(initializedRestockCounts)
    
    // Initialize daily scheduler at 9pm
    const scheduler = new DailyScheduler(() => {
      storage.saveDailySnapshot()
      // Reset only test records (daily usage), not restock counts
      const records = storage.getTestRecords()
      const now = new Date()
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      
      Object.keys(records).forEach(key => {
        records[key].count = 0
        records[key].lastUpdated = now.toISOString()
        records[key].date = now.toISOString().split('T')[0]
        records[key].day = days[now.getDay()]
      })
      storage.setTestRecords(records)
      setTestRecords(records)
      
      console.log('Daily snapshot saved and test records reset at 9:00 PM')
    }, 21, 0) // 9:00 PM
    scheduler.start()
    
    return () => {
      scheduler.stop()
    }
  }, [])

  const handleUpdateCount = (id, delta) => {
    const result = storage.updateTestCount(id, delta)
    if (result && result.records) {
      setTestRecords(result.records)
      if (result.restockCounts) {
        setRestockCounts(result.restockCounts)
      }
    }
  }

  const handleUpdateResult = (id) => {
    const updatedRecords = storage.updateTestResult(id, 1)
    setTestRecords(updatedRecords)
  }

  const handleDecrementResult = (id) => {
    const updatedRecords = storage.updateTestResult(id, -1)
    setTestRecords(updatedRecords)
  }

  const handleUpdateRestockCount = (id, delta) => {
    const updatedCounts = storage.updateRestockCount(id, delta)
    setRestockCounts(updatedCounts)
  }

  const handleUpdateClientCount = (delta) => {
    const newCount = storage.updateClientCount(delta)
    setClientCount(newCount)
  }

  const handleResetAll = () => {
    if (confirm('Are you sure you want to reset all test counts to zero?')) {
      const result = storage.resetAllCounts()
      if (result && result.records) {
        setTestRecords(result.records)
        if (result.restockCounts) {
          setRestockCounts(result.restockCounts)
        }
      }
    }
  }

  const handleNavigate = (action) => {
    if (action === 'restock') {
      setActiveTab('restock')
    }
  }

  const tabs = [
    { id: 'records', label: 'Records', icon: Activity },
    { id: 'dashboard', label: 'Dashboard', icon: ClipboardList },
    { id: 'restock', label: 'Restock', icon: Package },
    { id: 'history', label: 'History', icon: History },
    { id: 'reports', label: 'Reports', icon: FileText }
  ]

  const testArray = Object.values(testRecords)
  const restockArray = Object.values(restockCounts)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Pink Clinic Test Records
          </h1>
          <p className="text-gray-600">
            Track and manage medical test inventory
          </p>
        </header>

        <nav className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2"
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </Button>
          ))}
        </nav>

        <div className="space-y-6">
          {activeTab === 'records' && (
            <TestRecordList testRecords={testRecords} onUpdateCount={handleUpdateCount} onResetAll={handleResetAll} onUpdateResult={handleUpdateResult} onDecrementResult={handleDecrementResult} />
          )}

          {activeTab === 'dashboard' && (
            <>
              <Dashboard supplies={restockArray} testRecords={testRecords} records={records} onNavigate={handleNavigate} clientCount={clientCount} onUpdateClientCount={handleUpdateClientCount} />
              <TestRecordList testRecords={testRecords} onUpdateCount={handleUpdateCount} onResetAll={handleResetAll} />
            </>
          )}

          {activeTab === 'restock' && (
            <Restock restockCounts={restockCounts} onUpdateCount={handleUpdateRestockCount} />
          )}

          {activeTab === 'history' && (
            <RecordsHistory storage={storage} />
          )}

          {activeTab === 'reports' && (
            <Reports storage={storage} />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
