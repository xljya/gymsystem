import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="fitness-container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-fitness-red">健身中国</span>
              <span className="ml-2 text-xs text-fitness-gray">FIT CHINA EXPLORER</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-fitness-dark hover:text-fitness-red font-medium transition-colors">
              首页
            </Link>
            <Link to="#classes" className="text-fitness-dark hover:text-fitness-red font-medium transition-colors">
              课程
            </Link>
            <Link to="#schedule" className="text-fitness-dark hover:text-fitness-red font-medium transition-colors">
              日程表
            </Link>
            <Link to="#trainers" className="text-fitness-dark hover:text-fitness-red font-medium transition-colors">
              教练
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-fitness-red text-fitness-red hover:bg-fitness-red hover:text-white">
              登录
            </Button>
            <Button className="bg-fitness-red text-white hover:bg-red-700">
              注册
            </Button>
          </div>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-fitness-dark hover:text-fitness-red"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="px-4 py-2 text-fitness-dark hover:bg-gray-100 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                首页
              </Link>
              <Link 
                to="#classes" 
                className="px-4 py-2 text-fitness-dark hover:bg-gray-100 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                课程
              </Link>
              <Link 
                to="#schedule" 
                className="px-4 py-2 text-fitness-dark hover:bg-gray-100 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                日程表
              </Link>
              <Link 
                to="#trainers" 
                className="px-4 py-2 text-fitness-dark hover:bg-gray-100 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                教练
              </Link>
              <div className="flex space-x-2 px-4 pt-2">
                <Button variant="outline" className="w-1/2 border-fitness-red text-fitness-red hover:bg-fitness-red hover:text-white">
                  登录
                </Button>
                <Button className="w-1/2 bg-fitness-red text-white hover:bg-red-700">
                  注册
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
