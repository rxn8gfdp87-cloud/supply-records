import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Package, Activity, AlertTriangle, TrendingDown, X, Users, CheckCircle, Plus, Minus } from 'lucide-react'

export function Dashboard({ supplies, testRecords, records, onNavigate, clientCount, onUpdateClientCount }) {
  const [showLowStock, setShowLowStock] = useState(false)
  
  const currentDate = new Date().toISOString().split('T')[0]
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  
  const totalSupplies = supplies.reduce((sum, s) => sum + (s.count || s.quantity || 0), 0)
  const totalQuantity = supplies.length
  const lowStockItems = supplies.filter(s => (s.count || s.quantity || 0) <= (s.minStock || 3) && (s.count || s.quantity || 0) > 0)
  const lowStockCount = lowStockItems.length
  const totalUsage = testRecords ? Object.values(testRecords).reduce((sum, s) => sum + (s.count || 0), 0) : 0
  
  // Only count positive results from STIs & STDs, MP, and Pregnancy Test
  const positiveTrackingTests = ['STIs & STDs', 'MP', 'Pregnancy Test']
  const totalPositive = testRecords ? Object.values(testRecords).reduce((sum, s) => {
    if (positiveTrackingTests.includes(s.category) || positiveTrackingTests.includes(s.name)) {
      return sum + (s.positive || 0)
    }
    return sum
  }, 0) : 0

  const stats = [
    {
      title: 'Total Supplies',
      value: totalSupplies,
      icon: Package,
      color: 'text-blue-500',
      clickable: false
    },
    {
      title: 'Total Test',
      value: totalQuantity,
      icon: Activity,
      color: 'text-green-500',
      clickable: true,
      action: 'restock'
    },
    {
      title: 'Low Stock Items',
      value: lowStockCount,
      icon: AlertTriangle,
      color: 'text-orange-500',
      clickable: true,
      action: 'lowstock'
    },
    {
      title: 'Total Usage',
      value: totalUsage,
      icon: TrendingDown,
      color: 'text-purple-500',
      clickable: false
    },
    {
      title: 'Positive Tests',
      value: totalPositive,
      icon: CheckCircle,
      color: 'text-red-600',
      clickable: false
    },
    {
      title: 'Total Clients',
      value: clientCount,
      icon: Users,
      color: 'text-indigo-500',
      clickable: false,
      showControls: true
    }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-muted-foreground">{currentDay}</h2>
        <p className="text-sm text-muted-foreground">{currentDate}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {stats.map((stat) => (
          <Card 
            key={stat.title} 
            className={stat.clickable ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}
            onClick={() => {
              if (stat.clickable) {
                if (stat.action === 'lowstock') {
                  setShowLowStock(!showLowStock)
                } else if (onNavigate) {
                  onNavigate(stat.action)
                }
              }
            }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">
                {stat.title}
                {stat.clickable && <span className="ml-2 text-xs text-primary hidden sm:inline">(Click to view)</span>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stat.showControls ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <stat.icon className={`h-4 w-4 md:h-5 md:w-5 ${stat.color}`} />
                    <span className="text-xl md:text-2xl font-bold">{stat.value}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        onUpdateClientCount && onUpdateClientCount(-1)
                      }}
                      className="h-6 w-6"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        onUpdateClientCount && onUpdateClientCount(1)
                      }}
                      className="h-6 w-6"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <stat.icon className={`h-4 w-4 md:h-5 md:w-5 ${stat.color}`} />
                  <span className="text-xl md:text-2xl font-bold">{stat.value}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {showLowStock && (
        <Card className="border-destructive">
          <CardHeader className="bg-destructive/5">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-destructive text-base md:text-lg">
                <AlertTriangle className="h-4 w-4 md:h-5 md:w-5" />
                Low Stock Details
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowLowStock(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {lowStockItems.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No low stock items</p>
            ) : (
              <div className="space-y-3">
                {lowStockItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg bg-destructive/5 gap-2"
                  >
                    <div>
                      <h4 className="font-medium text-sm sm:text-base">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                    <div className="text-right sm:text-left">
                      <p className="text-xl md:text-2xl font-bold text-destructive">{item.count || item.quantity}</p>
                      <p className="text-xs text-muted-foreground">Min: {item.minStock || 3}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
