export class Meal {
  id: number | null;
  name: String | null;
  reference: String | null;
  instructions: String | null;
  rating: number;
  easeOfPrep: number;
  lastUsedDate: Date | null;


  constructor(meal: Partial<Meal> = {}) {
    this.id = meal?.id || null;
    this.name = meal?.name || null;
    this.reference = meal?.reference || null;
    this.instructions = meal?.instructions || null;
    this.rating = meal?.rating || 0;
    this.easeOfPrep = meal?.easeOfPrep || 0;
    this.lastUsedDate = meal?.lastUsedDate || null;


  }
}