import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NutritionCalculator = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);npx
  const [selectedCategory, setSelectedCategory] = useState('all');

  const foodDatabase = {
    wheat: {
      name: 'Wheat',
      category: 'grains',
      macros: { protein: 13.2, fat: 2.5, calories: 339, carbs: 71.2, fiber: 12.2 },
      vitamins: { vitaminB1: 0.38, vitaminB2: 0.12, vitaminB3: 5.46, vitaminB6: 0.34, vitaminE: 1.01, folate: 43 },
      minerals: { iron: 3.19, magnesium: 126, phosphorus: 288, potassium: 363, zinc: 2.65, calcium: 34 }

    },
    quinoa: {
      name: 'Quinoa',
      category: 'grains',
      macros: { protein: 14.1, fat: 6.1, calories: 368, carbs: 64.2, fiber: 7 },
      vitamins: { vitaminB1: 0.36, vitaminB2: 0.32, vitaminB3: 1.52, vitaminB6: 0.49, vitaminE: 2.44, folate: 184 },
      minerals: { iron: 4.57, magnesium: 197, phosphorus: 457, potassium: 563, zinc: 3.1, calcium: 47 }
    },
    oats: {
      name: 'Oats',
      category: 'grains',
      macros: { protein: 16.9, fat: 6.9, calories: 389, carbs: 66.3, fiber: 10.6 },
      vitamins: { vitaminB1: 0.76, vitaminB2: 0.14, vitaminB3: 0.96, vitaminB6: 0.12, vitaminE: 0.7, folate: 56 },
      minerals: { iron: 4.72, magnesium: 177, phosphorus: 523, potassium: 429, zinc: 3.97, calcium: 54 }
    }
  };

  const categories = {
    all: 'All Foods',
    grains: 'Grains',
    vegetables: 'Vegetables',
    fruits: 'Fruits',
    nuts: 'Nuts & Seeds'
  };

  const handleSearch = () => {
    const searchKey = searchTerm.toLowerCase().replace(/\s+/g, '');
    if (foodDatabase[searchKey]) {
      setSelectedFood(foodDatabase[searchKey]);
    } else {
      setSelectedFood(null);
    }
  };

  const getFilteredFoods = () => {
    return Object.values(foodDatabase)
      .filter(food => selectedCategory === 'all' || food.category === selectedCategory)
      .map(food => food.name)
      .sort()
      .join(', ');
  };

  const formatNutrientValue = (value, unit = 'g') => {
    return `${value}${unit}`;
  };
return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Nutrition Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(categories).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter food item (e.g., quinoa, wheat)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSearch}>Search</Button>
            </div>

            {selectedFood ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{selectedFood.name}</h3>
                <p className="text-sm text-gray-500">Nutritional values per 100g</p>
                
                <Tabs defaultValue="macros">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="macros">Macronutrients</TabsTrigger>
                    <TabsTrigger value="vitamins">Vitamins</TabsTrigger>
                    <TabsTrigger value="minerals">Minerals</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="macros">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="bg-blue-100 p-4 rounded-lg text-center">
                        <div className="font-bold text-lg">{selectedFood.macros.protein}g</div>
                        <div className="text-sm">Protein</div>
                      </div>
                      <div className="bg-yellow-100 p-4 rounded-lg text-center">
                        <div className="font-bold text-lg">{selectedFood.macros.fat}g</div>
                        <div className="text-sm">Fat</div>
                      </div>
                      <div className="bg-green-100 p-4 rounded-lg text-center">
                        <div className="font-bold text-lg">{selectedFood.macros.calories}</div>
                        <div className="text-sm">Calories</div>
                      </div>
                      <div className="bg-purple-100 p-4 rounded-lg text-center">
                        <div className="font-bold text-lg">{selectedFood.macros.carbs}g</div>
                        <div className="text-sm">Carbs</div>
                      </div>
                      <div className="bg-orange-100 p-4 rounded-lg text-center">
                        <div className="font-bold text-lg">{selectedFood.macros.fiber}g</div>
                        <div className="text-sm">Fiber</div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="vitamins">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="bg-teal-100 p-4 rounded-lg text-center">
                        <div className="font-bold text-lg">{formatNutrientValue(selectedFood.vitamins.vitaminB1, 'mg')}</div>
                        <div className="text-sm">Vitamin B1</div>
                      </div>
                      <div className="bg-teal-100 p-4 rounded-lg text-center">
                        <div className="font-bold text-lg">{formatNutrientValue(selectedFood.vitamins.vitaminB2, 'mg')}</div>
                        <div className="text-sm">Vitamin B2</div>
                      </div>
                      <div className="bg-teal-100 p-4 rounded-lg text-center">
                        <div className="font-bold text-lg">{formatNutrientValue(selectedFood.vitamins.vitaminB3, 'mg')}</div>
                        <div className="text-sm">Vitamin B3</div>
                      </div>
                      <div className="bg-teal-100 p-4 rounded-lg text-center">
                        <div className="font-bold text-lg">{formatNutrientValue(selectedFood.vitamins.vitaminB6, 'mg')}</div>
                        <div className="text-sm">Vitamin B6</div>
                      </div>
                      <div className="bg-teal-100 p-4 rounded-lg text-center">
                        <div className="font-bold text-lg">{formatNutrientValue(selectedFood.vitamins.vitaminE, 'mg')}</div>
                        <div className="text-sm">Vitamin E</div>
                      </div>
                      <div className="bg-teal-100 p-4 rounded-lg text-center">
                        <div className="font-bold text-lg">{formatNutrientValue(selectedFood.vitamins.folate, 'μg')}</div>
                        <div className="text-sm">Folate</div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="minerals">
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    <div className="bg-rose-100 p-4 rounded-lg text-center">
      <div className="font-bold text-lg">{formatNutrientValue(selectedFood.minerals.iron, 'mg')}</div>
      <div className="text-sm">Iron</div>
    </div>
    <div className="bg-rose-100 p-4 rounded-lg text-center">
      <div className="font-bold text-lg">{formatNutrientValue(selectedFood.minerals.magnesium, 'mg')}</div>
      <div className="text-sm">Magnesium</div>
    </div>
    <div className="bg-rose-100 p-4 rounded-lg text-center">
      <div className="font-bold text-lg">{formatNutrientValue(selectedFood.minerals.phosphorus, 'mg')}</div>
      <div className="text-sm">Phosphorus</div>
    </div>
    <div className="bg-rose-100 p-4 rounded-lg text-center">
      <div className="font-bold text-lg">{formatNutrientValue(selectedFood.minerals.potassium, 'mg')}</div>
      <div className="text-sm">Potassium</div>
    </div>
    <div className="bg-rose-100 p-4 rounded-lg text-center">
      <div className="font-bold text-lg">{formatNutrientValue(selectedFood.minerals.zinc, 'mg')}</div>
      <div className="text-sm">Zinc</div>
    </div>
    <div className="bg-rose-100 p-4 rounded-lg text-center">
      <div className="font-bold text-lg">{formatNutrientValue(selectedFood.minerals.calcium, 'mg')}</div>
      <div className="text-sm">Calcium</div>
    </div>
  </div>
</TabsContent>

              </Tabs>
            </div>
          ) : (
            <Alert className="mt-4">
              <AlertDescription>Food item not found. Please try searching for a different item.</AlertDescription>
            </Alert>
          )}

          <div className="mt-4">
            <h4 className="text-lg font-semibold">Available Foods:</h4>
            <p>{getFilteredFoods()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NutritionCalculator;


