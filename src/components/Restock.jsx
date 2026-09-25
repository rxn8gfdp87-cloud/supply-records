import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Plus, Minus, Package, AlertTriangle } from 'lucide-react'

export function Restock({ restockCounts, onUpdateCount }) {
  const categories = Object.keys(restockCounts).reduce((acc, id) => {
    const category = restockCounts[id].category
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(restockCounts[id])
    return acc
  }, {})

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Restock Management
        </CardTitle>
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
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{test.name}</h4>
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
                        className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
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
