import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectItem } from './ui/select'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Minus } from 'lucide-react'

export function UsageForm({ supplies, onRecordUsage }) {
  const [formData, setFormData] = useState({
    supplyId: '',
    quantity: '',
    department: '',
    notes: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.supplyId || !formData.quantity) return

    const supply = supplies.find(s => s.id === formData.supplyId)
    if (!supply) return

    onRecordUsage({
      id: Date.now().toString(),
      supplyId: formData.supplyId,
      supplyName: supply.name,
      quantity: parseInt(formData.quantity),
      department: formData.department || 'General',
      notes: formData.notes,
      timestamp: new Date().toISOString()
    })

    setFormData({ supplyId: '', quantity: '', department: '', notes: '' })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Minus className="h-5 w-5" />
          Record Usage
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="supply">Select Supply *</Label>
            <Select
              id="supply"
              value={formData.supplyId}
              onChange={(e) => setFormData({ ...formData, supplyId: e.target.value })}
              required
            >
              <option value="">Choose a supply...</option>
              {supplies.map((supply) => (
                <SelectItem key={supply.id} value={supply.id}>
                  {supply.name} ({supply.quantity} {supply.unit} available)
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity Used *</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="1"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="e.g., Emergency Room"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Input
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g., Routine procedure"
            />
          </div>
          <Button type="submit" className="w-full" disabled={supplies.length === 0}>
            Record Usage
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
