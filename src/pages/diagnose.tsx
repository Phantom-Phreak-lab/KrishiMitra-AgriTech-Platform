import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Uploader } from '@/components/diagnosis/uploader';
import { DiagnosisResult } from '@/components/diagnosis/diagnosis-result';
import { useDiagnosisStore } from '@/stores/diagnosis-store';
import { diagnosisService } from '@/services/diagnosis-service';
import { toast } from 'sonner';
import { Leaf, ArrowLeft, History } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DiagnosePage() {
  const { t } = useTranslation();
  const {
    currentImage,
    isAnalyzing,
    result,
    history,
    setImage,
    setAnalyzing,
    setResult,
    addToHistory,
    clearCurrent,
  } = useDiagnosisStore();

  const [analysisProgress, setAnalysisProgress] = useState(0);

  const handleFileSelect = (file: File) => {
    setImage(file);
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!currentImage) return;

    try {
      setAnalyzing(true);
      setAnalysisProgress(0);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      const result = await diagnosisService.analyze(currentImage);
      
      clearInterval(progressInterval);
      setAnalysisProgress(100);

      setTimeout(() => {
        setResult(result);
        addToHistory(result);
        toast.success('Analysis completed successfully!');
      }, 500);
    } catch (error) {
      toast.error('Analysis failed. Please try again.');
    } finally {
      setAnalyzing(false);
      setAnalysisProgress(0);
    }
  };

  const handleDownloadReport = async () => {
    if (!result) return;
    
    try {
      const blob = await diagnosisService.downloadReport(result.id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `diagnosis-report-${result.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error('Failed to download report');
    }
  };

  const handleStartNew = () => {
    clearCurrent();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Leaf className="h-8 w-8 text-krishi-primary" />
              {t('diagnosis.title')}
            </h1>
            <p className="text-muted-foreground mt-1">
              {t('diagnosis.subtitle')}
            </p>
          </div>
        </div>
        
        {history.length > 0 && (
          <Button variant="outline" className="gap-2">
            <History className="h-4 w-4" />
            History ({history.length})
          </Button>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Step 1: Upload Image</CardTitle>
            </CardHeader>
            <CardContent>
              <Uploader
                onFileSelect={handleFileSelect}
                selectedFile={currentImage}
                isLoading={isAnalyzing}
              />
            </CardContent>
          </Card>

          {currentImage && !result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Step 2: Analyze</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isAnalyzing ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-krishi-primary border-r-transparent" />
                        <span className="text-sm">{t('diagnosis.analyzing')}</span>
                      </div>
                      <Progress value={analysisProgress} className="h-2" />
                    </div>
                  ) : (
                    <Button 
                      onClick={handleAnalyze}
                      className="w-full bg-krishi-primary hover:bg-krishi-dark"
                      size="lg"
                    >
                      Start Analysis
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardContent className="p-6">
                  <Button 
                    onClick={handleStartNew}
                    variant="outline"
                    className="w-full"
                  >
                    Analyze Another Image
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {result ? (
            <DiagnosisResult 
              result={result}
              onDownloadReport={handleDownloadReport}
            />
          ) : (
            <Card className="h-96 flex items-center justify-center">
              <CardContent className="text-center space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Leaf className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">Upload an image to get started</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Results will appear here after analysis
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}