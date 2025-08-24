import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  AlertTriangle, 
  CheckCircle, 
  AlertCircle, 
  Download, 
  Leaf 
} from 'lucide-react';
import { DiagnosisResult as DiagnosisResultType } from '@/stores/diagnosis-store';
import { cn } from '@/lib/utils';

interface DiagnosisResultProps {
  result: DiagnosisResultType;
  onDownloadReport?: () => void;
  className?: string;
}

const riskLevelConfig = {
  low: {
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    variant: 'secondary' as const,
  },
  medium: {
    icon: AlertCircle,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    variant: 'outline' as const,
  },
  high: {
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    variant: 'destructive' as const,
  },
};

export function DiagnosisResult({ 
  result, 
  onDownloadReport, 
  className 
}: DiagnosisResultProps) {
  const { t } = useTranslation();
  const riskConfig = riskLevelConfig[result.riskLevel];
  const RiskIcon = riskConfig.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("space-y-6", className)}
    >
      {/* Main Result Card */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-krishi-primary" />
              {t('diagnosis.result')}
            </CardTitle>
            <Badge variant={riskConfig.variant} className="gap-1">
              <RiskIcon className="h-3 w-3" />
              {result.riskLevel.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Disease Name */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-krishi-dark mb-2">
              {result.disease}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{t('diagnosis.confidence')}</span>
                <span>{result.confidence}%</span>
              </div>
              <Progress value={result.confidence} className="h-2" />
            </div>
          </div>

          <Separator />

          {/* Risk Level */}
          <div className={cn("p-4 rounded-lg", riskConfig.bgColor)}>
            <div className="flex items-center gap-3">
              <RiskIcon className={cn("h-6 w-6", riskConfig.color)} />
              <div>
                <h4 className="font-medium">
                  {t('diagnosis.riskLevel')}: {result.riskLevel.charAt(0).toUpperCase() + result.riskLevel.slice(1)}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {result.riskLevel === 'low' && 'Low impact on crop health'}
                  {result.riskLevel === 'medium' && 'Moderate attention required'}
                  {result.riskLevel === 'high' && 'Immediate action recommended'}
                </p>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-krishi-primary" />
              {t('diagnosis.recommendations')}
            </h4>
            <div className="space-y-2">
              {result.recommendations.map((recommendation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-3 p-3 bg-muted/50 rounded-lg"
                >
                  <span className="flex-shrink-0 w-6 h-6 bg-krishi-primary text-white text-sm font-medium rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-relaxed">{recommendation}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={onDownloadReport}
              className="flex-1 gap-2"
              variant="outline"
            >
              <Download className="h-4 w-4" />
              {t('diagnosis.downloadPdf')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Image Preview */}
      <Card>
        <CardContent className="p-4">
          <img
            src={result.imageUrl}
            alt="Analyzed crop"
            className="w-full h-48 object-cover rounded-lg"
          />
          <p className="text-xs text-muted-foreground text-center mt-2">
            Analyzed on {new Date(result.createdAt).toLocaleString()}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}