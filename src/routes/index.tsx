import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BarcodeScanner } from '~/components/BarcodeScanner';
import { ChevronDown, ChevronRight, Trash2, Plus, Info } from 'lucide-react';

export default function Dashboard() {
  const queryClient = useQueryClient();
  const { data: meals = [] } = useQuery({ queryKey: ['meals'], queryFn: () => fetch('/api/meals').then(res => res.json()) });
  const [expanded, setExpanded] = useState({ Breakfast: true, Lunch: true, Dinner: true, Snacks: true });
  const [confirmDelete, setConfirmDelete] = useState(null);

  const deleteMeal = useMutation({
    mutationFn: (id) => fetch(`/api/meals?id=${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries(['meals']);
      setConfirmDelete(null);
    }
  });

  const categories = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Fitness Dashboard</h1>
        <BarcodeScanner onScan={(data) => console.log('Scanned:', data)} />
      </header>

      <div className="space-y-4">
        {categories.map(cat => (
          <section key={cat} className="border rounded-xl overflow-hidden bg-card">
            <button 
              onClick={() => setExpanded(prev => ({ ...prev, [cat]: !prev[cat] }))}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                {expanded[cat] ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                <h2 className="font-semibold text-lg">{cat}</h2>
              </div>
              <span className="text-sm text-muted-foreground">
                {meals.filter(m => m.category === cat).length} items
              </span>
            </button>
            
            {expanded[cat] && (
              <div className="p-4 pt-0 divide-y">
                {meals.filter(m => m.category === cat).map(meal => (
                  <div key={meal.id} className="py-3 flex justify-between items-center group">
                    <div>
                      <p className="font-medium">{meal.name}</p>
                      <p className="text-sm text-muted-foreground">{meal.calories} kcal • P: {meal.protein} C: {meal.carbs} F: {meal.fat}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {confirmDelete === meal.id ? (
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => deleteMeal.mutate(meal.id)}
                            className="text-xs bg-destructive text-destructive-foreground px-2 py-1 rounded"
                          >
                            Confirm
                          </button>
                          <button 
                            onClick={() => setConfirmDelete(null)}
                            className="text-xs bg-secondary px-2 py-1 rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => setConfirmDelete(meal.id)}
                          className="p-2 opacity-0 group-hover:opacity-100 hover:bg-muted rounded-full transition-all"
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}