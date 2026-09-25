const STORAGE_KEYS = {
  TEST_RECORDS: 'test_records',
  USAGE_RECORDS: 'usage_records',
  DAILY_SNAPSHOTS: 'daily_snapshots',
  RESTOCK_RECORDS: 'restock_records',
  RESTOCK_COUNTS: 'restock_counts'
};

export const storage = {
  getTestRecords: () => {
    const data = localStorage.getItem(STORAGE_KEYS.TEST_RECORDS);
    return data ? JSON.parse(data) : {};
  },
  
  setTestRecords: (records) => {
    localStorage.setItem(STORAGE_KEYS.TEST_RECORDS, JSON.stringify(records));
  },
  
  updateTestCount: (id, delta) => {
    const records = storage.getTestRecords();
    const restockCounts = storage.getRestockCounts();
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    if (records[id]) {
      const newTestCount = Math.max(0, records[id].count + delta);
      
      // Update restock count inversely
      if (restockCounts[id]) {
        const newRestockCount = Math.max(0, restockCounts[id].count - delta);
        
        // Validate: restock cannot go negative when increasing test usage
        if (delta > 0 && restockCounts[id].count < delta) {
          alert('Insufficient restock stock! Please restock first.');
          return records;
        }
        
        restockCounts[id].count = newRestockCount;
        restockCounts[id].lastUpdated = now.toISOString();
        restockCounts[id].date = now.toISOString().split('T')[0];
        restockCounts[id].day = days[now.getDay()];
        storage.setRestockCounts(restockCounts);
      }
      
      records[id].count = newTestCount;
      records[id].lastUpdated = now.toISOString();
      records[id].date = now.toISOString().split('T')[0];
      records[id].day = days[now.getDay()];
      
      // Initialize positive field if not present
      if (!records[id].positive) records[id].positive = 0;
      
      storage.setTestRecords(records);
    }
    return { records, restockCounts };
  },

  updateTestResult: (id, delta = 1) => {
    const records = storage.getTestRecords();
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    if (records[id]) {
      if (!records[id].positive) records[id].positive = 0;
      records[id].positive = Math.max(0, records[id].positive + delta);
      
      records[id].lastUpdated = now.toISOString();
      records[id].date = now.toISOString().split('T')[0];
      records[id].day = days[now.getDay()];
      
      storage.setTestRecords(records);
    }
    return records;
  },

  updateClientCount: (delta) => {
    const clientCount = storage.getClientCount();
    const newCount = Math.max(0, clientCount + delta);
    storage.setClientCount(newCount);
    return newCount;
  },

  getClientCount: () => {
    const data = localStorage.getItem('client_count');
    return data ? parseInt(data) : 0;
  },

  setClientCount: (count) => {
    localStorage.setItem('client_count', count.toString());
  },
  
  setTestCount: (id, count) => {
    const records = storage.getTestRecords();
    if (records[id]) {
      records[id].count = Math.max(0, parseInt(count));
      const now = new Date();
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      records[id].lastUpdated = now.toISOString();
      records[id].date = now.toISOString().split('T')[0];
      records[id].day = days[now.getDay()];
      storage.setTestRecords(records);
    }
    return records;
  },
  
  getUsageRecords: () => {
    const data = localStorage.getItem(STORAGE_KEYS.USAGE_RECORDS);
    return data ? JSON.parse(data) : [];
  },
  
  setUsageRecords: (records) => {
    localStorage.setItem(STORAGE_KEYS.USAGE_RECORDS, JSON.stringify(records));
  },
  
  addUsageRecord: (record) => {
    const records = storage.getUsageRecords();
    records.unshift(record);
    storage.setUsageRecords(records);
  },
  
  resetAllCounts: () => {
    const records = storage.getTestRecords();
    const restockCounts = storage.getRestockCounts();
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    Object.keys(records).forEach(key => {
      records[key].count = 0;
      records[key].lastUpdated = now.toISOString();
      records[key].date = now.toISOString().split('T')[0];
      records[key].day = days[now.getDay()];
    });
    storage.setTestRecords(records);
    
    // Also reset restock counts
    Object.keys(restockCounts).forEach(key => {
      restockCounts[key].count = 0;
      restockCounts[key].lastUpdated = now.toISOString();
      restockCounts[key].date = now.toISOString().split('T')[0];
      restockCounts[key].day = days[now.getDay()];
    });
    storage.setRestockCounts(restockCounts);
    
    return { records, restockCounts };
  },
  
  getDailySnapshots: () => {
    const data = localStorage.getItem(STORAGE_KEYS.DAILY_SNAPSHOTS);
    return data ? JSON.parse(data) : [];
  },
  
  saveDailySnapshot: () => {
    const testRecords = storage.getTestRecords();
    const clientCount = storage.getClientCount();
    const snapshots = storage.getDailySnapshots();
    const today = new Date().toISOString().split('T')[0];
    
    // Check if snapshot already exists for today
    const existingIndex = snapshots.findIndex(s => s.date === today);
    const snapshot = {
      date: today,
      timestamp: new Date().toISOString(),
      records: testRecords,
      clientCount: clientCount
    };
    
    if (existingIndex !== -1) {
      snapshots[existingIndex] = snapshot;
    } else {
      snapshots.unshift(snapshot);
    }
    
    localStorage.setItem(STORAGE_KEYS.DAILY_SNAPSHOTS, JSON.stringify(snapshots));
    return snapshot;
  },

  saveManualSnapshot: (date) => {
    const testRecords = storage.getTestRecords();
    const clientCount = storage.getClientCount();
    const snapshots = storage.getDailySnapshots();
    const snapshotDate = date || new Date().toISOString().split('T')[0];
    
    // Check if snapshot already exists for this date
    const existingIndex = snapshots.findIndex(s => s.date === snapshotDate);
    const snapshot = {
      date: snapshotDate,
      timestamp: new Date().toISOString(),
      records: testRecords,
      clientCount: clientCount
    };
    
    if (existingIndex !== -1) {
      snapshots[existingIndex] = snapshot;
    } else {
      snapshots.unshift(snapshot);
    }
    
    localStorage.setItem(STORAGE_KEYS.DAILY_SNAPSHOTS, JSON.stringify(snapshots));
    return snapshot;
  },
  
  generateWeeklyReport: () => {
    const snapshots = storage.getDailySnapshots();
    const today = new Date();
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const weeklySnapshots = snapshots.filter(s => {
      const snapshotDate = new Date(s.date);
      return snapshotDate >= oneWeekAgo && snapshotDate <= today;
    });
    
    return {
      period: 'Weekly',
      startDate: oneWeekAgo.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0],
      snapshots: weeklySnapshots
    };
  },
  
  generateMonthlyReport: () => {
    const snapshots = storage.getDailySnapshots();
    const today = new Date();
    const oneMonthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const monthlySnapshots = snapshots.filter(s => {
      const snapshotDate = new Date(s.date);
      return snapshotDate >= oneMonthAgo && snapshotDate <= today;
    });
    
    return {
      period: 'Monthly',
      startDate: oneMonthAgo.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0],
      snapshots: monthlySnapshots
    };
  },
  
  getRestockRecords: () => {
    const data = localStorage.getItem(STORAGE_KEYS.RESTOCK_RECORDS);
    return data ? JSON.parse(data) : [];
  },
  
  setRestockRecords: (records) => {
    localStorage.setItem(STORAGE_KEYS.RESTOCK_RECORDS, JSON.stringify(records));
  },
  
  addRestockRecord: (record) => {
    const records = storage.getRestockRecords();
    records.unshift(record);
    storage.setRestockRecords(records);
  },
  
  deleteRestockRecord: (id) => {
    const records = storage.getRestockRecords().filter(r => r.id !== id);
    storage.setRestockRecords(records);
  },
  
  getRestockCounts: () => {
    const data = localStorage.getItem(STORAGE_KEYS.RESTOCK_COUNTS);
    return data ? JSON.parse(data) : {};
  },
  
  setRestockCounts: (counts) => {
    localStorage.setItem(STORAGE_KEYS.RESTOCK_COUNTS, JSON.stringify(counts));
  },
  
  updateRestockCount: (id, delta) => {
    const counts = storage.getRestockCounts();
    if (counts[id]) {
      counts[id].count = Math.max(0, counts[id].count + delta);
      const now = new Date();
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      counts[id].lastUpdated = now.toISOString();
      counts[id].date = now.toISOString().split('T')[0];
      counts[id].day = days[now.getDay()];
      storage.setRestockCounts(counts);
    }
    return counts;
  },
  
  initializeRestockCounts: (testRecords) => {
    const counts = storage.getRestockCounts();
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    Object.keys(testRecords).forEach(key => {
      if (!counts[key]) {
        counts[key] = {
          id: key,
          name: testRecords[key].name,
          category: testRecords[key].category,
          count: 0,
          minStock: 3,
          lastUpdated: now.toISOString(),
          date: now.toISOString().split('T')[0],
          day: days[now.getDay()]
        };
      }
    });
    
    storage.setRestockCounts(counts);
    return counts;
  }
};
