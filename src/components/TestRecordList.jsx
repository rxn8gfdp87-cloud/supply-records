import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Plus, Minus, RotateCcw, CheckCircle } from 'lucide-react'

export function TestRecordList({ testRecords, onUpdateCount, onResetAll, onUpdateResult, onDecrementResult }) {
  const categories = Object.keys(testRecords).reduce((acc, id) => {
    const category = testRecords[id].category
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(testRecords[id])
    return acc
  }, {})

  // Tests that track positive results
  const positiveTrackingTests = [
    'STIs & STDs', // All tests in this category
    'MP', // Malaria Parasite
    'Pregnancy Test'
  ]

  const shouldTrackPositive = (test) => {
    return positiveTrackingTests.includes(test.category) || 
           positiveTrackingTests.includes(test.name)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Pink Clinic Test Records</CardTitle>
          <Button
            variant="destructive"
            size="sm"
            onClick={onResetAll}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset All to Zero
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(categories).map(([category, tests]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-3 text-primary">{category}</h3>
              <div className="space-y-2">
                {tests.map((test) => (
                  <div
                    key={test.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium">{test.name}</h4>
                      <div className="text-xs text-muted-foreground mt-1">
                        {test.date} • {test.day}
                      </div>
                      {shouldTrackPositive(test) && (
                        <div className="flex gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => onDecrementResult && onDecrementResult(test.id)}
                            className="h-6 w-6"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-red-600 font-semibold text-sm self-center">
                            {test.positive || 0}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => onUpdateResult && onUpdateResult(test.id)}
                            className="h-6 w-6"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onUpdateCount(test.id, -1)}
                        className="h-8 w-8"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-semibold text-lg">
                        {test.count}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onUpdateCount(test.id, 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
