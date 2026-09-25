import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Plus } from 'lucide-react'

export function SupplyForm({ onAddSupply }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    unit: '',
    minStock: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.quantity) return

    onAddSupply({
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category || 'General',
      quantity: parseInt(formData.quantity),
      unit: formData.unit || 'units',
      minStock: parseInt(formData.minStock) || 10,
      createdAt: new Date().toISOString()
    })

    setFormData({ name: '', category: '', quantity: '', unit: '', minStock: '' })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add New Supply
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Supply Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Surgical Gloves"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., PPE"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="100"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Input
                id="unit"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                placeholder="e.g., boxes"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minStock">Min Stock Alert</Label>
              <Input
                id="minStock"
                type="number"
                value={formData.minStock}
                onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                placeholder="10"
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Add Supply
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
