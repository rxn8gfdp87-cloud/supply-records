import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Trash2, AlertTriangle } from 'lucide-react'

export function SupplyList({ supplies, onDeleteSupply }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Inventory</CardTitle>
      </CardHeader>
      <CardContent>
        {supplies.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No supplies in inventory</p>
        ) : (
          <div className="space-y-3">
            {supplies.map((supply) => (
              <div
                key={supply.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{supply.name}</h4>
                    {supply.quantity <= supply.minStock && (
                      <span className="flex items-center gap-1 text-xs text-destructive bg-destructive/10 px-2 py-1 rounded">
                        <AlertTriangle className="h-3 w-3" />
                        Low Stock
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {supply.category} • {supply.quantity} {supply.unit}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteSupply(supply.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
