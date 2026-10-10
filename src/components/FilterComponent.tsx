
import { 
  Filter,
} from 'lucide-react';

const FilterComponent = () => {
  return (
    
              <div className="flex justify-end mb-4 lg:mb-6">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors text-sm">
                  <Filter size={16} />
                  <span>Filter</span>
                </button>
              </div>
  )
}

export default FilterComponent
