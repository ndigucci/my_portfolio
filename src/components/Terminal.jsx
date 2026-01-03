import React, { useState, useEffect, useRef } from 'react';

// --- MEDICAL DATABASE (Moved inside Terminal for cleaner access) ---
const MED_DB = {
  paracetamol: { use: "Pain relief, Fever", warning: "Liver toxicity if overdosed", side_effects: "Nausea, Rash", adult_dose: "500mg-1g every 4-6h (Max 4g/day)" },
  ibuprofen: { use: "Inflammation, Pain", warning: "Stomach ulcers, Asthma triggers", side_effects: "Stomach pain, Heartburn", adult_dose: "200mg-400mg every 4-6h" },
  amoxicillin: { use: "Bacterial infections", warning: "Finish full course. Penicillin allergy risk", side_effects: "Diarrhea, Nausea", adult_dose: "Prescription only. Usually 500mg every 8h" },
  cetirizine: { use: "Allergies, Hay fever", warning: "May cause drowsiness", side_effects: "Dry mouth, Fatigue", adult_dose: "10mg once daily" },
  coartem: { use: "Malaria treatment", warning: "Take with fatty food/milk", side_effects: "Headache, Dizziness", adult_dose: "Strictly as prescribed (3-day course)" }
};

const FIRST_AID_DB = {
  burn: "1. Cool with running water (20 mins).\n2. Remove tight items.\n3. Cover with cling film.\n4. NO ice, NO butter.",
  bleeding: "1. Apply direct pressure.\n2. Elevate limb.\n3. Apply dressing.\n4. If severe, call Emergency.",
  fracture: "1. Immobilize area.\n2. Stop bleeding if any.\n3. Do not try to realign bone.\n4. Seek X-ray immediately.",
  choking: "1. Encourage coughing.\n2. Back blows (5 times).\n3. Abdominal thrusts (Heimlich).\n4. Call Emergency."
};

const PREVENTION_DB = {
  malaria: "1. Sleep under ITN nets.\n2. Eliminate standing water.\n3. Use repellents (DEET).",
  flu: "1. Annual vaccination.\n2. Hand washing.\n3. Avoid close contact with sick people.",
  covid: "1. Vaccination.\n2. Masks in crowded areas.\n3. Ventilation.\n4. Hand hygiene."
};

// --- TYPEWRITER COMPONENT (The Magic Effect) ---
const TypewriterLine = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index === text.length) {
        clearInterval(intervalId);
        onComplete && onComplete();
      }
    }, 25); // Typing speed (smaller = faster)
    return () => clearInterval(intervalId);
  }, [text, onComplete]);

  return <span>{displayedText}</span>;
};

