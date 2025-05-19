import React, { useState, useEffect } from 'react';
import InstructorCard from './InstructorCard';
import type { Trainer } from '@/types';
import { listDistinctCoachAddressesUsingGet } from '@/api/coachController';
import { Check, ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { message } from 'antd';

interface InstructorGridProps {
  searchTerm: string;
  trainers: Trainer[];
}

const InstructorGrid = ({ searchTerm, trainers }: InstructorGridProps) => {
  const [sortBy, setSortBy] = useState<'recommended' | 'experience'>('recommended');
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [isLocationPopoverOpen, setIsLocationPopoverOpen] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationsData = await listDistinctCoachAddressesUsingGet();
        if (Array.isArray(locationsData)) {
          setLocations(locationsData);
        } else {
          console.warn('获取到的城市列表数据格式不正确:', locationsData);
          message.error('获取城市列表数据格式不正确');
          setLocations([]);
        }
      } catch (error: any) {
        const errorMessage = error?.data?.message || error?.message || '请求城市列表时发生错误';
        message.error(errorMessage);
        console.error('请求城市列表错误:', error);
        setLocations([]);
      }
    };
    fetchLocations();
  }, []);

  const filteredBySearch = trainers.filter((t) => {
    const lower = searchTerm.toLowerCase();
    return (
      lower === '' ||
      t.coachName.toLowerCase().includes(lower) ||
      (t.coachAddress && t.coachAddress.toLowerCase().includes(lower)) ||
      (t.courseType && t.courseType.toLowerCase().includes(lower))
    );
  });

  const filteredByLocation = selectedLocation
    ? filteredBySearch.filter((t) => t.coachAddress === selectedLocation)
    : filteredBySearch;

  const sorted = [...filteredByLocation].sort((a, b) => {
    if (sortBy === 'experience') {
      const expA = a.experience ?? 0;
      const expB = b.experience ?? 0;
      return expB - expA;
    }
    return 0;
  });

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-lesmills-black mb-2">我们的教练</h2>
          <p className="text-gray-600">发现专业认证的教练，开始您的健身之旅</p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2 items-center">
            <Popover open={isLocationPopoverOpen} onOpenChange={setIsLocationPopoverOpen}>
              <PopoverTrigger asChild>
                <button type="button" className="border rounded-md px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-50">
                  {selectedLocation || '城市'}
                  <ChevronDown size={16} />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2">
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedLocation('');
                      setIsLocationPopoverOpen(false);
                    }}
                    className="w-full text-left px-2 py-1.5 text-sm rounded-md hover:bg-gray-100 flex items-center gap-2"
                  >
                    <div className={`w-4 h-4 rounded-sm flex items-center justify-center border ${
                      selectedLocation === '' ? 'bg-lesmills-red border-lesmills-red' : 'border-gray-300'
                    }`}>
                      {selectedLocation === '' && <Check size={12} className="text-white" />}
                    </div>
                    所有城市
                  </button>
                  {locations.map((locationItem) => (
                    <button
                      type="button"
                      key={locationItem}
                      onClick={() => {
                        setSelectedLocation(locationItem === selectedLocation ? '' : locationItem);
                        setIsLocationPopoverOpen(false);
                      }}
                      className="w-full text-left px-2 py-1.5 text-sm rounded-md hover:bg-gray-100 flex items-center gap-2"
                    >
                      <div className={`w-4 h-4 rounded-sm flex items-center justify-center border ${
                        locationItem === selectedLocation ? 'bg-lesmills-red border-lesmills-red' : 'border-gray-300'
                      }`}>
                        {locationItem === selectedLocation && <Check size={12} className="text-white" />}
                      </div>
                      {locationItem}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {selectedLocation !== '' && (
              <button 
                type="button"
                onClick={() => {
                  setSelectedLocation('');
                }}
                className="text-sm text-lesmills-red hover:underline"
              >
                清除城市筛选
              </button>
            )}
          </div>

          <div>
            <select 
              aria-label="排序方式"
              className="border rounded-md px-4 py-2 text-sm bg-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recommended' | 'experience')}
            >
              <option value="recommended">推荐教练</option>
              <option value="experience">按经验排序</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-600 mb-6">
          找到 {sorted.length} 位教练
           {selectedLocation && ` · 位于 ${selectedLocation}`}
        </p>

        {/* Instructors grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sorted.map((t) => (
            <InstructorCard key={t.coachId} trainer={t} />
          ))}
        </div>

        {sorted.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg font-medium text-gray-600">找不到符合条件的教练</p>
            <p className="text-sm text-gray-500 mt-2">请尝试调整您的搜索条件</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default InstructorGrid;
