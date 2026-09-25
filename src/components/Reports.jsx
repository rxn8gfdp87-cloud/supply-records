import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Select, SelectItem } from './ui/select'
import { Calendar, Download, TrendingUp, Save } from 'lucide-react'
import { format } from 'date-fns'
import jsPDF from 'jspdf'

export function Reports({ storage }) {
  const [reportType, setReportType] = useState('daily')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [currentReport, setCurrentReport] = useState(null)
  const [saveDate, setSaveDate] = useState(new Date().toISOString().split('T')[0])

  const saveSnapshot = () => {
    storage.saveManualSnapshot(saveDate)
    alert(`Snapshot saved for ${saveDate}`)
  }

  const generateReport = () => {
    let report
    if (reportType === 'daily') {
      const snapshots = storage.getDailySnapshots()
      const snapshot = snapshots.find(s => s.date === selectedDate)
      report = {
        period: 'Daily',
        date: selectedDate,
        snapshot: snapshot
      }
    } else if (reportType === 'weekly') {
      report = storage.generateWeeklyReport()
    } else if (reportType === 'monthly') {
      report = storage.generateMonthlyReport()
    }
    setCurrentReport(report)
  }

  const downloadReport = (format = 'txt') => {
    if (!currentReport) return
    
    if (format === 'txt') {
      let content = ''
      if (reportType === 'daily') {
        content = `Daily Report - ${currentReport.date}\n\n`
        if (currentReport.snapshot) {
          content += `Client Count: ${currentReport.snapshot.clientCount || 0}\n\n`
          Object.entries(currentReport.snapshot.records).forEach(([id, test]) => {
            content += `${test.name} (${test.category}): ${test.count}`
            if (test.positive > 0) {
              content += ` | Positive: ${test.positive}`
            }
            content += '\n'
          })
        } else {
          content += 'No snapshot available for this date.\n'
        }
      } else {
        content = `${currentReport.period} Report\n`
        content += `Period: ${currentReport.startDate} to ${currentReport.endDate}\n\n`
        content += `Total Snapshots: ${currentReport.snapshots.length}\n\n`
        currentReport.snapshots.forEach(snap => {
          content += `\n--- ${snap.date} ---\n`
          content += `Client Count: ${snap.clientCount || 0}\n`
          Object.entries(snap.records).forEach(([id, test]) => {
            content += `${test.name}: ${test.count}`
            if (test.positive > 0) {
              content += ` | Positive: ${test.positive}`
            }
            content += '\n'
          })
        })
      }

      const blob = new Blob([content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${reportType}_report_${new Date().toISOString().split('T')[0]}.txt`
      a.click()
      URL.revokeObjectURL(url)
    } else if (format === 'csv') {
      let csvContent = ''
      if (reportType === 'daily') {
        csvContent = 'Date,Test Name,Category,Count,Positive Results\n'
        if (currentReport.snapshot) {
          Object.entries(currentReport.snapshot.records).forEach(([id, test]) => {
            csvContent += `${currentReport.snapshot.date},"${test.name}","${test.category}",${test.count},${test.positive || 0}\n`
          })
        }
      } else {
        csvContent = 'Date,Test Name,Category,Count,Positive Results\n'
        currentReport.snapshots.forEach(snap => {
          Object.entries(snap.records).forEach(([id, test]) => {
            csvContent += `${snap.date},"${test.name}","${test.category}",${test.count},${test.positive || 0}\n`
          })
        })
      }

      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${reportType}_report_${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } else if (format === 'pdf') {
      const doc = new jsPDF()
      let y = 20
      
      doc.setFontSize(20)
      doc.text(`${currentReport.period} Report`, 20, y)
      y += 15
      
      if (reportType === 'daily') {
        doc.setFontSize(12)
        doc.text(`Date: ${currentReport.date}`, 20, y)
        y += 10
        
        if (currentReport.snapshot) {
          doc.text(`Client Count: ${currentReport.snapshot.clientCount || 0}`, 20, y)
          y += 15
          
          doc.setFontSize(10)
          Object.entries(currentReport.snapshot.records).forEach(([id, test]) => {
            if (y > 270) {
              doc.addPage()
              y = 20
            }
            const text = `${test.name} (${test.category}): ${test.count}${test.positive > 0 ? ` | Positive: ${test.positive}` : ''}`
            doc.text(text, 20, y)
            y += 8
          })
        } else {
          doc.text('No snapshot available for this date.', 20, y)
        }
      } else {
        doc.setFontSize(12)
        doc.text(`Period: ${currentReport.startDate} to ${currentReport.endDate}`, 20, y)
        y += 10
        doc.text(`Total Snapshots: ${currentReport.snapshots.length}`, 20, y)
        y += 15
        
        doc.setFontSize(10)
        currentReport.snapshots.forEach(snap => {
          if (y > 270) {
            doc.addPage()
            y = 20
          }
          doc.setFontSize(11)
          doc.text(`${snap.date} - Clients: ${snap.clientCount || 0}`, 20, y)
          y += 8
          doc.setFontSize(10)
          Object.entries(snap.records).forEach(([id, test]) => {
            if (y > 270) {
              doc.addPage()
              y = 20
            }
            const text = `  ${test.name}: ${test.count}${test.positive > 0 ? ` (+${test.positive})` : ''}`
            doc.text(text, 20, y)
            y += 6
          })
          y += 5
        })
      }
      
      doc.save(`${reportType}_report_${new Date().toISOString().split('T')[0]}.pdf`)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Save className="h-5 w-5" />
            Manual Snapshot Save
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Save Date</label>
              <input
                type="date"
                value={saveDate}
                onChange={(e) => setSaveDate(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <Button onClick={saveSnapshot} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Snapshot
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Manually save a snapshot for any date. Use this if the automated 9:00 PM save was missed.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Generate Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Report Type</label>
              <Select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                <SelectItem value="daily">Daily Report</SelectItem>
                <SelectItem value="weekly">Weekly Report</SelectItem>
                <SelectItem value="monthly">Monthly Report</SelectItem>
              </Select>
            </div>
            {reportType === 'daily' && (
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            )}
            <Button onClick={generateReport} className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Generate
            </Button>
          </div>
        </CardContent>
      </Card>

      {currentReport && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{currentReport.period} Report</CardTitle>
              <div className="flex gap-2">
                <Button onClick={() => downloadReport('txt')} variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  TXT
                </Button>
                <Button onClick={() => downloadReport('csv')} variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  CSV
                </Button>
                <Button onClick={() => downloadReport('pdf')} variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {reportType === 'daily' ? (
              <div>
                <p className="text-sm text-muted-foreground mb-4">Date: {currentReport.date}</p>
                {currentReport.snapshot ? (
                  <div>
                    <div className="mb-4 p-3 bg-accent/50 rounded">
                      <p className="font-semibold">Client Count: {currentReport.snapshot.clientCount || 0}</p>
                    </div>
                    <div className="space-y-2">
                      {Object.entries(currentReport.snapshot.records).map(([id, test]) => (
                        <div key={id} className="flex justify-between p-2 border rounded">
                          <div className="flex-1">
                            <span>{test.name} ({test.category})</span>
                            {test.positive > 0 && (
                              <span className="ml-2 text-red-600 font-medium">Positive: {test.positive}</span>
                            )}
                          </div>
                          <span className="font-semibold">{test.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No snapshot available for this date. Records are saved automatically at 9:00 PM.</p>
                )}
              </div>
            ) : (
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Period: {currentReport.startDate} to {currentReport.endDate}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Total Snapshots: {currentReport.snapshots.length}
                </p>
                {currentReport.snapshots.length > 0 ? (
                  <div className="space-y-4">
                    {currentReport.snapshots.map((snap, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold">{snap.date}</h4>
                          <span className="text-sm text-muted-foreground">Clients: {snap.clientCount || 0}</span>
                        </div>
                        <div className="space-y-1">
                          {Object.entries(snap.records).map(([id, test]) => (
                            <div key={id} className="flex justify-between text-sm">
                              <div className="flex-1">
                                <span>{test.name}</span>
                                {test.positive > 0 && (
                                  <span className="ml-2 text-red-600">(+{test.positive})</span>
                                )}
                              </div>
                              <span>{test.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No snapshots available for this period.</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Scheduled Saves</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>• Daily snapshots are automatically saved at 9:00 PM</p>
            <p>• Snapshots include all test counts at the time of save</p>
            <p>• Test records are automatically reset after saving</p>
            <p>• Use the date picker to view reports for any saved date</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
