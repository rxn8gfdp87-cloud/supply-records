import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

export function RecordsHistory({ storage }) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedSnapshot, setSelectedSnapshot] = useState(null)

  const snapshots = storage.getDailySnapshots()
  const uniqueDates = [...new Set(snapshots.map(s => s.date))].sort().reverse()

  const loadSnapshot = (date) => {
    setSelectedDate(date)
    const snapshot = snapshots.find(s => s.date === date)
    setSelectedSnapshot(snapshot)
  }

  const navigateDate = (direction) => {
    const currentIndex = uniqueDates.indexOf(selectedDate)
    const newIndex = direction === 'prev' ? currentIndex + 1 : currentIndex - 1
    if (newIndex >= 0 && newIndex < uniqueDates.length) {
      loadSnapshot(uniqueDates[newIndex])
    }
  }

  // Load initial snapshot
  if (!selectedSnapshot && uniqueDates.length > 0) {
    loadSnapshot(selectedDate)
  }

  // Organize records by category
  const categories = selectedSnapshot ? Object.keys(selectedSnapshot.records).reduce((acc, id) => {
    const record = selectedSnapshot.records[id]
    if (!acc[record.category]) {
      acc[record.category] = []
    }
    acc[record.category].push(record)
    return acc
  }, {}) : {}

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Historical Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateDate('prev')}
              disabled={uniqueDates.indexOf(selectedDate) >= uniqueDates.length - 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Select Date</label>
              <select
                value={selectedDate}
                onChange={(e) => loadSnapshot(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {uniqueDates.map(date => (
                  <option key={date} value={date}>{date}</option>
                ))}
              </select>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateDate('next')}
              disabled={uniqueDates.indexOf(selectedDate) <= 0}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {uniqueDates.length} snapshot(s) available
          </p>
        </CardContent>
      </Card>

      {selectedSnapshot ? (
        <div className="space-y-6">
          {Object.entries(categories).map(([category, records]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="text-lg">{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {records.map((record) => (
                    <div
                      key={record.id}
                      className="flex items-center justify-between p-3 border rounded-lg bg-accent/50"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{record.name}</h4>
                        <div className="text-xs text-muted-foreground mt-1">
                          {record.date} • {record.day}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{record.count}</p>
                        {record.positive !== undefined && record.positive > 0 && (
                          <p className="text-xs text-red-600 font-medium">
                            Positive: {record.positive}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-8">
            <p className="text-muted-foreground text-center">
              No snapshot available for {selectedDate}. Select a different date or save a snapshot.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
