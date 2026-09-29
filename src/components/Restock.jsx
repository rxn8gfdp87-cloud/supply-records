import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Package, AlertTriangle } from 'lucide-react'

export function Restock({ restockCounts, onUpdateCount }) {
  const categories = Object.keys(restockCounts).reduce((acc, id) => {
    const category = restockCounts[id].category
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(restockCounts[id])
    return acc
  }, {})

  const handleInputChange = (id, value) => {
    const numValue = parseInt(value)
    if (!isNaN(numValue) && numValue >= 0) {
      onUpdateCount(id, numValue)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Package className="h-5 w-5" />
          Restock Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(categories).map(([category, tests]) => (
            <div key={category}>
              <h3 className="text-base sm:text-lg font-semibold mb-3 text-primary">{category}</h3>
              <div className="space-y-2">
                {tests.map((test) => (
                  <div
                    key={test.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors gap-3"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-medium text-sm sm:text-base">{test.name}</h4>
                        {test.count <= test.minStock && test.count > 0 && (
                          <span className="flex items-center gap-1 text-xs text-destructive bg-destructive/10 px-2 py-1 rounded">
                            <AlertTriangle className="h-3 w-3" />
                            Low Stock
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Restock Stock: {test.count} • {test.date} • {test.day}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <Input
                        type="number"
                        min="0"
                        value={test.count}
                        onChange={(e) => handleInputChange(test.id, e.target.value)}
                        className="w-20 text-center font-semibold text-lg"
                      />
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
