import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { format } from 'date-fns'

export function UsageHistory({ records }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Usage History</CardTitle>
      </CardHeader>
      <CardContent>
        {records.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No usage records yet</p>
        ) : (
          <div className="space-y-3">
            {records.slice(0, 10).map((record) => (
              <div
                key={record.id}
                className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{record.supplyName}</h4>
                  <span className="text-sm text-destructive font-semibold">
                    -{record.quantity}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>{record.department}</p>
                  {record.notes && <p className="italic">"{record.notes}"</p>}
                  <p className="text-xs">
                    {format(new Date(record.timestamp), 'MMM d, yyyy • h:mm a')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
