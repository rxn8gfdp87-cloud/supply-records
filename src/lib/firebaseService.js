import { db } from './firebaseConfig'
import { ref, set, get, update, push, query as rtdbQuery, orderByChild, startAt, endAt } from 'firebase/database'

const PATHS = {
  DAILY_RECORDS: 'dailyRecords',
  TEST_RECORDS: 'testRecords',
  RESTOCK_COUNTS: 'restockCounts',
  CLIENT_COUNT: 'clientCount'
}

// Save daily record to Firebase
export const saveDailyRecord = async (date, data) => {
  try {
    console.log('Saving daily record to Firebase:', date, data)
    const recordRef = ref(db, `${PATHS.DAILY_RECORDS}/${date}`)
    await set(recordRef, {
      ...data,
      timestamp: Date.now(),
      updatedAt: Date.now()
    })
    console.log('Daily record saved successfully')
    return { success: true }
  } catch (error) {
    console.error('Error saving daily record:', error)
    return { success: false, error }
  }
}

// Get daily record by date
export const getDailyRecord = async (date) => {
  try {
    const recordRef = ref(db, `${PATHS.DAILY_RECORDS}/${date}`)
    const snapshot = await get(recordRef)
    
    if (snapshot.exists()) {
      return { success: true, data: snapshot.val() }
    } else {
      return { success: false, message: 'No record found' }
    }
  } catch (error) {
    console.error('Error getting daily record:', error)
    return { success: false, error }
  }
}

// Get all daily records
export const getAllDailyRecords = async () => {
  try {
    const recordsRef = ref(db, PATHS.DAILY_RECORDS)
    const snapshot = await get(recordsRef)
    
    if (snapshot.exists()) {
      const records = Object.entries(snapshot.val()).map(([date, data]) => ({
        id: date,
        date,
        ...data
      }))
      // Sort by date descending
      records.sort((a, b) => b.date.localeCompare(a.date))
      return { success: true, data: records }
    } else {
      return { success: true, data: [] }
    }
  } catch (error) {
    console.error('Error getting all daily records:', error)
    return { success: false, error }
  }
}

// Get daily records within a date range
export const getDailyRecordsInRange = async (startDate, endDate) => {
  try {
    const recordsRef = ref(db, PATHS.DAILY_RECORDS)
    const snapshot = await get(recordsRef)
    
    if (snapshot.exists()) {
      const records = Object.entries(snapshot.val())
        .filter(([date, data]) => date >= startDate && date <= endDate)
        .map(([date, data]) => ({
          id: date,
          date,
          ...data
        }))
      // Sort by date descending
      records.sort((a, b) => b.date.localeCompare(a.date))
      return { success: true, data: records }
    } else {
      return { success: true, data: [] }
    }
  } catch (error) {
    console.error('Error getting daily records in range:', error)
    return { success: false, error }
  }
}

// Save current test records (real-time data)
export const saveTestRecords = async (records) => {
  try {
    console.log('Saving test records to Firebase:', records)
    const recordRef = ref(db, `${PATHS.TEST_RECORDS}/current`)
    await set(recordRef, {
      records,
      updatedAt: Date.now()
    })
    console.log('Test records saved successfully')
    return { success: true }
  } catch (error) {
    console.error('Error saving test records:', error)
    return { success: false, error }
  }
}

// Get current test records
export const getTestRecords = async () => {
  try {
    console.log('Getting test records from Firebase')
    const recordRef = ref(db, `${PATHS.TEST_RECORDS}/current`)
    const snapshot = await get(recordRef)
    
    if (snapshot.exists()) {
      const data = snapshot.val()
      console.log('Test records found:', data)
      return { success: true, data: data.records }
    } else {
      console.log('No test records found in Firebase')
      return { success: false, message: 'No test records found' }
    }
  } catch (error) {
    console.error('Error getting test records:', error)
    return { success: false, error }
  }
}

// Save restock counts
export const saveRestockCounts = async (counts) => {
  try {
    console.log('Saving restock counts to Firebase:', counts)
    const recordRef = ref(db, `${PATHS.RESTOCK_COUNTS}/current`)
    await set(recordRef, {
      counts,
      updatedAt: Date.now()
    })
    console.log('Restock counts saved successfully')
    return { success: true }
  } catch (error) {
    console.error('Error saving restock counts:', error)
    return { success: false, error }
  }
}

// Get restock counts
export const getRestockCounts = async () => {
  try {
    console.log('Getting restock counts from Firebase')
    const recordRef = ref(db, `${PATHS.RESTOCK_COUNTS}/current`)
    const snapshot = await get(recordRef)
    
    if (snapshot.exists()) {
      const data = snapshot.val()
      console.log('Restock counts found:', data)
      return { success: true, data: data.counts }
    } else {
      console.log('No restock counts found in Firebase')
      return { success: false, message: 'No restock counts found' }
    }
  } catch (error) {
    console.error('Error getting restock counts:', error)
    return { success: false, error }
  }
}

// Save client count
export const saveClientCount = async (count) => {
  try {
    console.log('Saving client count to Firebase:', count)
    const recordRef = ref(db, `${PATHS.CLIENT_COUNT}/current`)
    await set(recordRef, {
      count,
      updatedAt: Date.now()
    })
    console.log('Client count saved successfully')
    return { success: true }
  } catch (error) {
    console.error('Error saving client count:', error)
    return { success: false, error }
  }
}

// Get client count
export const getClientCount = async () => {
  try {
    console.log('Getting client count from Firebase')
    const recordRef = ref(db, `${PATHS.CLIENT_COUNT}/current`)
    const snapshot = await get(recordRef)
    
    if (snapshot.exists()) {
      console.log('Client count found:', snapshot.val())
      return { success: true, data: snapshot.val().count }
    } else {
      console.log('No client count found in Firebase')
      return { success: false, message: 'No client count found' }
    }
  } catch (error) {
    console.error('Error getting client count:', error)
    return { success: false, error }
  }
}
