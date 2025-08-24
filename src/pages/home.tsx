import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  Store, 
  CloudSun, 
  Lightbulb, 
  TrendingUp,
  Package,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  location: string;
}

export function HomePage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    // Mock weather data - in real app, this would be an API call
    setWeather({
      temperature: 28,
      condition: 'Partly Cloudy',
      humidity: 65,
      location: user?.location || 'Your Location',
    });
  }, [user?.location]);

  const quickActions = [
    {
      title: t('home.startDiagnosis'),
      description: 'Analyze crop health with AI',
      icon: Camera,
      href: '/diagnose',
      color: 'bg-krishi-primary',
      textColor: 'text-white',
    },
    {
      title: t('home.myListings'),
      description: 'Manage your crop listings',
      icon: Package,
      href: '/marketplace',
      color: 'bg-krishi-secondary',
      textColor: 'text-white',
    },
    {
      title: 'Browse Market',
      description: 'Find crops to purchase',
      icon: Store,
      href: '/marketplace',
      color: 'bg-krishi-accent',
      textColor: 'text-black',
    },
  ];

  const farmingTips = [
    'Monitor soil moisture levels regularly for optimal crop growth',
    'Apply organic fertilizers 2-3 weeks before sowing season',
    'Use drip irrigation to conserve water and improve efficiency',
    'Practice crop rotation to maintain soil health naturally',
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-krishi-dark">
          {t('home.welcome')}, {user?.name}!
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('home.subtitle')}
        </p>
      </motion.div>

      {/* Quick Actions Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {quickActions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
              <Link to={action.href} className="block">
                <div className={`p-6 ${action.color} ${action.textColor}`}>
                  <action.icon className="h-8 w-8 mb-3" />
                  <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                  <p className="text-sm opacity-90">{action.description}</p>
                  <ArrowRight className="h-5 w-5 mt-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weather Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CloudSun className="h-5 w-5 text-krishi-accent" />
                {t('home.todaysWeather')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {weather ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">{weather.temperature}°C</p>
                      <p className="text-muted-foreground">{weather.condition}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Humidity</p>
                      <p className="text-xl font-semibold">{weather.humidity}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {weather.location}
                  </div>
                </div>
              ) : (
                <div className="animate-pulse space-y-4">
                  <div className="h-8 bg-muted rounded w-24"></div>
                  <div className="h-4 bg-muted rounded w-32"></div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-krishi-secondary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="p-2 bg-krishi-primary/10 rounded-full">
                    <Camera className="h-4 w-4 text-krishi-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Crop diagnosis completed</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="p-2 bg-krishi-secondary/10 rounded-full">
                    <Store className="h-4 w-4 text-krishi-secondary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New listing created</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Farming Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-krishi-accent" />
              {t('home.tips')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {farmingTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex gap-3 p-3 bg-gradient-to-r from-krishi-light/20 to-transparent rounded-lg"
                >
                  <Badge variant="outline" className="shrink-0">
                    {index + 1}
                  </Badge>
                  <p className="text-sm leading-relaxed">{tip}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}