// --- MAIN TERMINAL COMPONENT ---
const Terminal = ({ onClose }) => {
  const [history, setHistory] = useState([
    { type: 'system', content: 'HealthOS v2.0 Initializing...', needsTyping: true },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(true); // Locks input while typing
  const [flow, setFlow] = useState({ mode: 'default', step: 0, data: {} }); 
  const bottomRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isTyping]);

  // Initial Boot Sequence
  useEffect(() => {
    if (history.length === 1) {
      setTimeout(() => addLine('system', 'Loading Medical Modules... [OK]', true), 1000);
      setTimeout(() => addLine('warning', '⚠ DISCLAIMER: General info ONLY. Not a doctor replacement.', true), 2000);
      setTimeout(() => addLine('output', 'Welcome root@health. Type "help" for commands.', true), 3500);
    }
  }, [history]);

  const addLine = (type, content, needsTyping = true) => {
    setIsTyping(true);
    setHistory(prev => [...prev, { type, content, needsTyping }]);
  };

  const handleLineComplete = (index) => {
    // Only unlock if it's the last line
    if (index === history.length - 1) {
      setIsTyping(false);
    }
    // Mark line as done so it doesn't re-type on re-render
    const newHistory = [...history];
    newHistory[index].needsTyping = false;
    setHistory(newHistory);
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter' && !isTyping) {
      const cmdRaw = input.trim();
      if (!cmdRaw && flow.mode === 'default') return;

      // Add user input immediately (no typing effect for user)
      setHistory(prev => [...prev, { type: 'input', content: cmdRaw, needsTyping: false }]);
      setInput('');
      
      // Process logic
      setTimeout(() => {
         if (flow.mode === 'default') processDefaultCommand(cmdRaw.toLowerCase());
         else processFlowInput(cmdRaw);
      }, 100);
    }
  };

  // --- LOGIC PROCESSORS (Same logic, new output method) ---
  const processDefaultCommand = (cmd) => {
    const args = cmd.split(' ');
    const command = args[0];
    const param = args.slice(1).join(' ');

    switch (command) {
      case 'help':
        addLine('output', 'COMMANDS: sick, medicine_info <name>, dosage_check, interaction_check, first_aid <issue>, prevention <disease>, emergency, clear, exit');
        break;
      case 'clear': setHistory([]); setIsTyping(false); break;
      case 'exit': onClose(); break;
      case 'emergency': addLine('error', '!!! EMERGENCY !!! Difficulty breathing? Severe bleeding? Unconscious? -> CALL AMBULANCE OR GO TO HOSPITAL NOW.'); break;
      
      case 'sick':
        setFlow({ mode: 'sick', step: 1, data: {} });
        addLine('system', 'INTAKE STARTED. Triage Mode Active.');
        setTimeout(() => addLine('query', '1. List main symptoms (comma separated):'), 500);
        break;

      case 'medicine_info':
        if (!param) addLine('error', 'Usage: medicine_info <name>');
        else {
          const med = MED_DB[param];
          if (med) addLine('output', `DRUG: ${param.toUpperCase()} | USE: ${med.use} | WARNING: ${med.warning}`);
          else addLine('warning', `Medicine "${param}" not found. Consult pharmacist.`);
        }
        break;

      case 'dosage_check':
        setFlow({ mode: 'dosage', step: 1, data: {} });
        addLine('query', '1. What is the medicine name?');
        break;
      
      case 'first_aid':
        if (FIRST_AID_DB[param]) addLine('output', `FIRST AID (${param.toUpperCase()}): ${FIRST_AID_DB[param]}`);
        else addLine('error', 'Unknown. Try: burn, bleeding, fracture, choking');
        break;

      default: addLine('error', `Command not found: ${command}. Type "help".`);
    }
  };

  const processFlowInput = (input) => {
    if (flow.mode === 'sick') {
      const currentData = { ...flow.data };
      if (flow.step === 1) {
        currentData.symptoms = input;
        setFlow({ ...flow, step: 2, data: currentData });
        addLine('query', '2. Duration? (e.g., 2 days)');
      } else if (flow.step === 2) {
        currentData.duration = input;
        setFlow({ ...flow, step: 3, data: currentData });
        addLine('query', '3. Severity? (mild / moderate / severe)');
      } else if (flow.step === 3) {
        currentData.severity = input;
        setFlow({ ...flow, step: 4, data: currentData });
        addLine('query', '4. Any DANGER SIGNS (Chest pain, Diff breathing)? [yes/no]');
      } else if (flow.step === 4) {
        const isEmergency = input.toLowerCase().includes('yes') || currentData.severity.includes('severe');
        addLine('system', 'ANALYZING...');
        setTimeout(() => {
          if (isEmergency) {
            addLine('error', '>>> TRIAGE: RED (EMERGENCY). Seek hospital care immediately.');
          } else {
            addLine('success', '>>> TRIAGE: GREEN (ROUTINE). Monitor at home. Consult pharmacist if persists.');
          }
          setFlow({ mode: 'default', step: 0, data: {} });
        }, 1000);
      }
    }
    
    else if (flow.mode === 'dosage') {
       if (flow.step === 1) {
         setFlow({ mode: 'dosage', step: 2, data: { med: input.toLowerCase() } });
         addLine('query', '2. Patient Age?');
       } else if (flow.step === 2) {
         const med = MED_DB[flow.data.med];
         if (med) addLine('output', `DOSAGE (${flow.data.med}): ${med.adult_dose}`);
         else addLine('warning', 'Medicine not found in local DB.');
         setFlow({ mode: 'default', step: 0, data: {} });
       }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-0 md:p-4 backdrop-blur-sm">
      <div className="bg-[#0c0c0c] w-full h-[100dvh] md:h-[80vh] md:max-w-4xl text-green-500 font-mono p-4 rounded-none md:rounded-lg flex flex-col border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-green-500/30 pb-2 mb-2">
          <span className="text-xs">root@health:~</span>
          <button onClick={onClose} className="text-red-500 hover:text-red-400 font-bold border border-red-900 px-2 rounded">✕ EXIT</button>
        </div>
        
        {/* History Area */}
        <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar p-2" onClick={() => document.getElementById('terminalInput').focus()}>
          {history.map((line, i) => (
            <div key={i} className={`
              ${line.type === 'input' ? 'text-white font-bold' : ''}
              ${line.type === 'error' ? 'text-red-500 font-bold' : ''}
              ${line.type === 'warning' ? 'text-yellow-400' : ''}
              ${line.type === 'success' ? 'text-green-400 font-bold' : ''}
              ${line.type === 'query' ? 'text-cyan-400' : ''}
              ${line.type === 'system' ? 'text-gray-500 italic' : ''}
            `}>
              {line.type === 'input' ? '> ' : ''}
              {/* If it needs typing AND it is the latest line, type it. Otherwise show text. */}
              {line.needsTyping && i === history.length - 1 ? (
                <TypewriterLine text={line.content} onComplete={() => handleLineComplete(i)} />
              ) : (
                <span>{line.content}</span>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Area (Mobile Safe) */}
        <div className="flex items-center mt-2 border-t border-green-500/30 pt-2 pb-safe">
          <span className="text-green-500 mr-2 shrink-0">
            {flow.mode === 'default' ? 'root@health:~#' : `[${flow.mode}] >`}
          </span>
          <input 
            id="terminalInput"
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={handleCommand} 
            disabled={isTyping}
            className="bg-transparent border-none outline-none flex-1 text-white placeholder-gray-800 disabled:opacity-50" 
            autoFocus 
            placeholder={isTyping ? "Processing..." : "Type command..."}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;