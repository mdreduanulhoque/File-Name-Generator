import React, { useState, useEffect } from 'react';
import { Calendar, Hash, Copy, Check, FileText, RefreshCw, Plus, Minus, Code2 } from 'lucide-react';
import { generateFileString, getFormattedDateParts } from './utils/dateUtils';
import { InputGroup } from './components/InputGroup';

const CODE_TEMPLATE = `// Problem / Topic: 

/*
    New learning: 
*/`;

const App: React.FC = () => {
  // Initialize with today's date
  const [date, setDate] = useState<Date>(new Date());
  const [fileNumber, setFileNumber] = useState<number>(1);
  const [lowercaseMonth, setLowercaseMonth] = useState<boolean>(false);
  
  const [filenameCopied, setFilenameCopied] = useState<boolean>(false);
  const [templateCopied, setTemplateCopied] = useState<boolean>(false);

  // Derived state for the main output
  const resultString = generateFileString(date, fileNumber, { lowercaseMonth });

  // Reset copied state when result changes
  useEffect(() => {
    setFilenameCopied(false);
  }, [resultString]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.valueAsDate) {
      // Adjust for timezone offset to ensure the day selected is the day used
      const userDate = new Date(e.target.value + 'T12:00:00');
      setDate(userDate);
    }
  };

  const handleCopyFilename = async () => {
    try {
      await navigator.clipboard.writeText(resultString);
      setFilenameCopied(true);
      setTimeout(() => setFilenameCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleCopyTemplate = async () => {
    try {
      await navigator.clipboard.writeText(CODE_TEMPLATE);
      setTemplateCopied(true);
      setTimeout(() => setTemplateCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy template: ', err);
    }
  };

  const handleReset = () => {
    setDate(new Date());
    setFileNumber(1);
  };

  const incrementFileNumber = () => setFileNumber(prev => prev + 1);
  const decrementFileNumber = () => setFileNumber(prev => Math.max(1, prev - 1));

  // Helper to format date for input value (YYYY-MM-DD)
  const formatDateForInput = (d: Date) => {
    return d.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center p-4 md:p-6 gap-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-400" />
              File Namer
            </h1>
            <p className="text-slate-400 text-sm mt-1">Generate consistent coding file names.</p>
          </div>
          <button 
            onClick={handleReset}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-slate-300 hover:text-white"
            title="Reset to today"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-8">
          
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <InputGroup label="Date" id="date-picker">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="date"
                  id="date-picker"
                  value={formatDateForInput(date)}
                  onChange={handleDateChange}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition duration-150 ease-in-out cursor-pointer"
                />
              </div>
            </InputGroup>

            <InputGroup label="File Number" id="file-number">
              <div className="flex items-center">
                <button 
                  onClick={decrementFileNumber}
                  className="p-2.5 bg-slate-100 border border-slate-300 border-r-0 rounded-l-lg hover:bg-slate-200 active:bg-slate-300 transition-colors"
                >
                  <Minus className="w-5 h-5 text-slate-600" />
                </button>
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Hash className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="number"
                    id="file-number"
                    min="1"
                    value={fileNumber}
                    onChange={(e) => setFileNumber(Math.max(1, parseInt(e.target.value) || 1))}
                    className="block w-full pl-9 pr-3 py-2.5 border-y border-slate-300 leading-5 bg-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm text-center"
                  />
                </div>
                <button 
                  onClick={incrementFileNumber}
                  className="p-2.5 bg-slate-100 border border-slate-300 border-l-0 rounded-r-lg hover:bg-slate-200 active:bg-slate-300 transition-colors"
                >
                  <Plus className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            </InputGroup>

          </div>

          {/* Options Toggle */}
          <div className="flex items-center space-x-2">
             <div className="flex items-center h-5">
                <input
                  id="lowercase-month"
                  type="checkbox"
                  checked={lowercaseMonth}
                  onChange={(e) => setLowercaseMonth(e.target.checked)}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded cursor-pointer"
                />
             </div>
             <label htmlFor="lowercase-month" className="text-sm text-slate-600 cursor-pointer select-none flex items-center gap-1">
                Lowercase Month <span className="text-xs text-slate-400">(e.g. january instead of January)</span>
             </label>
          </div>

          {/* Result Area */}
          <div className="bg-slate-50 rounded-xl p-6 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Generated Filename</span>
            <div className="text-2xl md:text-3xl font-mono font-bold text-slate-800 text-center break-all">
              {resultString}
            </div>
            
            <button
              onClick={handleCopyFilename}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all duration-200 transform active:scale-95 shadow-sm ${
                filenameCopied 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200 hover:shadow-lg'
              }`}
            >
              {filenameCopied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Name
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Code Template Section */}
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        <div className="bg-slate-800 p-4 text-white flex justify-between items-center">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Code2 className="w-5 h-5 text-green-400" />
            Code Template
          </h2>
          <button
            onClick={handleCopyTemplate}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              templateCopied 
                ? 'bg-green-500 text-white' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
            }`}
          >
            {templateCopied ? (
              <>
                <Check className="w-3 h-3" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                Copy Template
              </>
            )}
          </button>
        </div>
        <div className="p-0">
          <pre className="bg-slate-900 text-slate-300 p-4 overflow-x-auto text-sm font-mono leading-relaxed">
            {CODE_TEMPLATE}
          </pre>
        </div>
      </div>
      
      <footer className="text-center text-slate-400 text-xs pb-4">
        Basic File Helper &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default App;